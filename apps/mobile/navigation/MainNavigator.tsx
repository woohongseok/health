import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "screens/HomeScreen";

export type MainStackParamList = {
  Home: undefined;
};

const Stack = createNativeStackNavigator<MainStackParamList>();

export default function MainNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#ffffff" },
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}
