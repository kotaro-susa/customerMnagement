import mongoose, { models } from "mongoose";
import Account from "./account";
import Deal from "./deal";

const caseSchema = new mongoose.Schema(
  {
    ProjectOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Account,
      required: true,
    },
    ProjectName: { type: String, required: true },
    ProjectType: {
      type: String,
      enum: ["seller", "buyer", "others"],
      required: true,
    },
    Progress: {
      type: String,
      enum: ["initial", "ongoing", "contracting", "hold"],
      required: true,
    },
    CloseDate: { type: Date, required: true },
    AskingPrice: { type: Number, required: true },
    Description: { type: String },
    tenantId: { type: String, required: true },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

const Case = models.Case || mongoose.model(`Case`, caseSchema);
export default Case;
