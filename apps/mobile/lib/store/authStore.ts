import { Session } from "@supabase/supabase-js";
import { create } from "zustand";

export const AuthStore = create<{
  session: Session | null;
  loading: boolean;
  setSession: (session: Session | null) => void;
  setLoading: (loading: boolean) => void;
}>((set) => ({
  session: null,
  loading: false,
  setSession: (session) => set({ session }),
  setLoading: (loading) => set({ loading }),
}));
