import { connectMongoDB } from "@/app/lib/mongodb";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import Deal from "@/models/deal";

export async function POST(req: NextRequest) {
  try {
    const {
      caseId,
      dealName,
      description,
      status,
      source,
      nextDealDay,
      nextDealDayAfter,
      amount,
    }: {
      caseId: string;
      dealName: string;
      description: string;
      status: string;
      source: string;
      nextDealDay: Date;
      nextDealDayAfter: Date;
      amount: number;
    } = await req.json();
    await connectMongoDB();
    const session = await getServerSession(authOptions);
    const deal = await Deal.create({
      ParentCaseId: caseId,
      DealName: dealName,
      Description: [{ date: new Date(), content: description }],
      Progress: status,
      Source: source,
      NextDealDate: [{ start: nextDealDay, end: nextDealDayAfter }],
      amount: amount,
      tenantId: session?.user.tenantId,
      userId: session?.user.userId,
    });
    return NextResponse.json({ message: "成功" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
