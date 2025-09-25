"use server";

import { env } from "@/lib/env";
import { sign, decode } from "jsonwebtoken";

let token: string | null = null;

const generateToken = (): string => {
  return sign(
    {
      clientPublicKey: env.NEXT_PUBLIC_OKYSAFE_CLIENT_PUBLIC_KEY,
      iframeOrigin: env.NEXT_PUBLIC_ORIGIN,
      redirectAfterVerificationUrl:
        "http://fakingsdev.com:3000/verification-callback",
      isVerificationRequired: true,
    },
    env.OKYSAFE_CLIENT_SECRET_KEY,
    {
      expiresIn: "1h",
    }
  );
};

export const createIdentificationTokenAction = async (): Promise<string> => {
  if (token === null) {
    token = generateToken();
  } else {
    const decoded = decode(token);

    if (
      typeof decoded === "object" &&
      decoded != null &&
      decoded.exp != null &&
      decoded.exp < Date.now() / 1000
    ) {
      token = generateToken();
    }
  }

  return token;
};
