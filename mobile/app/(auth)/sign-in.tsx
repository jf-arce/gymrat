import { useAuthStore } from "@/modules/auth/stores/auth.store";
import Screen from "@/modules/core/components/Screen";
import { useState } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

export default function SignInScreen() {
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
        paddingLeft: 20,
        paddingRight: 20,
      }}
    >
      <View className="flex-1 justify-center">
        <Text className="text-white text-3xl font-bold mb-6">Bienvenido</Text>

        {/* Campo de Email/Usuario */}
        <View className="mb-4">
          <Text className="text-white mb-2 font-bold">Email o usuario</Text>
          <TextInput
            className="bg-white rounded-lg p-3"
            placeholder="Ingresa tu email o usuario"
            placeholderTextColor="#9CA3AF"
            value={emailOrUsername}
            onChangeText={setEmailOrUsername}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Campo de Contraseña */}
        <View className="mb-6">
          <Text className="text-white mb-2 font-bold">Contraseña</Text>
          <TextInput
            className="bg-white rounded-lg p-3"
            placeholder="Ingresa tu contraseña"
            placeholderTextColor="#9CA3AF"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
          />
        </View>

        {/* Mensaje de error */}
        {error && (
          <Text className="text-red-500 mb-4 text-center">{error}</Text>
        )}

        {/* Botón de Login */}
        <TouchableOpacity
          className="bg-primary py-3 rounded-lg flex-row justify-center"
          onPress={handleLogin}
          disabled={isLoading}
          activeOpacity={0.6}
        >
          {isLoading ? (
            <ActivityIndicator color="#1F1F21" />
          ) : (
            <Text className="text-secondary text-base font-semibold">
              Iniciar sesión
            </Text>
          )}
        </TouchableOpacity>

        {/* Enlace de olvidé contraseña */}
        <TouchableOpacity className="mt-4" activeOpacity={0.6}>
          <Text className="text-primary text-center text-sm">
            ¿Olvidaste tu contraseña?
          </Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}
