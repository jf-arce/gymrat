import { COLORS } from "@/constants/colors";
import { TextFont } from "@/modules/core/components/TextFont";
import { Clock, Dumbbell } from "lucide-react-native";
import React from "react";
import { View } from "react-native";
import { WorkoutExercises } from "../types/workout-exercises.type";

interface WorkoutExerciseProps {
  workoutExercise: WorkoutExercises;
}

export const WorkoutExercise = ({ workoutExercise }: WorkoutExerciseProps) => {
  return (
    <View className="bg-black p-4 rounded-xl">
      <View className="flex-row gap-4 items-center">
        <View>
          <View className="bg-tertiary rounded-xl p-2">
            <Dumbbell color={COLORS.purple} />
          </View>
        </View>
        <View className="gap-2 flex-1 flex-row justify-between items-center">
          <View className="gap-1">
            <TextFont
              className="text-pretty text-xl"
              font="semibold"
              numberOfLines={2}
            >
              {workoutExercise.exercises.name}
            </TextFont>
            <TextFont className="!text-gray-400">
              {workoutExercise.sets.length}{" "}
              {workoutExercise.sets.length > 1 ? "series" : "serie"}
            </TextFont>
          </View>
        </View>
      </View>

      <View className="bg-tertiary h-[1px] w-full mx-auto rounded-full mt-3" />

      <View className="mt-2 px-2">
        <View className="flex-row items-center gap-2 py-2 mb-2">
          <Clock color={COLORS.purple} size={18} />
          <TextFont font="medium" className="!text-gray-300">
            {workoutExercise.rest} seg de descanso
          </TextFont>
        </View>
        <View className="flex-row justify-between items-center py-2">
          <TextFont font="medium" className="!text-gray-400">
            Serie
          </TextFont>
          <TextFont font="medium" className="!text-gray-400">
            Peso (kg)
          </TextFont>
          <TextFont font="medium" className="!text-gray-400">
            Reps
          </TextFont>
        </View>
        {workoutExercise.sets.map((set, index) => (
          <View
            key={index}
            className="flex-row justify-between items-center p-2"
          >
            <TextFont font="medium">{index + 1}</TextFont>
            <TextFont font="medium">{set.weightKg}</TextFont>
            <TextFont font="medium">{set.repetitions}</TextFont>
          </View>
        ))}
      </View>
    </View>
  );
};
