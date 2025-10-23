import { Session } from "@supabase/supabase-js";
import { supabase } from "lib/supabase";
import { TouchableOpacity, Text, View } from "react-native";

export default function HomeScreen({ session }: { session: Session }) {
  return (
    <View className="flex-1 bg-white">
      <View className="items-center pt-16 pb-10">
        <View className="mb-6">
          <View className="w-20 h-20 rounded-full bg-blue-50 justify-center items-center border-2 border-blue-100">
            <Text className="text-4xl">🏥</Text>
          </View>
        </View>
        <Text className="text-3xl font-bold text-gray-800 text-center mb-2 leading-9">
          건강 대시보드
        </Text>
        <Text className="text-base text-gray-500 text-center leading-6">오신 것을 환영합니다</Text>
      </View>

      <View className="flex-1 justify-center px-6">
        <View className="bg-gray-50 rounded-xl p-4 mb-6">
          <Text className="text-sm text-gray-600 mb-2">현재 계정</Text>
          <Text className="text-lg font-semibold text-gray-800">{session.user.email}</Text>
        </View>

        <TouchableOpacity
          className="bg-red-500 rounded-xl py-4 px-6 items-center"
          onPress={() => supabase.auth.signOut()}
        >
          <Text className="text-white font-semibold text-base">로그아웃</Text>
        </TouchableOpacity>
      </View>

      <View className="pb-8 pt-6">
        <Text className="text-xs text-gray-400 text-center leading-5">
          © 2025 Health App. All rights reserved.
        </Text>
      </View>
    </View>
  );
}
