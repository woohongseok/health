import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";
import Auth from "./components/Auth";
import Account from "./components/Account";
import { View, Platform, Alert } from "react-native";
import { Session } from "@supabase/supabase-js";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";

// iOS에서 Google Sign-in이 작동하기 위한 필수 설정:
// 1. ios/podfile에서 'GoogleSignIn' pod이 설치되어 있는지 확인
// 2. Info.plist에 다음을 추가:
//    <key>CFBundleURLTypes</key>
//    <array>
//      <dict>
//        <key>CFBundleTypeRole</key>
//        <string>Editor</string>
//        <key>CFBundleURLSchemes</key>
//        <array>
//          <string>YOUR_REVERSED_CLIENT_ID</string>
//        </array>
//      </dict>
//    </array>
// 3. YOUR_REVERSED_CLIENT_ID는 GoogleService-Info.plist의 REVERSED_CLIENT_ID 값을 사용

export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    try {
      GoogleSignin.configure({
        scopes: ["https://www.googleapis.com/auth/drive.readonly"],
        webClientId: "636406118641-2c67r8tsmqf98ubbp5sa17q708ub3um1.apps.googleusercontent.com",
        // iOS: GoogleService-Info.plist의 CLIENT_ID 사용
        iosClientId: "636406118641-ia5obnss5lajmii877dtbdfgn5alkapr.apps.googleusercontent.com",
        offlineAccess: true,
      });
    } catch (error) {
      console.error("GoogleSignin configuration error:", error);
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if (userInfo.data.idToken) {
        const { data, error } = await supabase.auth.signInWithIdToken({
          provider: "google",
          token: userInfo.data.idToken,
        });
        if (error) {
          Alert.alert("Sign In Error", error.message);
        } else {
          console.log("Sign in successful:", data);
        }
      } else {
        throw new Error("no ID token present!");
      }
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log("Sign in cancelled");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        Alert.alert("Sign In", "Sign in is already in progress");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        Alert.alert("Play Services Error", "Google Play Services is not available or outdated");
      } else {
        // some other error happened
        console.error("Sign in error:", error);
        Alert.alert("Sign In Error", error.message || "An error occurred during sign in");
      }
    }
  };

  return (
    <View>
      {session && session.user ? (
        <Account key={session.user.id} session={session} />
      ) : (
        <>
          <Auth />
          <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={handleGoogleSignIn}
          />
        </>
      )}
    </View>
  );
}
