import { createClient } from "@supabase/supabase-js";

// This file should only be imported in server-side contexts
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error("Missing env.local NEXT_PUBLIC_SUPABASE_URL");
}

if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("Missing env.local SUPABASE_SERVICE_ROLE_KEY");
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Admin client with service role for server-side operations only
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});
