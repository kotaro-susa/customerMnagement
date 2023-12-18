import mongoose, { models } from "mongoose";
import Opportunity from "./opportunity";

const orderSchema = new mongoose.Schema(
  {
    OpportunityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Opportunity,
      required: false,
    },
    OrderName: { type: String, required: true },
    Property: { type: String },
    PaymentStatus: {
      type: String,
      enum: [
        "Unpaid",
        "Paid",
        "Delayed",
        "PartialPayment",
        "Refunded",
        "InProgress",
      ],
    },
    Amount: { type: Number },
    OrderDate: { type: Date },
    ClosingDate: { type: Date },
    TotalAmount: { type: Number },
    Probability: { type: Number },
    Type: { type: String, enum: ["New", "Add", "UpSell"] },
    Description: { type: String },
    tenantId: { type: String, required: true },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

const Order = models.Order || mongoose.model(`Order`, orderSchema);
export default Order;
