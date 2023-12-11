import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    SUPABASE_URL: z.string().url(),
    SUPABASE_KEY: z.string(),
    APP_SECRET: z.string(),
    BOT_TOKEN: z.string(),
  },
  client: {
    NEXT_PUBLIC_TEST_DATA: z.string().optional(),
    NEXT_PUBLIC_POSTHOG_KEY: z.string(),
    NEXT_PUBLIC_POSTHOG_HOST: z.string(),
  },
  runtimeEnv: {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_KEY: process.env.SUPABASE_KEY,
    APP_SECRET: process.env.APP_SECRET,
    BOT_TOKEN: process.env.BOT_TOKEN,
    NEXT_PUBLIC_TEST_DATA: process.env.NEXT_PUBLIC_TEST_DATA,
    NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
    NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  },
});
