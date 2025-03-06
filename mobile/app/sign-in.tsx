import { useAuthStore } from "@/modules/auth/stores/auth.store";
import Screen from "@/modules/core/components/Screen";
import { useState } from "react";
import { Text, TextInput, Button, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SignInScreen() {
  const insets = useSafeAreaInsets();
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const logIn = useAuthStore((state) => state.logIn);
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);

  const handleLogin = async () => {
    await logIn(emailOrUsername, password);
  };

  return (
    <Screen
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingHorizontal: 16,
      }}
    >
      <Text style={{ color: "white", fontSize: 24, marginBottom: 16 }}>
        Iniciar sesión
      </Text>
      <View style={{ marginBottom: 16 }}>
        <TextInput
          style={{ backgroundColor: "white", padding: 8, marginBottom: 8 }}
          placeholder="Email o nombre de usuario"
          value={emailOrUsername}
          onChangeText={setEmailOrUsername}
        />
        <TextInput
          style={{ backgroundColor: "white", padding: 8 }}
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      {error && (
        <View style={{ marginBottom: 16 }}>
          <Text style={{ color: "red" }}>{error}</Text>
        </View>
      )}

      <Button
        title={isLoading ? "Cargando..." : "Iniciar sesión"}
        onPress={handleLogin}
      />
    </Screen>
  );
}
