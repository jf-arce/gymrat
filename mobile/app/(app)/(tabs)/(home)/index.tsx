import { ScrollView } from "react-native";
import Screen from "@/modules/core/components/Screen";
import { useUser } from "@/modules/user/hooks/useUser";
import { Loading } from "@/modules/core/components/Loading";
import { UserInfoHome } from "@/modules/user/components/UserInfoHome";
import { DailyProgress } from "@/modules/home/components/DailyProgress";
import { ChallengeOfTheDay } from "@/modules/home/components/ChallengeOfTheDay";
import { CurrentRoutineCardHome } from "@/modules/home/components/CurrentRoutineCardHome";
import { RecentAchievements } from "@/modules/home/components/RecentAchievements";
import { useCurrentRoutine } from "@/modules/workouts/hooks/useCurrentRoutine";

export default function Index() {
  const { user, isUserLoading } = useUser();
  const { currentRoutine } = useCurrentRoutine();

  if (isUserLoading || !user) {
    return (
      <Screen>
        <Loading />
      </Screen>
    );
  }

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        <UserInfoHome user={user} />
        <DailyProgress />
        <ChallengeOfTheDay />
        <CurrentRoutineCardHome currentRoutine={currentRoutine} />
        <RecentAchievements />
      </ScrollView>
    </Screen>
  );
}
