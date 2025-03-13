import { Slot } from "expo-router";
import "../global.css";
import { StatusBar } from "expo-status-bar";
import { FontProvider } from "@/modules/core/context/font.provider";
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

export default function RootLayout() {
  return (
    <FontProvider>
      <StatusBar style="light" />
      <Slot />
    </FontProvider>
  );
}
