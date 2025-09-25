"use server";

import { env } from "@/lib/env";

interface GetVerificationUrlActionParams {
  email: string;
}

export const getVerificationUrlAction = async ({
  email,
}: GetVerificationUrlActionParams): Promise<string> => {
  const url = new URL("https://api.okysafe.com/v1/email-check-requests");

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.OKYSAFE_CLIENT_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      clientId: env.OKYSAFE_CLIENT_ID,
      email,
      callbackUrl: "http://fakingsdev.com:3000/verification-callback",
    }),
  });

  if (!response.ok) {
    throw new Error("Could not create email check request");
  }

  const responseJson = await response.json();

  return responseJson.verificationUrl;
};
