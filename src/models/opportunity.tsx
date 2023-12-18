import mongoose, { models } from "mongoose";
import Account from "./account";

const opportunitySchema = new mongoose.Schema(
  {
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Account,
      required: true,
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Account,
      required: true,
    },
    OpportunityName: { type: String, required: true },
    CloseDate: { type: Date },
    Stage: {
      type: String,
      enum: ["Prospect", "Proposal", "Negotiation", "Closed", "Failure"],
    },
    Amount: { type: Number },
    Probability: { type: Number },
    Type: { type: String, enum: ["New", "Add", "UpSell"] },
    Description: { type: String },
    tenantId: { type: String, required: true },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

const Opportunity =
  models.Opportunity || mongoose.model(`Opportunity`, opportunitySchema);
export default Opportunity;
