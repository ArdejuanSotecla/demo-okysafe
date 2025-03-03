import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    OKYSAFE_CLIENT_SECRET_KEY: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_ORIGIN: z.string().url(),
    NEXT_PUBLIC_OKYSAFE_CLIENT_PUBLIC_KEY: z.string().min(1),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_ORIGIN: process.env.NEXT_PUBLIC_ORIGIN,
    NEXT_PUBLIC_OKYSAFE_CLIENT_PUBLIC_KEY:
      process.env.NEXT_PUBLIC_OKYSAFE_CLIENT_PUBLIC_KEY,
  },
});
