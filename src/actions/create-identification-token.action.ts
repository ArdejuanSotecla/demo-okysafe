"use server";

import { env } from "@/lib/env";
import { sign } from "jsonwebtoken";

export const createIdentificationTokenAction = async (): Promise<string> => {
  return sign(
    {
      clientPublicKey: env.NEXT_PUBLIC_OKYSAFE_CLIENT_PUBLIC_KEY,
      clientWebOrigin: env.NEXT_PUBLIC_ORIGIN,
    },
    env.OKYSAFE_CLIENT_SECRET_KEY
  );
};
