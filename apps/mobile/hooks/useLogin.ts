import { useMutation } from "@tanstack/react-query";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { login, getProfile } from "@react-native-seoul/kakao-login";
import { supabase } from "lib/supabase";
import { AuthStore } from "lib/store/authStore";

export const useGoogleSignIn = () => {
  const { setLoading, setSession } = AuthStore();

  return useMutation({
    mutationFn: async () => {
      /* TODO 1. 구글 로그인 오픈
       * TODO 2. SUPABASE 이메일 체크
       * TODO 3. 회원가입 or 로그인 완료
       */
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: "google",
        token: userInfo.data?.idToken ?? "",
      });

      if (error) throw error;

      setSession(data.session);

      const userEmail = data.session?.user?.email;
      if (!userEmail) {
        throw new Error("이메일 정보를 가져올 수 없습니다");
      }

      return { userInfo };
    },
    onError: (error) => {
      /* TODO : 구글 로그인 에러 핸들링 하는데 공식 문서 참고
       * TODO : supabase 에러 핸들링 하는데 공식 문서 참고
       */
    },
    onSettled: () => {
      setLoading(false);
    },
  });
};

export const useKakaoSignIn = () => {
  const { setLoading, setSession } = AuthStore();

  return useMutation({
    mutationFn: async () => {
      const token = await login();
      const profile = await getProfile();

      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: "kakao",
        token: token.idToken,
      });

      setSession(data.session);
      if (error) throw error;

      return { token, profile };
    },
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (data) => {
      return { status: "success", data };
    },
    onError: (error) => {
      return { status: "error", error };
    },
    onSettled: () => {
      setLoading(false);
    },
  });
};
