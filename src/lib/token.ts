import { prisma } from "@/prisma/prisma";
import crypto from "crypto";

export const generateToken = async (email: string) => {
  // ===== Generate a Secure Random Token =====
  const token = crypto.randomBytes(32).toString("hex");
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
