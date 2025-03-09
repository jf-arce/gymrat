import { ScrollView } from "react-native";
import Screen from "@/modules/core/components/Screen";
import { useUser } from "@/modules/user/hooks/useUser";
import { Loading } from "@/modules/core/components/Loading";
import { UserInfoHome } from "@/modules/user/components/UserInfoHome";
import { DailyProgress } from "@/modules/home/components/DailyProgress";
import { ChallengeOfTheDay } from "@/modules/home/components/ChallengeOfTheDay";
import { CurrentRoutineCard } from "@/modules/home/components/CurrentRoutine";
import { RecentAchievements } from "@/modules/home/components/RecentAchievements";
import { useCurrentRoutineWorkouts } from "@/modules/routines-workouts/hooks/useCurrentRoutineWorkouts";

export default function Index() {
  const { user, isUserLoading } = useUser();
  const { currentRoutine, loading: currentRoutineLoading } =
    useCurrentRoutineWorkouts();

  if (isUserLoading || !user || currentRoutineLoading) {
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
        <CurrentRoutineCard currentRoutine={currentRoutine} />
        <RecentAchievements />
      </ScrollView>
    </Screen>
  );
}
