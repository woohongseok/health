// hooks/useLogin.ts
import { useMutation } from "@tanstack/react-query";
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";
import { login, getProfile } from "@react-native-seoul/kakao-login";
import { supabase } from "lib/supabase";
import { Alert } from "react-native";
import { AuthStore } from "lib/store/authStore";

export const useGoogleSignIn = () => {
  const { setLoading, setSession } = AuthStore();

  return useMutation({
    mutationFn: async () => {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      if (!userInfo.data?.idToken) {
        throw new Error("ID 토큰이 없습니다");
      }

      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: "google",
        token: userInfo.data.idToken,
      });
      setSession(data.session);

      if (error) throw error;

      return userInfo;
    },
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      Alert.alert("성공", "Google로 로그인되었습니다!");
    },
    onError: (error: { code: string; message: string }) => {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert("로그인 취소됨", "로그인이 취소되었습니다");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert("로그인 진행 중", "이미 로그인이 진행 중입니다");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert(
          "Google Play 서비스 오류",
          "Google Play 서비스를 사용할 수 없거나 업데이트가 필요합니다"
        );
      } else {
        Alert.alert("로그인 오류", error.message || "로그인 중 오류가 발생했습니다");
      }
      console.log(error);
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
      Alert.alert("카카오 로그인 성공", `${data.profile.nickname}님 환영합니다!`);
    },
    onError: (error) => {
      Alert.alert("카카오 로그인 오류", error.message || "카카오 로그인 중 오류가 발생했습니다");
    },
    onSettled: () => {
      setLoading(false);
    },
  });
};
