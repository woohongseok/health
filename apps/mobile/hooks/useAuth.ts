import { useMutation, useQuery } from "@tanstack/react-query";
import { AuthStore } from "lib/store/authStore";
import { supabase } from "lib/supabase";
import { useEffect } from "react";

export const useAuth = () => {
  const { setSession } = AuthStore();

  const { data: session, isLoading } = useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      return session;
    },
    // onSuccess: (data: Session | null) => {
    //   setSession(data);
    // },
  });

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [setSession]);

  return { session, isLoading };
};

export const useSignOut = () => {
  const { setSession } = AuthStore();

  return useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },
    onSuccess: () => {
      setSession(null);
    },
  });
};
