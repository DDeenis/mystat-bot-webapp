import { createClient } from "@supabase/supabase-js";
import { IUser } from "./types";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl) {
  throw new Error("No supabase url provided");
}

if (!supabaseKey) {
  throw new Error("No supabase key provided");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
