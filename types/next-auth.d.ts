import NextAuth, { DefaultUser } from "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  export interface User extends DefaultUser {
    tenantId: string;
    isRole: string;
    company: string;
    userId: string;
  }
}

declare module "next-auth" {
  export interface Session extends DefaultSession {
    user: {
      name:string;
      email:string;
      tenantId?: string;
      isRole?: string;
      company?: string;
      userId?: string;
    };
  }
}
