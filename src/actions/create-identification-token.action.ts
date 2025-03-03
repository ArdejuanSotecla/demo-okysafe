"use server";

import { env } from "@/lib/env";
import { sign, decode } from "jsonwebtoken";

let token: string | null = null;

export const createIdentificationTokenAction = async (): Promise<string> => {
  if (token === null) {
    token = sign(
      {
        clientPublicKey: env.NEXT_PUBLIC_OKYSAFE_CLIENT_PUBLIC_KEY,
        clientWebOrigin: env.NEXT_PUBLIC_ORIGIN,
      },
      env.OKYSAFE_CLIENT_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
  } else {
    const decoded = decode(token);

    if (
      typeof decoded === "object" &&
      decoded != null &&
      decoded.exp != null &&
      decoded.exp < Date.now() / 1000
    ) {
      token = sign(
        {
          clientPublicKey: env.NEXT_PUBLIC_OKYSAFE_CLIENT_PUBLIC_KEY,
          clientWebOrigin: env.NEXT_PUBLIC_ORIGIN,
        },
        env.OKYSAFE_CLIENT_SECRET_KEY,
        {
          expiresIn: "1h",
        }
      );
    }
  }

  return token;
};
