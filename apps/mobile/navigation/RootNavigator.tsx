import { AuthStore } from "../lib/store/authStore";
import { useUserCheck } from "../hooks/useUserCheck";
import AuthNavigator from "./AuthNavigator";
import MainNavigator from "./MainNavigator";
import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootNavigator() {
  const { session, loading } = AuthStore();
  const { exists, isLoading } = useUserCheck(session?.user?.email ?? "");

  if (loading || isLoading) {
    return <ActivityIndicator size="large" color="#4285F4" />;
  }

  if (!session?.user) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <AuthNavigator />
      </SafeAreaView>
    );
  }

  if (!exists) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <AuthNavigator startWithSignup={true} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <MainNavigator />
    </SafeAreaView>
  );
}
