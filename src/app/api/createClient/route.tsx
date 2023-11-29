import { connectMongoDB } from "@/app/lib/mongodb";
import Account from "@/models/account";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
  try {
    const { companyId, name, phoneNumber, email } = await req.json();
    connectMongoDB();
    const session = await getServerSession(authOptions);
    await Account.create({
      companyId: companyId,
      name: name,
      phoneNumber: phoneNumber,
      email: email,
      tenantId: session?.user.tenantId,
      userId: session?.user.userId,
    });
    return NextResponse.json({ message: "成功です" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "エラー発生" }, { status: 500 });
  }
}

