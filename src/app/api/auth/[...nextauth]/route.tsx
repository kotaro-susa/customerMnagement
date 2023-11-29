import { connectMongoDB } from "@/app/lib/mongodb";
import User from "@/models/user";
import nextAuth, {
  Session,
  SessionStrategy,
  User as UserNext,
} from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";

declare module "next-auth/jwt" {
  interface JWT {
    isRole?: "admin" | "manager" | "user";
  }
}

type ClientType = {
  clientId: string;
  clientSecret: string;
};

export const authOptions = {
  providers: [
    GoogleProvider({
      name: "google",
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    } as ClientType),
  ],
  session: { strategy: "jwt" as SessionStrategy },
  secret: process.env.NEXTAUTH_SECRET,
  pages: { signIn: "/" },
  callbacks: {
    signIn: async (params: { user: UserNext }) => {
      const { user } = params;
      await connectMongoDB();
      //   DBからユーザーを抽出して、照合する
      const RegisteredUser = await User.findOne({ email: user.email }).exec();
      // 特定のメールアドレス
      if (RegisteredUser) {
        return true;
      } else {
        return false;
      }
    },
    session: async ({ session, token }: { session: Session; token: JWT }) => {
      await connectMongoDB();
      const RegisteredUser = await User.findOne({
        email: session.user?.email,
      }).exec();
      token.isRole = RegisteredUser.isRole;
      return {
        ...session,
        user: {
          ...session.user,
          tenantId: RegisteredUser.tenantId,
          isRole: RegisteredUser.isRole,
          company: RegisteredUser.company,
          userId: RegisteredUser._id,
        },
        token: token,
      };
    },
  },
};

const handler = nextAuth(authOptions);
export { handler as GET, handler as POST };
