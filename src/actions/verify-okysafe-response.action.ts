"use server";

import { env } from "@/lib/env";
import { createHmac } from "node:crypto";

interface OkysafeAlreadyVerifiedEvent {
  nonce: string;
  signature: string;
}

export const verifyOkysafeResponseAction = async (
  event: OkysafeAlreadyVerifiedEvent
): Promise<void> => {
  const hmac = createHmac("sha256", env.OKYSAFE_CLIENT_SECRET_KEY)
    .update(env.NEXT_PUBLIC_DOMAIN)
    .update(env.NEXT_PUBLIC_OKYSAFE_CLIENT_PUBLIC_KEY)
    .update(event.nonce)
    .digest("hex");

  if (hmac !== event.signature) {
    throw new Error("Invalid signature");
  }
};
