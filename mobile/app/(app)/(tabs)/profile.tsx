import { Pressable, Text } from "react-native";
import { Stack } from "expo-router";
import Screen from "@/modules/core/components/Screen";
import { useAuthStore } from "@/modules/auth/stores/auth.store";
import { AppButton } from "@/modules/core/components/AppButton";
import { COLORS } from "@/constants/colors";
import { UserInfoHome } from "@/modules/user/components/UserInfoHome";
import { useUser } from "@/modules/user/hooks/useUser";
import { Loading } from "@/modules/core/components/Loading";
import { SettingsIcon } from "lucide-react-native";
import { TextFont } from "@/modules/core/components/TextFont";

export default function ProfileScreen() {
  const { user, isUserLoading } = useUser();
  const logOut = useAuthStore((state) => state.logOut);
  const userSession = useAuthStore((state) => state.authSession.user);

  if (isUserLoading || !user) {
    return (
      <Screen>
        <Loading />
      </Screen>
    );
  }

  return (
    <Screen>
      <Stack.Screen
        name="profile"
        options={{
          title: "Perfil",
          headerTitle: userSession?.username,
          headerTitleStyle: {
            color: COLORS.primary,
            fontFamily: "clashgrotesk-medium",
          },
          headerRight: () => (
            <Pressable className="active:opacity-50">
              <SettingsIcon
                color={COLORS.primary}
                size={25}
                style={{ marginRight: 16 }}
              />
            </Pressable>
          ),
          headerLeft: () => (
            <Pressable className="active:opacity-50">
              <TextFont
                font="medium"
                className="text-lg"
                style={{ color: COLORS.primary, marginLeft: 16 }}
              >
                Editar Perfil
              </TextFont>
            </Pressable>
          ),
        }}
      />
      <UserInfoHome user={user} />
      <Text style={{ color: "white" }}>Perfil del usuario</Text>
      <AppButton onPress={logOut}>Cerrar sesión</AppButton>
    </Screen>
  );
}
