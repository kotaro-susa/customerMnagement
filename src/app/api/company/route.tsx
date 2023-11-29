import { connectMongoDB } from "@/app/lib/mongodb";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import Company from "@/models/company";

export async function POST(req: NextRequest) {
  try {
    const {
      company,
      industry,
      zipCode,
      pref,
      address,
      streetAddress,
      buildingName,
      phoneNumber,
    }: {
      company: string;
      industry: string;
      zipCode: string;
      pref: string;
      address: string;
      streetAddress: string;
      buildingName: string;
      phoneNumber: string;
    } = await req.json();
    await connectMongoDB();
    const session = await getServerSession(authOptions);
    const registerCompany = await Company.create({
      name: company,
      industry: industry,
      zipCode: zipCode,
      pref: pref,
      address: address,
      streetAddress: streetAddress,
      buildingName: buildingName,
      phoneNumber: phoneNumber,
      tenantId: session?.user.tenantId,
      userId: session?.user.userId,
    });
    return NextResponse.json(
      { message: "ユーザーの登録が完了しました" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
