import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    SUPABASE_URL: z.string().url(),
    SUPABASE_KEY: z.string(),
    APP_SECRET: z.string(),
  },
  client: {
    NEXT_PUBLIC_TEST_ID: z.string().optional(),
  },
});
