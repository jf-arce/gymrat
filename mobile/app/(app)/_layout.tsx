import { Redirect, Stack } from "expo-router";
import { Text } from "react-native";
import { COLORS } from "@/constants/colors";
import { useSession } from "@/modules/context/AuthContext";

export default function AppLayout() {
  const { session, isLoading, validateSessionLoading } = useSession();

  if (isLoading || validateSessionLoading) {
    return <Text>Loading...</Text>;
  }

  if (!session) {
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
