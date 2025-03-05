import { Slot } from "expo-router";
import "../global.css";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SessionProvider } from "@/modules/context/AuthContext";

export default function RootLayout() {
  return (
    <SessionProvider>
      <SafeAreaProvider>
        <StatusBar style="light" />
        <Slot />
      </SafeAreaProvider>
    </SessionProvider>
  );
}
