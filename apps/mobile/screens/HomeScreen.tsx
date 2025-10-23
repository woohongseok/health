import { Session } from "@supabase/supabase-js";
import { TouchableOpacity, Text, View, ActivityIndicator } from "react-native";
import { useSignOut } from "hooks/useAuth";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

function DashboardScreen() {
  return (
    <View className="flex-1 bg-white">
      <View className="items-center pt-12 pb-10">
        <View className="mb-6">
          <View className="w-20 h-20 rounded-full bg-blue-50 justify-center items-center border-2 border-blue-100">
            <Text className="text-4xl">📊</Text>
          </View>
        </View>
        <Text className="text-3xl font-bold text-gray-800 text-center mb-2 leading-9">
          건강 대시보드
        </Text>
        <Text className="text-base text-gray-500 text-center leading-6">오신 것을 환영합니다</Text>
      </View>

      <View className="flex-1 justify-center px-6">
        <View className="space-y-4">
          <View className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <Text className="text-sm text-blue-600 font-semibold mb-2">걸음 수</Text>
            <Text className="text-3xl font-bold text-blue-700">8,234</Text>
            <Text className="text-xs text-blue-500 mt-1">목표: 10,000</Text>
          </View>

          <View className="bg-green-50 rounded-xl p-4 border border-green-100">
            <Text className="text-sm text-green-600 font-semibold mb-2">수면 시간</Text>
            <Text className="text-3xl font-bold text-green-700">7h 30m</Text>
            <Text className="text-xs text-green-500 mt-1">좋은 수면입니다</Text>
          </View>

          <View className="bg-purple-50 rounded-xl p-4 border border-purple-100">
            <Text className="text-sm text-purple-600 font-semibold mb-2">심박수</Text>
            <Text className="text-3xl font-bold text-purple-700">72 bpm</Text>
            <Text className="text-xs text-purple-500 mt-1">정상 범위</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

function HistoryScreen() {
  return (
    <View className="flex-1 bg-white">
      <View className="items-center pt-12 pb-8">
        <View className="mb-6">
          <View className="w-20 h-20 rounded-full bg-purple-50 justify-center items-center border-2 border-purple-100">
            <Text className="text-4xl">📈</Text>
          </View>
        </View>
        <Text className="text-2xl font-bold text-gray-800">건강 기록</Text>
      </View>

      <View className="flex-1 px-6">
        <View className="space-y-3">
          {[1, 2, 3, 4, 5].map((item) => (
            <View key={item} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <Text className="text-sm text-gray-600 mb-1">2025년 10월 {23 - item}일</Text>
              <Text className="text-base font-semibold text-gray-800">평균 심박수: 71 bpm</Text>
              <Text className="text-xs text-gray-500 mt-2">걸음 수: 9,234 | 수면: 7h 15m</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

function ProfileScreen({ session }: { session: Session }) {
  const signOut = useSignOut();

  return (
    <View className="flex-1 bg-white">
      <View className="items-center pt-12 pb-8">
        <View className="mb-6">
          <View className="w-24 h-24 rounded-full bg-blue-50 justify-center items-center border-2 border-blue-100">
            <Text className="text-5xl">👤</Text>
          </View>
        </View>
        <Text className="text-2xl font-bold text-gray-800">프로필</Text>
      </View>

      <View className="flex-1 px-6">
        <View className="space-y-4">
          <View className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <Text className="text-sm text-gray-600 mb-2">이메일</Text>
            <Text className="text-lg font-semibold text-gray-800">{session.user.email}</Text>
          </View>

          <View className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <Text className="text-sm text-gray-600 mb-2">사용자 ID</Text>
            <Text className="text-lg font-semibold text-gray-800 font-mono">
              {session.user.id?.slice(0, 12)}...
            </Text>
          </View>

          <TouchableOpacity
            className="bg-red-500 rounded-xl py-4 px-6 items-center mt-6"
            onPress={() => signOut.mutate()}
            disabled={signOut.isPending}
          >
            {signOut.isPending ? (
              <ActivityIndicator color="#ffffff" size="small" />
            ) : (
              <Text className="text-white font-semibold text-base">로그아웃</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <View className="pb-4 pt-6">
        <Text className="text-xs text-gray-400 text-center leading-5">
          © 2025 Health App. All rights reserved.
        </Text>
      </View>
    </View>
  );
}

export default function HomeScreen({ session }: { session: Session }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }: { route: { name: string } }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#2563eb",
        tabBarInactiveTintColor: "#9ca3af",
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: "#e5e7eb",
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: 4,
        },
        tabBarIcon: ({ color, size }: { color: string; size: number }) => {
          let iconName: keyof typeof FontAwesome.glyphMap;

          if (route.name === "Dashboard") {
            iconName = "home";
          } else if (route.name === "History") {
            iconName = "bar-chart";
          } else if (route.name === "Profile") {
            iconName = "user";
          } else {
            iconName = "question";
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ tabBarLabel: "대시보드" }}
      />
      <Tab.Screen name="History" component={HistoryScreen} options={{ tabBarLabel: "기록" }} />
      <Tab.Screen
        name="Profile"
        options={{ tabBarLabel: "프로필" }}
        children={() => <ProfileScreen session={session} />}
      />
    </Tab.Navigator>
  );
}
