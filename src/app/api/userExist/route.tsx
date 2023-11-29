import { connectMongoDB } from "@/app/lib/mongodb";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email }: { email: string } = await req.json();
    await connectMongoDB();
    const user = await User.findOne({ email }).select("_id").exec();
    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "エラーが発生" }, { status: 500 });
  }
}
