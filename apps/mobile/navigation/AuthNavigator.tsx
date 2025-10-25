import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "screens/LoginScreen";
import SignupScreen from "screens/SignupScreen";

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

type AuthNavigatorProps = {
  startWithSignup?: boolean;
};

export default function AuthNavigator({ startWithSignup = false }: AuthNavigatorProps) {
  return (
    <Stack.Navigator
      initialRouteName={startWithSignup ? "Signup" : "Login"}
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#ffffff" },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}
