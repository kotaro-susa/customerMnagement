import { connectMongoDB } from "@/app/lib/mongodb";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import UploadFile from "@/models/file";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const pdfFile = formData.get("pdf") as File | null;
    // jsonから抜き出す
    const ContractJsonString = formData.get("json") as string | null;
    const ContractJson = ContractJsonString && JSON.parse(ContractJsonString);
    const { selectAccountId, documentName, description } = ContractJson;
    // Blobに変換
    const blob = pdfFile && new Blob([pdfFile], { type: "application/pdf" });
    // バイナリーデータオブジェクトに変換
    const arrayBuffer = blob && (await blob.arrayBuffer());
    // セッションデータを取得
    const session = await getServerSession(authOptions);
    // バイナリーに変換（MongoDBに保存する）
    const arrayBinary = arrayBuffer && Buffer.from(arrayBuffer);
    console.log("バイナリー？？", arrayBinary);
    await connectMongoDB();
    const contract = await UploadFile.create({
      accountId: selectAccountId,
      name: documentName,
      description: description,
      content: arrayBinary,
      tenantId: session?.user.tenantId,
      userId: session?.user.userId,
    });
    // base64に変換
    return NextResponse.json({ message: "成功です" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url).searchParams;
    const query = url.get("q");
    const queryString = query?.toString();
    const selectPdf = await UploadFile.find({ accountId: queryString })
      .select("_id name description tenantId userId updatedAt")
      .exec();
    return NextResponse.json({ selectPdf }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "エラーですか" }, { status: 500 });
  }
}
