import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useGoogleSignIn, useKakaoSignIn } from "hooks/useLogin";
import { AuthStore } from "lib/store/authStore";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faGoogle, faKakaoTalk } from "@fortawesome/free-brands-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export default function LoginScreen() {
  const { loading } = AuthStore();
  const googleSignIn = useGoogleSignIn();
  const kakaoSignIn = useKakaoSignIn();

  return (
    <View className="flex-1 bg-white">
      {/* Header Section */}
      <View className="pt-20 pb-16 px-6">
        <View className="items-center">
          <View className="mb-8"></View>
          <Text className="text-3xl font-bold text-gray-900 text-center mb-4 leading-tight">
            HEALTH APP
          </Text>
          <Text className="text-sm text-gray-600 text-center leading-6">
            보디빌딩만을 위한 하드코어한 앱을 즐겨보세요
          </Text>
        </View>
      </View>

      {/* Button Section */}
      <View className="flex-1 justify-center px-6">
        <View className="gap-4">
          <TouchableOpacity
            className="flex-row items-center justify-center py-5 px-6 rounded-xl border border-gray-300 bg-white shadow-sm active:bg-gray-50"
            onPress={() => googleSignIn.mutate()}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#4285F4" size="small" />
            ) : (
              <>
                <FontAwesomeIcon icon={faGoogle as IconDefinition} size={20} />
                <Text className="text-base font-semibold text-gray-700 ml-3">
                  Google로 계속하기
                </Text>
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center justify-center py-5 px-6 rounded-xl border border-yellow-400 bg-yellow-400 shadow-sm active:bg-yellow-500"
            onPress={() => kakaoSignIn.mutate()}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#000000" size="small" />
            ) : (
              <>
                <FontAwesomeIcon icon={faKakaoTalk as IconDefinition} size={20} />
                <Text className="text-base font-semibold text-black ml-3">카카오로 계속하기</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer Section */}
      <View className="px-6 pb-12 pt-8">
        <Text className="text-xs text-gray-500 text-center leading-5">
          계속 진행하시면 서비스 이용약관 및 개인정보처리방침에 동의하는 것으로 간주됩니다.
        </Text>
      </View>
    </View>
  );
}
