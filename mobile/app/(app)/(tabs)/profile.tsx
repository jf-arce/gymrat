import { Button, Text } from "react-native";
import { Stack } from "expo-router";
import Screen from "@/modules/core/components/Screen";
import { useAuthStore } from "@/modules/auth/stores/auth.store";

export default function ProfileScreen() {
  const logOut = useAuthStore((state) => state.logOut);

  return (
    <Screen>
      <Stack.Screen
        name="profile"
        options={{
          title: "Perfil",
        }}
      />
      <Text style={{ color: "white" }}>Perfil del usuario</Text>
      <Button title="Cerrar sesión" onPress={logOut} />
    </Screen>
  );
}
