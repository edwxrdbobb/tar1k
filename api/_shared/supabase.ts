import process from 'node:process';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

let client: SupabaseClient | null = null;

export const getSupabaseClient = () => {
  if (client) return client;

  const url = process.env.SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.SUPABASE_ANON_KEY ??
    process.env.SUPABASE_API_KEY;

  const keyName = process.env.SUPABASE_SERVICE_ROLE_KEY
    ? 'SUPABASE_SERVICE_ROLE_KEY'
    : process.env.SUPABASE_ANON_KEY
    ? 'SUPABASE_ANON_KEY'
    : process.env.SUPABASE_API_KEY
    ? 'SUPABASE_API_KEY'
    : null;

  console.log(`[env] SUPABASE_URL ${url ? 'present' : 'missing'}`);
  console.log(`[env] Supabase key ${key ? 'present' : 'missing'}${keyName ? ` (${keyName})` : ''}`);

  if (!url || !key) {
    throw new Error('Supabase environment variables are not configured');
  }

  client = createClient(url, key, {
    auth: { persistSession: false },
  });

  return client;
};
