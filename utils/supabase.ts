import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseRoleKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93anFwZGJ0dWtlbXVva3l2a3RwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5ODAzNjEzMiwiZXhwIjoyMDEzNjEyMTMyfQ.4X0TJp73dGV9b0EC5yeRgsVEXq_Z3N9DAU4aFe3Yp_A";
const supabaseUrl = "https://owjqpdbtukemuokyvktp.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93anFwZGJ0dWtlbXVva3l2a3RwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgwMzYxMzIsImV4cCI6MjAxMzYxMjEzMn0.D_eHgdxv6alNSZj8jMse3DlJ8D6y7-53q5PrvTpYbn4";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
