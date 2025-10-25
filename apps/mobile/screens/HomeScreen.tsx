import { Session } from "@supabase/supabase-js";
import { TouchableOpacity, Text, View, ActivityIndicator } from "react-native";
import { useSignOut } from "hooks/useAuth";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHome, faChartBar, faUser, faQuestion } from "@fortawesome/free-solid-svg-icons";

const Tab = createBottomTabNavigator();

function DashboardScreen() {
  return (
    <View className="flex-1 bg-white">
      {/* Header Section */}
      <View className="bg-gradient-to-b from-blue-50 to-white pt-8 pb-6 px-6">
        <View className="mb-4">
          <View className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 justify-center items-center border-2 border-blue-200 shadow-sm">
            <Text className="text-3xl">📊</Text>
          </View>
        </View>
        <Text className="text-2xl font-bold text-gray-900 mb-1">건강 대시보드</Text>
        <Text className="text-sm text-gray-500">오늘의 건강 상태를 확인해보세요</Text>
      </View>

      {/* Content Section */}
      <View className="flex-1 px-6 pt-6 pb-8">
        <View className="space-y-3">
          <View className="bg-gradient-to-br from-blue-50 to-blue-25 rounded-2xl p-5 border border-blue-100 shadow-sm">
            <View className="flex-row justify-between items-start mb-3">
              <Text className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                걸음 수
              </Text>
              <Text className="text-2xl">👟</Text>
            </View>
            <Text className="text-3xl font-bold text-blue-900 mb-2">8,234</Text>
            <View className="bg-blue-100 h-1.5 rounded-full overflow-hidden">
              <View className="bg-blue-600 h-full" style={{ width: "82%" }} />
            </View>
            <Text className="text-xs text-blue-600 mt-2">목표까지 1,766 남음</Text>
          </View>

          <View className="bg-gradient-to-br from-green-50 to-green-25 rounded-2xl p-5 border border-green-100 shadow-sm">
            <View className="flex-row justify-between items-start mb-3">
              <Text className="text-xs font-semibold text-green-600 uppercase tracking-wide">
                수면 시간
              </Text>
              <Text className="text-2xl">😴</Text>
            </View>
            <Text className="text-3xl font-bold text-green-900 mb-2">7h 30m</Text>
            <View className="bg-green-100 h-1.5 rounded-full overflow-hidden">
              <View className="bg-green-600 h-full" style={{ width: "94%" }} />
            </View>
            <Text className="text-xs text-green-600 mt-2">권장: 8시간</Text>
          </View>

          <View className="bg-gradient-to-br from-purple-50 to-purple-25 rounded-2xl p-5 border border-purple-100 shadow-sm">
            <View className="flex-row justify-between items-start mb-3">
              <Text className="text-xs font-semibold text-purple-600 uppercase tracking-wide">
                심박수
              </Text>
              <Text className="text-2xl">❤️</Text>
            </View>
            <Text className="text-3xl font-bold text-purple-900 mb-2">72 bpm</Text>
            <View className="bg-purple-100 h-1.5 rounded-full overflow-hidden">
              <View className="bg-purple-600 h-full" style={{ width: "72%" }} />
            </View>
            <Text className="text-xs text-purple-600 mt-2">정상 범위 (60-100)</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

function HistoryScreen() {
  return (
    <View className="flex-1 bg-white">
      {/* Header Section */}
      <View className="bg-gradient-to-b from-purple-50 to-white pt-8 pb-6 px-6">
        <View className="mb-4">
          <View className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-100 to-purple-50 justify-center items-center border-2 border-purple-200 shadow-sm">
            <Text className="text-3xl">📈</Text>
          </View>
        </View>
        <Text className="text-2xl font-bold text-gray-900 mb-1">건강 기록</Text>
        <Text className="text-sm text-gray-500">최근 7일간의 건강 데이터</Text>
      </View>

      {/* Content Section */}
      <View className="flex-1 px-6 pt-6 pb-8">
        <View className="space-y-2.5">
          {[1, 2, 3, 4, 5].map((item) => (
            <View
              key={item}
              className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-4 border border-gray-200 shadow-xs active:bg-gray-100"
            >
              <View className="flex-row justify-between items-start mb-2">
                <View>
                  <Text className="text-xs text-gray-500 font-medium">
                    2025년 10월 {23 - item}일
                  </Text>
                  <Text className="text-sm font-semibold text-gray-900 mt-1">평균 심박수</Text>
                </View>
                <View className="bg-blue-100 px-3 py-1.5 rounded-lg">
                  <Text className="text-sm font-bold text-blue-700">71 bpm</Text>
                </View>
              </View>
              <View className="flex-row justify-between text-xs text-gray-600 space-x-4 mt-2">
                <Text>👟 9,234 걸음</Text>
                <Text>😴 7h 15m</Text>
              </View>
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
      {/* Header Section */}
      <View className="bg-gradient-to-b from-blue-50 to-white pt-8 pb-6 px-6">
        <View className="mb-4">
          <View className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 justify-center items-center border-3 border-blue-200 shadow-md">
            <Text className="text-4xl">👤</Text>
          </View>
        </View>
        <Text className="text-2xl font-bold text-gray-900 mb-1">프로필</Text>
        <Text className="text-sm text-gray-500">계정 정보 관리</Text>
      </View>

      {/* Content Section */}
      <View className="flex-1 px-6 pt-6 pb-8">
        <View className="space-y-3">
          {/* Email Card */}
          <View className="bg-gradient-to-br from-blue-50 to-blue-25 rounded-2xl p-5 border border-blue-100">
            <Text className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
              이메일 주소
            </Text>
            <Text className="text-base font-semibold text-gray-900">{session.user.email}</Text>
          </View>

          {/* User ID Card */}
          <View className="bg-gradient-to-br from-gray-50 to-gray-25 rounded-2xl p-5 border border-gray-200">
            <Text className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
              사용자 ID
            </Text>
            <Text className="text-xs font-mono text-gray-700 tracking-wider">
              {session.user.id?.slice(0, 16)}...
            </Text>
          </View>

          {/* Sign Out Button */}
          <TouchableOpacity
            className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl py-4 px-6 items-center justify-center mt-8 shadow-md active:opacity-90"
            onPress={() => signOut.mutate()}
            disabled={signOut.isPending}
          >
            {signOut.isPending ? (
              <ActivityIndicator color="#ffffff" size="small" />
            ) : (
              <Text className="text-white font-bold text-base">로그아웃</Text>
            )}
          </TouchableOpacity>

          {/* Info Text */}
          <Text className="text-xs text-gray-400 text-center mt-8 leading-5">
            © 2025 Health App{"\n"}모든 권리를 보유합니다
          </Text>
        </View>
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
          let icon;

          if (route.name === "Dashboard") {
            icon = faHome;
          } else if (route.name === "History") {
            icon = faChartBar;
          } else if (route.name === "Profile") {
            icon = faUser;
          } else {
            icon = faQuestion;
          }

          return <FontAwesomeIcon icon={icon} size={size} color={color} />;
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
