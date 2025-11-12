import { createClient, SupabaseClient } from '@supabase/supabase-js';

let client: SupabaseClient | null = null;

export const getSupabaseClient = () => {
  if (client) return client;

  const url = process.env.SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.SUPABASE_ANON_KEY ??
    process.env.SUPABASE_API_KEY;

  if (!url || !key) {
    throw new Error('Supabase environment variables are not configured');
  }

  client = createClient(url, key, {
    auth: { persistSession: false },
  });

  return client;
};
