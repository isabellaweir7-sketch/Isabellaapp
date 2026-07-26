import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured) {
  console.warn(
    'Supabase is not configured yet — set EXPO_PUBLIC_SUPABASE_URL and ' +
      'EXPO_PUBLIC_SUPABASE_ANON_KEY in mobile/.env (see .env.example). ' +
      'The app falls back to local-only mock data until then.'
  );
}

// Falls back to harmless placeholder values so the client can still be
// constructed (and the rest of the app can render) before real credentials
// are configured — isSupabaseConfigured is what callers should check before
// actually relying on it.
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key',
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
      // PKCE is the flow that works reliably with a mobile app's OAuth
      // redirect (WebBrowser hands back a `code` query param to exchange,
      // rather than relying on URL-fragment tokens).
      flowType: 'pkce',
    },
  }
);
