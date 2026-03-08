import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";


/*
This file extends NextAuth TypeScript types.

By default, NextAuth's `session.user` does not include the user's `id`.
Here we extend the `Session` and `JWT` types so we can safely access
`session.user.id` in our application.

This helps TypeScript understand that the user's Prisma `id`
is stored in both the JWT token and the session.
*/

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
}