import { connectMongoDB } from "@/app/lib/mongodb";
import User from "@/models/user";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
  try {
    const {
      company,
      name,
      email,
      isRole,
    }: { company: string; name: string; email: string; isRole: string } =
      await req.json();
    await connectMongoDB();
    const user = await User.create({
      tenantId: crypto.randomUUID(),
      company: company,
      name: name,
      email: email,
      isRole: isRole,
    });
    return NextResponse.json(
      { message: "ユーザーの登録が完了しました" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
