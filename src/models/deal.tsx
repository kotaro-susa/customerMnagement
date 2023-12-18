import mongoose, { models } from "mongoose";
import Case from "./case";

const dealSchema = new mongoose.Schema(
  {
    ParentCaseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Case,
      required: true,
    },
    DealName: { type: String, required: true },
    Description: {
      type: [
        {
          date: { type: Date, required: true },
          content: { type: String, required: true },
        },
      ],
      required: true,
    },
    Progress: {
      type: String,
      enum: ["initial", "ongoing", "contracting", "hold"],
      required: true,
    },
    Source: { type: String, required: true },
    NextDealDate: { type: [{ start: { type: Date }, end: { type: Date } }] },
    amount: { type: Number },
    tenantId: { type: String, required: true },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

const Deal = models.Deal || mongoose.model(`Deal`, dealSchema);
export default Deal;
