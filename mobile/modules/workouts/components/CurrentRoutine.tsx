import { Pressable, View } from "react-native";
import { TextFont } from "@/modules/core/components/TextFont";
import { AppButton } from "@/modules/core/components/AppButton";
import { EllipsisIcon, PlayIcon } from "lucide-react-native";
import { COLORS } from "@/constants/colors";
import { CurrentRoutine as CurrentRoutineType } from "../types/current-rutine.type";
import { Link } from "expo-router";

interface CurrentRoutineProps {
  currentRoutine: CurrentRoutineType;
  handlePresentModalPress: () => void;
  handleWorkoutTitle: (title: string) => void;
}

export const CurrentRoutine = ({
  currentRoutine,
  handlePresentModalPress,
  handleWorkoutTitle,
}: CurrentRoutineProps) => {
  const currentWorkout = currentRoutine.getCurrentWorkout();
  const nextWorkouts = currentWorkout
    ? currentRoutine.workouts.filter(
        (workout) => workout.number > currentWorkout.number,
      )
    : [];

  if (!currentWorkout) return null;

  return (
    <View>
      <View className="flex-row justify-between items-center px-1">
        <View>
          <TextFont font="semibold" className="text-2xl">
            {currentRoutine.name}
          </TextFont>
          <TextFont font="medium" className="text-base text-gray-500">
            {currentRoutine.workouts.length} días por semana
          </TextFont>
        </View>
        <TextFont
          font="medium"
          className="text-lg px-3 rounded-full !text-primary border-[1px] border-primary"
        >
          Día {currentRoutine?.getCurrentWorkout()?.number} /{" "}
          {currentRoutine?.workouts.length}
        </TextFont>
      </View>

      <Link
        href={{
          pathname: "/(app)/(tabs)/(workouts)/details/[id]",
          params: { id: currentWorkout?.id },
        }}
        asChild
      >
        <Pressable key={currentWorkout?.id} className="active:opacity-60">
          <View
            className="px-4 py-7 bg-black rounded-xl gap-4 my-4"
            key={currentWorkout?.id}
          >
            <View className="flex-row justify-between items-center mb-1">
              <View className="flex-row gap-3">
                <TextFont
                  font="medium"
                  className="text-lg px-3 rounded-full !text-blue-500 border-[1px] border-blue-500"
                >
                  Día {currentWorkout?.number}
                </TextFont>
                <TextFont font="semibold" className="text-xl">
                  {currentWorkout?.name}
                </TextFont>
              </View>
              <Pressable
                className="active:opacity-50"
                onPress={() => {
                  handleWorkoutTitle(currentWorkout?.name || "");
                  handlePresentModalPress();
                }}
              >
                <View>
                  <EllipsisIcon color={COLORS.white} size={30} />
                </View>
              </Pressable>
            </View>
            <AppButton
              buttonClassname="!bg-blue-500"
              textClassname="!text-white"
              icon={<PlayIcon color={COLORS.white} />}
            >
              Comenzar Entrenamiento
            </AppButton>
          </View>
        </Pressable>
      </Link>

      <TextFont font="semibold" className="text-2xl my-5">
        Próximos Entrenamientos
      </TextFont>

      {nextWorkouts.map((workout) => (
        <Pressable key={workout.id} className="active:opacity-50">
          <View className="p-4 bg-black rounded-xl gap-4 mb-4" key={workout.id}>
            <View className="flex-row justify-between items-center mb-1">
              <View className="flex-row gap-3">
                <TextFont
                  font="medium"
                  className="text-lg px-3 rounded-full !text-blue-500 border-[1px] border-blue-500"
                >
                  Día {workout.number}
                </TextFont>
                <TextFont font="semibold" className="text-xl">
                  {workout.name}
                </TextFont>
              </View>
              <Pressable
                className="active:opacity-50"
                onPress={() => {
                  handleWorkoutTitle(workout.name);
                  handlePresentModalPress();
                }}
              >
                <View>
                  <EllipsisIcon color={COLORS.white} size={30} />
                </View>
              </Pressable>
            </View>
          </View>
        </Pressable>
      ))}
    </View>
  );
};
