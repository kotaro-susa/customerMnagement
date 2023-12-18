import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import Case from "@/models/case";
import { connectMongoDB } from "@/app/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const {
      accountId,
      project,
      projectType,
      closeDate,
      amount,
      description,
    }: {
      accountId: string;
      project: string;
      projectType: string;
      closeDate: Date;
      amount: string;
      description: string;
    } = await req.json();
    await connectMongoDB();
    const session = await getServerSession(authOptions);
    const user = await Case.create({
      ProjectOwner: accountId,
      ProjectName: project,
      ProjectType: projectType,
      Progress: "initial",
      CloseDate: closeDate,
      AskingPrice: amount,
      Description: description,
      tenantId: session?.user.tenantId,
      userId: session?.user.userId,
    });
    console.log(user);
    return NextResponse.json(
      { message: "ユーザーの登録が完了しました" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectMongoDB();
    const session = await getServerSession(authOptions);
    const AllCase = await Case.find({
      tenantId: session?.user.tenantId,
    })
      .populate({
        path: "ProjectOwner",
        select: "name companyId",
        populate: {
          path: "companyId", // ネストしたpopulate
          model: "Company", // Companyモデルの名前
          select: "name", // 必要なフィールド
        },
      })
      .exec();
    return NextResponse.json({ AllCase }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 501 });
  }
}
