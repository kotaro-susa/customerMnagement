import mongoose, { models } from "mongoose";
import Account from "./account";

const uploadFileSchema = new mongoose.Schema(
  {
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Account,
      required: true,
    },
    name: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: Buffer, required: true },
    tenantId: { type: String, required: true },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

const UploadFile = models.UploadFile || mongoose.model(`UploadFile`, uploadFileSchema);
export default UploadFile;
