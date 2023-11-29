import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL!);
    console.log("通信成功");
  } catch (error) {
    console.log("エラーが出ています。");
  }
};
