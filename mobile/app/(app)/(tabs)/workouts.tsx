import { COLORS } from "@/constants/colors";
import { AppButton } from "@/modules/core/components/AppButton";
import { ListIcon } from "@/modules/core/components/Icons";
import { Loading } from "@/modules/core/components/Loading";
import Screen from "@/modules/core/components/Screen";
import { TextFont } from "@/modules/core/components/TextFont";
import { useCurrentRoutineWorkouts } from "@/modules/routines-workouts/hooks/useCurrentRoutineWorkouts";
import { ScrollView, View } from "react-native";
import { Dumbbell } from "lucide-react-native";
import { WorkoutCard } from "@/modules/routines-workouts/components/WorkoutCard";
import { NextWorkoutCard } from "@/modules/home/components/NextWorkoutCard";
import { ShortcutsSlides } from "@/modules/home/components/ShortcutsSlides";

export default function WorkoutsScreen() {
  const { currentRoutine, loading } = useCurrentRoutineWorkouts();

  if (loading || !currentRoutine)
    return (
      <Screen>
        <Loading />
      </Screen>
    );

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ShortcutsSlides />
        <View className="flex-row justify-between items-center gap-2 w-full">
          <AppButton
            variant="primary"
            buttonClassname="flex-1 mr-2"
            icon={<ListIcon color={COLORS.secondary} />}
          >
            Mis Rutinas
          </AppButton>
          <AppButton
            variant="primary"
            buttonClassname="flex-1 ml-2"
            icon={<Dumbbell color={COLORS.secondary} />}
          >
            Ejercicios
          </AppButton>
        </View>
        <NextWorkoutCard />
        <View className="p-4">
          <TextFont font="semibold" className="text-2xl">
            {currentRoutine?.name}
          </TextFont>
        </View>
        {currentRoutine?.workouts.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </ScrollView>
    </Screen>
  );
}
