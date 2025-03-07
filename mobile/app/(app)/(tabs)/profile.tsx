import { Text } from "react-native";
import { Stack } from "expo-router";
import Screen from "@/modules/core/components/Screen";
import { useAuthStore } from "@/modules/auth/stores/auth.store";
import { AppButton } from "@/modules/core/components/AppButton";
import { COLORS } from "@/constants/colors";

export default function ProfileScreen() {
  const logOut = useAuthStore((state) => state.logOut);
  const userSession = useAuthStore((state) => state.authSession.user);

  return (
    <Screen>
      <Stack.Screen
        name="profile"
        options={{
          title: "Perfil",
          headerTitle: userSession?.username,
          headerTitleStyle: {
            color: COLORS.primary,
          },
        }}
      />
      <Text style={{ color: "white" }}>Perfil del usuario</Text>
      <AppButton onPress={logOut}>Cerrar sesión</AppButton>
    </Screen>
  );
}
