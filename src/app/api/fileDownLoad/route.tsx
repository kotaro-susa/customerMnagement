import UploadFile from "@/models/file";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url).searchParams;
    const query = url.get("q");
    const queryString = query?.toString();
    const selectPdf = await UploadFile.find({ _id: queryString })
      .select("content")
      .exec();
    const arrayBinary = selectPdf[0].content;
    const base64Data = arrayBinary && arrayBinary.toString("base64");
    return NextResponse.json({ base64Data }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "エラーですか" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    console.log(req);
    const url = new URL(req.url).searchParams;
    console.log(url);
    const query = url.get("q");
    console.log(query);
    const queryString = query?.toString();
    const deletePdf = await UploadFile.deleteOne({ _id: queryString });
    return NextResponse.json({ message: "削除成功" }, { status: 201 });
  } catch {
    return NextResponse.json({ message: "エラーですか" }, { status: 500 });
  }
}
