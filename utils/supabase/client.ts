import { createBrowserClient } from "@supabase/ssr";
import { Database } from "./generated-types";

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';
  
  console.log('🔗 [Supabase] URL:', supabaseUrl);
  console.log('🔑 [Supabase] Key exists:', !!supabaseAnonKey && supabaseAnonKey !== 'placeholder-key');
  
  return createBrowserClient<Database>(
    supabaseUrl,
    supabaseAnonKey,
    {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
        flowType: 'pkce',
        debug: process.env.NODE_ENV === 'development',
      },
      global: {
        headers: {
          'X-Client-Info': 'ankunstudio-web/1.0.0'
        }
      },
      db: {
        schema: 'public'
      }
    }
  );
}
