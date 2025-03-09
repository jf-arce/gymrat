import Screen from "@/modules/core/components/Screen";
import { useUser } from "@/modules/user/hooks/useUser";
import { ShortcutsSlides } from "@/modules/home/components/ShortcutsSlides";
import { UserInfoHome } from "@/modules/user/components/UserInfoHome";
import { NextWorkoutCard } from "@/modules/home/components/NextWorkoutCard";
import { Loading } from "@/modules/core/components/Loading";

export default function Index() {
  const { user, isUserLoading } = useUser();

  if (isUserLoading || !user) {
    return (
      <Screen>
        <Loading />
      </Screen>
    );
  }

  return (
    <Screen>
      {/* <UserInfoHome user={user} /> */}
      <ShortcutsSlides />
      <NextWorkoutCard />
    </Screen>
  );
}
