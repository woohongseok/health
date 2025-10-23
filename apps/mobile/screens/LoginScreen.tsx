import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useGoogleSignIn, useKakaoSignIn } from "hooks/useLogin";
import { AuthStore } from "lib/store/authStore";

export default function LoginScreen() {
  const { loading } = AuthStore();
  const googleSignIn = useGoogleSignIn();
  const kakaoSignIn = useKakaoSignIn();

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
            onPress={() => googleSignIn.mutate()}
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
            onPress={() => kakaoSignIn.mutate()}
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
