import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";
import { login, getProfile, KakaoOAuthToken, KakaoProfile } from "@react-native-seoul/kakao-login";
import { supabase } from "lib/supabase";

export default function LoginScreen({
  loading,
  setLoading,
}: {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}) {
  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      if (userInfo.data?.idToken) {
        const { error } = await supabase.auth.signInWithIdToken({
          provider: "google",
          token: userInfo.data.idToken,
        });

        if (error) {
          Alert.alert(
            "Sign In Error",
            `${error.message}\n\nPlease enable "Skip nonce check" in Supabase Dashboard:\nAuthentication > Providers > Google`
          );
        } else {
          Alert.alert("Success", "Successfully signed in with Google!");
        }
      } else {
        throw new Error("no ID token present!");
      }
    } catch (error: unknown) {
      const err = error as { code?: string; message?: string };
      if (err.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert("Sign In Cancelled", "Sign in was cancelled");
      } else if (err.code === statusCodes.IN_PROGRESS) {
        Alert.alert("Sign In", "Sign in is already in progress");
      } else if (err.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert("Play Services Error", "Google Play Services is not available or outdated");
      } else {
        Alert.alert("Sign In Error", err.message || "An error occurred during sign in");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKakaoSignIn = async () => {
    setLoading(true);
    try {
      const token: KakaoOAuthToken = await login();

      const profile: KakaoProfile = await getProfile();

      Alert.alert("Kakao Login Success", `Welcome ${profile.nickname}!`);
      const { error } = await supabase.auth.signInWithIdToken({
        provider: "kakao",
        token: token.idToken,
      });

      if (error) {
        Alert.alert(
          "Sign In Error",
          `${error.message}\n\nPlease enable "Skip nonce check" in Supabase Dashboard:\nAuthentication > Providers > Google`
        );
      } else {
        Alert.alert("Success", "Successfully signed in with Kakao!");
      }
    } catch (error: unknown) {
      const err = error as { message?: string };
      Alert.alert("Kakao Login Error", err.message || "An error occurred during Kakao login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <View className="items-center pt-16 pb-10">
        <View className="mb-6">
          <View className="w-20 h-20 rounded-full bg-blue-50 justify-center items-center border-2 border-blue-100">
            <Text className="text-4xl">🏥</Text>
          </View>
        </View>
        <Text className="text-3xl font-bold text-gray-800 text-center mb-2 leading-9">
          Health App에 오신 것을 환영합니다
        </Text>
        <Text className="text-base text-gray-500 text-center leading-6">
          건강한 라이프스타일을 시작하세요
        </Text>
      </View>

      <View className="flex-1 justify-center">
        <View className="gap-3">
          <TouchableOpacity
            className="flex-row items-center justify-center py-4 px-6 rounded-xl border border-gray-300 bg-white min-h-14"
            onPress={handleGoogleSignIn}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#4285F4" size="small" />
            ) : (
              <>
                <Text className="text-xl font-bold text-blue-500 mr-3">G</Text>
                <Text className="text-base font-semibold text-gray-700">Google로 계속하기</Text>
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center justify-center py-4 px-6 rounded-xl border border-yellow-400 bg-yellow-400 min-h-14"
            onPress={handleKakaoSignIn}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#000000" size="small" />
            ) : (
              <>
                <Text className="text-xl font-bold text-black mr-3">K</Text>
                <Text className="text-base font-semibold text-black">카카오로 계속하기</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <View className="pb-8 pt-6">
        <Text className="text-xs text-gray-400 text-center leading-5">
          계속 진행하시면 서비스 이용약관 및 개인정보처리방침에 동의하는 것으로 간주됩니다.
        </Text>
      </View>
    </>
  );
}
