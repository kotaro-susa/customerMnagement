import mongoose, { models } from "mongoose";
import Company from "./company";

const accountSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email:{type: String, required: true},
    tenantId: { type: String, required: true },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

const Account = models.Account || mongoose.model(`Account`, accountSchema);
export default Account;
