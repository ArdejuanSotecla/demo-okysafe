import { z } from "zod";

export const okysafeEventDataSchema = z.union([
  z.object({
    code: z.literal("okysafe.age-consent-ok"),
  }),
  z.object({
    code: z.literal("okysafe.already-verified"),
    payload: z.object({
      nonce: z.string().uuid(),
      signature: z.string().min(1),
    }),
  }),
]);
