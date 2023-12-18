import { connectMongoDB } from "@/app/lib/mongodb";
import Company from "@/models/company";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { inputvalue: string } }
) {
  try {
    const inputValue = params.inputvalue;
    await connectMongoDB();
    const regex = new RegExp(inputValue, "i");
    const suggestions = await Company.find({ name: regex }, null).exec();
    // Promise.allで非同期処理を待つ
    return NextResponse.json({ suggestions }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "エラーです" }, { status: 500 });
  }
}
