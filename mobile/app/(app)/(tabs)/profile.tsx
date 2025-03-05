import { Button, Text } from "react-native";
import { Stack } from "expo-router";
import Screen from "@/modules/core/components/Screen";
import { useSession } from "@/modules/context/AuthContext";

export default function ProfileScreen() {
  const { signOut } = useSession();

  return (
    <Screen>
      <Stack.Screen
        name="profile"
        options={{
          title: "Perfil",
        }}
      />
      <Text style={{ color: "white" }}>Perfil del usuario</Text>
      <Button title="Cerrar sesión" onPress={signOut} />
    </Screen>
  );
}
