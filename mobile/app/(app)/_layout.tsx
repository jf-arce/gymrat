import { Redirect, Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { COLORS } from "@/constants/colors";
import { StyleSheet } from "react-native";
import { useAuthStore } from "@/modules/auth/stores/auth.store";
import { useEffect } from "react";

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
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (!authenticated) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.secondary,
        },
        headerTintColor: COLORS.primary,
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerTitle: "Gym Rat",
        headerTitleAlign: "center",
      }}
    />
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.secondary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.secondary,
  },
});
