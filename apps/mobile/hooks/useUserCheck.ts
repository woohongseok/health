import { supabase } from "lib/supabase";
import { useEffect, useState } from "react";

export const useUserCheck = (email: string) => {
  const [exists, setExists] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!email) {
      setIsLoading(false);
      return;
    }

    const checkUser = async () => {
      try {
        const { count, error } = await supabase
          .from("users")
          .select("*", { count: "exact", head: true })
          .eq("email", email);

        if (error) throw error;
        setExists((count ?? 0) > 0);
      } catch (error) {
        console.error("유저 조회 중 오류가 발생했습니다:", error);
      } finally {
        setIsLoading(false);
      }
    };
    checkUser();
  }, [email]);

  return { exists, isLoading };
};
