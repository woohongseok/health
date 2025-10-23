import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Session } from "@supabase/supabase-js";
import LoginScreen from "screens/LoginScreen";
import HomeScreen from "screens/HomeScreen";

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      {session && session.user ? (
        <HomeScreen session={session} />
      ) : (
        <LoginScreen loading={isLoading} setLoading={setLoading} />
      )}
    </SafeAreaView>
  );
}
