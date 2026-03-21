import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "../../../../prisma/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";

// ===== NextAuth Configuration =====

/**
 * Explicitly typed with NextAuthOptions to support
 * extending the session type with the user's Prisma `id`.
 */
export const authOptions: NextAuthOptions = ({
  session: {
    strategy: "jwt",
  },

  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    // ===== Credentials Provider =====
    Credentials({
      name: "credentials",
      credentials: {
        email: { type: "text" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });
        if (!user) return null;

        // ===== Compare Hashed Password =====
        const isPasswordValid = await bcrypt.compare(
          credentials?.password as string,
          user.password as string,
        );

        if (!isPasswordValid) return null;
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        };
      },
     
    }),
    
  ],
  // ===== JWT & Session Callbacks =====
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }

      // If the token has no id (e.g. OAuth first sign-in), fetch from DB
      if (!token.id && token.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email },
        });

        if (dbUser) {
          token.id = dbUser.id;
        }
      }

    return token;
  },

    // ===== Attach Prisma user id to the session =====
    async session({ session, token }) {
    if (session.user) {
      session.user.id = token.id as string;
    }
    return session;
  },
},

  pages: {
    signIn: "/sign-in",
  },
});

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
