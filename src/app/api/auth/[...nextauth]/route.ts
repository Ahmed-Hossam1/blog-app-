import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "../../../../prisma/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";

/* 
Why this configuration?

Instead of using the basic default `export const authOptions`,
we explicitly type the configuration with `NextAuthOptions`.

This allows us to extend the session type and safely include
additional properties (like the user's Prisma `id`) in `session.user`.
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
    // Custom Auth With  Email / Password
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

        // compare hashed password
        const hashedPassword = await bcrypt.compare(
          credentials?.password as string,
          user.password as string,
        );

        if (!hashedPassword) return null;
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        };
      },
     
    }),
    
  ],
  callbacks: {
  async jwt({ token, user }) {
    if (user) {
      token.id = user.id; // attach the Prisma user id  to the token
    }

    /* If the token has no id and the user has an email 
     * attach the Prisma user id to the token
     */
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

  // Attach the Prisma user id to the session
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
