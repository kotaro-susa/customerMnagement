import { connectMongoDB } from "@/app/lib/mongodb";
import Account from "@/models/account";
import Company from "@/models/company";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { inputvalue: string } }
) {
  try {
    console.log("paramsを表示", params);
    const inputValue = params.inputvalue;
    await connectMongoDB();
    const regex = new RegExp(inputValue, "i");
    // 非同期処理を配列に入れる
    const suggestions = await Company.find({ name: regex }, null).exec();
    // Promise.allで非同期処理を待つ
    return NextResponse.json({ suggestions, inputValue }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "エラーです" }, { status: 500 });
  }
}
