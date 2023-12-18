import { connectMongoDB } from "@/app/lib/mongodb";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import Account from "@/models/account";
import { authOptions } from "../../auth/[...nextauth]/route";
import Company from "@/models/company";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const companyName = params.id;
    console.log(companyName);
    const regex = new RegExp(companyName, "i");
    await connectMongoDB();
    const session = await getServerSession(authOptions);
    const selectCompany = await Company.find(
      {
        tenantId: session?.user.tenantId,
        name: regex,
      },
      "name"
    ).exec();
    console.log(selectCompany);
    const selectAccount = await Promise.all(
      selectCompany.map(async (company) => {
        const account = await Account.find({ companyId: company._id }, "name")
          .populate("companyId", "name")
          .exec();
        return account;
      })
    );
    return NextResponse.json({ selectAccount }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 501 });
  }
}
