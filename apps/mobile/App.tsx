import "./global.css";

import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-gray-50 p-4">
      <Text className="text-xl font-bold text-blue-500 mb-8">Health App - Mobile</Text>
      <Text className="text-center">Shared UI package is configured and ready to use.</Text>
      <StatusBar style="auto" />
    </View>
  );
}
