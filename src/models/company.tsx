import mongoose, { models } from "mongoose";

const companySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    industry: { type: String, required: true },
    zipCode: { type: String, required: true },
    pref: { type: String, required: true },
    address: { type: String, required: true },
    streetAddress: { type: String, required: true },
    buildingName: { type: String },
    phoneNumber: { type: String },
    tenantId: { type: String, required: true },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

const Company = models.Company || mongoose.model(`Company`, companySchema);
export default Company;
