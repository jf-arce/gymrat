import { COLORS } from "@/constants/colors";
import { AppButton } from "@/modules/core/components/AppButton";
import { TextFont } from "@/modules/core/components/TextFont";
import { CurrentRoutine } from "@/modules/workouts/types/current-rutine.type";
import { Dumbbell } from "lucide-react-native";
import { View } from "react-native";

interface CurrentRoutineProps {
  currentRoutine: CurrentRoutine | null;
}

export const CurrentRoutineCard = ({ currentRoutine }: CurrentRoutineProps) => {
  return (
    <View className="p-4 bg-black rounded-xl mb-4 gap-3">
      <View className="flex-row justify-between items-center">
        <TextFont font="semibold" className="text-2xl">
          Tu Rutina Actual
        </TextFont>
        <TextFont
          font="medium"
          className="text-sm px-2 rounded-full text-purple-500 border-[1px] border-purple-500"
        >
          Día {currentRoutine?.getCurrentWorkout()?.number} /{" "}
          {currentRoutine?.workouts.length}
        </TextFont>
      </View>
      <View className="flex-row gap-4 bg-tertiary rounded-xl p-2">
        <View>
          <View className="bg-tertiary rounded-xl p-2">
            <Dumbbell color={COLORS.purple} />
          </View>
        </View>
        <View className="gap-2 flex-1">
          <TextFont className="text-pretty" font="medium" numberOfLines={2}>
            {currentRoutine?.getCurrentWorkout()?.name}
          </TextFont>
          <TextFont>8 ejercicios</TextFont>
        </View>
      </View>
      <AppButton buttonClassname="!bg-purple-500" textClassname="!text-white">
        Ver rutina completa
      </AppButton>
    </View>
  );
};
