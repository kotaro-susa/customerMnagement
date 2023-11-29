import { connectMongoDB } from "@/app/lib/mongodb";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import Account from "@/models/account";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const companyId = params.id;
    const pageSize = 5;
    await connectMongoDB();
    const session = await getServerSession(authOptions);
    const selectAccount = await Account.find({
      tenantId: session?.user.tenantId,
      companyId: companyId,
    })
      .limit(pageSize)
      .populate("companyId")
      .exec();
    return NextResponse.json({selectAccount}, { status: 201 });
  } catch (error) {}
}
