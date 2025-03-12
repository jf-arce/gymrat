import Screen from "@/modules/core/components/Screen";
import { TextFont } from "@/modules/core/components/TextFont";
import { useLocalSearchParams } from "expo-router";

export default function WorkoutDetailsScreen() {
  const { id: workoutId } = useLocalSearchParams();

  // TODO: Hace un endpoint que traigan todo el detalle de un workouts con sus ejercicios y sets.
  return (
    <Screen>
      <TextFont font="semibold" className="text-2xl">
        {workoutId}
      </TextFont>
    </Screen>
  );
}
