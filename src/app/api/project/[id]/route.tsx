// IDを受け取り、Caseの情報を取得

import { connectMongoDB } from "@/app/lib/mongodb";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";


export async function GET(
  req: NextRequest,
  { params }: { params: { value: number } }
) {
  try {
    const pageNumber = params.value;
    const pageSize = 5;
    const skipCount = (pageNumber - 1) * pageSize;
    const NextSkipCount = pageNumber * pageSize;
    await connectMongoDB();
    const session = await getServerSession(authOptions);
    const AllUsers = await Account.find({ tenantId: session?.user.tenantId })
      .skip(skipCount)
      .limit(pageSize)
      .populate("companyId")
      .exec();
    const NextAllUsers = await Account.find({
      tenantId: session?.user.tenantId,
    })
      .skip(NextSkipCount)
      .limit(pageSize)
      .populate("companyId")
      .exec();
    const AllUsersCount = await Account.countDocuments({
      tenantId: session?.user.tenantId,
    });
    const maxPageSize = Math.ceil(AllUsersCount / pageSize);
    return NextResponse.json(
      { AllUsers, NextAllUsers, maxPageSize },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "エラーが発生しました" },
      { status: 500 }
    );
  }
}