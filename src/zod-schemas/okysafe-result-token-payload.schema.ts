import { z } from "zod";

export const okysafeResultTokenPayloadSchema = z.union([
  z.object({ isVerified: z.boolean() }),
  z.object({ errorCode: z.string() }),
]);
