import { connectMongoDB } from "@/app/lib/mongodb";
import Account from "@/models/account";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

// 一覧の取得
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
    console.log("エラー", error);
    return NextResponse.json(
      { message: "エラーが発生しました" },
      { status: 500 }
    );
  }
}

// PUTする

export async function PUT(
  req: NextRequest,
  { params }: { params: { value: string } }
) {
  try {
    const { newValue, type } = await req.json();
    const userId = params.value;
    console.log(userId);
    await connectMongoDB();

    const updateFields: Record<string, any> = {};
    updateFields[type] = newValue;

    const updatedAccount = await Account.updateOne(
      { _id: userId },
      { $set: updateFields }
    );
    console.log("aaa", updatedAccount);
    return NextResponse.json({ message: "更新完了" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
