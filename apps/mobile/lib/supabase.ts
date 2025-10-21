import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cailvysbvdsmksiasfbq.supabase.co";
const supabasePublishableKey = "sb_publishable_3U3ZusoYVrnsI_3GYc4mJA_m6Gkwq36";

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
