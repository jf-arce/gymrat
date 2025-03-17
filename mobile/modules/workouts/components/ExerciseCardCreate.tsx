import { View, Pressable, TextInput } from "react-native";
import React from "react";
import { Clock, Dumbbell, Ellipsis, PlusIcon, X } from "lucide-react-native";
import { TextFont } from "@/modules/core/components/TextFont";
import { AppButton } from "@/modules/core/components/AppButton";
import { COLORS } from "@/constants/colors";

export default function ExerciseCardCreate() {
  return (
    <View className="bg-tertiary p-3 rounded-xl">
      <View className="flex-row gap-4 items-center justify-between">
        <View className="flex-row items-center gap-3">
          <View className="bg-purple-500/20 rounded-xl p-2">
            <Dumbbell color={COLORS.purple} />
          </View>
          <TextFont font="semibold" className="text-xl">
            Press Banca
          </TextFont>
        </View>
        <Pressable className="active:opacity-50">
          <Ellipsis color={COLORS.white} size={30} />
        </Pressable>
      </View>

      <View className="flex-row justify-between items-center mt-3">
        <View className="flex-row items-center gap-2 my-4">
          <Clock color={COLORS.purple} size={18} />
          <TextFont font="medium">Descanso: </TextFont>
          <TextInput
            className="bg-slate-950 rounded-lg p-2 w-16 placeholder:text-gray-400 text-center"
            style={{ color: COLORS.white }}
            placeholder="0"
            keyboardType="numeric"
          />
          <TextFont font="medium">seg</TextFont>
        </View>

        <View>
          <AppButton icon={<PlusIcon color={COLORS.black} />}>Serie</AppButton>
        </View>
      </View>

      <View className="gap-1 mt-2">
        <View className="flex-row justify-between items-center">
          <TextFont font="medium" className="flex-1 p-2">
            Serie
          </TextFont>
          <TextFont font="medium" className="flex-1 p-2">
            Peso (kg)
          </TextFont>
          <TextFont font="medium" className="flex-1 p-2">
            Reps
          </TextFont>
          <View className="w-10" />
        </View>
        <View className="flex-row gap-2 items-center justify-between">
          <View className="flex-1 bg-slate-950 rounded-lg p-2 justify-center items-center">
            <TextFont font="semibold" className="text-lg">
              1
            </TextFont>
          </View>
          <TextInput
            className="flex-1 bg-slate-950 text-lg rounded-lg p-2 placeholder:text-gray-400 text-center"
            style={{ color: COLORS.white }}
            placeholder="0"
            keyboardType="numeric"
          />
          <TextInput
            className="flex-1 bg-slate-950 text-lg rounded-lg p-2 placeholder:text-gray-400 text-center"
            style={{ color: COLORS.white }}
            placeholder="0"
            keyboardType="numeric"
          />
          <Pressable className="w-10 justify-center items-center active:opacity-50">
            <X color={COLORS.red} size={25} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
