import { Slot } from "expo-router";
import "../global.css";
import { StatusBar } from "expo-status-bar";
import { FontProvider } from "@/modules/core/providers/font.provider";

export default function RootLayout() {
  return (
    <FontProvider>
      <StatusBar style="light" />
      <Slot />
    </FontProvider>
  );
}
