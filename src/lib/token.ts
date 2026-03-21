import { prisma } from "@/prisma/prisma";

export const generateToken = async (email: string) => {
  // Generate a random token
  const token =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  const expires = new Date().getTime() + 1000 * 60 * 60; // expires after 1 hour from now

  const verificationToken = await prisma.verificationToken.create({
    data: {
      email,
      token,
      expires: new Date(expires),
    },
  });

  return verificationToken;
};
