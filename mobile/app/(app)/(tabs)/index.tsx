import { ActivityIndicator, View } from "react-native";
import Screen from "@/modules/core/components/Screen";
import { useUser } from "@/modules/user/hooks/useUser";
import { ShortcutsSlides } from "@/modules/home/components/ShortcutsSlides";
import { UserInfoHome } from "@/modules/user/components/UserInfoHome";
import { NextWorkoutCard } from "@/modules/home/components/NextWorkoutCard";
import { COLORS } from "@/constants/colors";

export default function Index() {
  const { user, isUserLoading } = useUser();

  if (isUserLoading || !user) {
    return (
      <View className="flex-1 justify-center items-center bg-secondary">
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <Screen>
      <UserInfoHome user={user} />
      <ShortcutsSlides />
      <NextWorkoutCard />
    </Screen>
  );
}
