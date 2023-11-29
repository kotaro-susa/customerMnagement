import mongoose, { models } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    tenantId:{type:String,required: true},
    company: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    isRole: { type: String, enum:["admin","manager","user"],required: true },
  },
  { timestamps: true }
);

const User = models.User || mongoose.model(`User`, userSchema);
export default User;
