import { connectMongoDB } from "@/app/lib/mongodb";
import Company from "@/models/company";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { company: string } }
) {
  try {
    const company = params.company;
    await connectMongoDB();
    const regex = new RegExp(company, "i");
    // 非同期処理を配列に入れる
    const suggestions = await Company.find({ name: regex }, null).exec();
    return NextResponse.json({ suggestions }, { status: 200});
  } catch (error) {
    return NextResponse.json(
      { message: "エラーが発生しました" },
      { status: 500 }
    );
  }
}
