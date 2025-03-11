import { Redirect, Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { COLORS } from "@/constants/colors";
import { useAuthStore } from "@/modules/auth/stores/auth.store";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function AppLayout() {
  const { authenticated } = useAuthStore((state) => state.authSession);
  const isLoading = useAuthStore((state) => state.isLoading);
  const checkSession = useAuthStore((state) => state.checkSession);

  useEffect(() => {
    const init = async () => {
      await checkSession();
    };
    init();
  }, []);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-secondary">
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (!authenticated) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <GestureHandlerRootView>
      <Stack
        screenOptions={{
          headerShown: false,
          navigationBarColor: COLORS.secondaryContrast,
        }}
      ></Stack>
    </GestureHandlerRootView>
  );
}
