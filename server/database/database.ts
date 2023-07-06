import { createClient } from "@supabase/supabase-js";
import { env } from "../../env.mjs";

const supabaseUrl = env.SUPABASE_URL;
const supabaseKey = env.SUPABASE_KEY;

if (!supabaseUrl) {
  throw new Error("No supabase url provided");
}

if (!supabaseKey) {
  throw new Error("No supabase key provided");
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
});
