import { COLORS } from "@/constants/colors";
import { TextFont } from "@/modules/core/components/TextFont";
import { DumbbellIcon, FlameIcon, TrophyIcon } from "lucide-react-native";
import { View } from "react-native";

export const DailyProgress = () => {
  return (
    <View className="p-4 bg-black rounded-xl mb-4 gap-5">
      <View className="flex-row justify-between items-center">
        <TextFont font="semibold" className="text-2xl">
          Progreso Diario
        </TextFont>
        <TextFont
          font="medium"
          className="text-sm px-2 rounded-full bg-primary !text-black"
        >
          + 125 XP hoy
        </TextFont>
      </View>
      <View>
        <View className="flex-row items-center gap-2 justify-between">
          <TextFont font="medium">Nivel 16</TextFont>
          <TextFont font="medium" className="text-xs">
            2.450 / 3.000 XP
          </TextFont>
        </View>
        <View className="w-full bg-secondary h-3 rounded-full mt-2">
          <View className="w-[80%] h-full bg-primary rounded-full"></View>
        </View>
      </View>
      <View className="flex-row gap-3">
        <View className="flex-1 justify-center items-center bg-tertiary rounded-lg p-2 gap-1">
          <FlameIcon size={20} color="#f97316" style={{ marginBottom: 4 }} />
          <TextFont>Racha</TextFont>
          <TextFont font="semibold">5 dias</TextFont>
        </View>
        <View className="flex-1 justify-center items-center bg-tertiary rounded-lg p-2 gap-1">
          <DumbbellIcon size={20} color="#3b82f6" style={{ marginBottom: 4 }} />
          <TextFont>Sesiones</TextFont>
          <TextFont font="semibold">42</TextFont>
        </View>
        <View className="flex-1 justify-center items-center bg-tertiary rounded-lg p-2 gap-1">
          <TrophyIcon
            size={20}
            color={COLORS.yellow}
            style={{ marginBottom: 4 }}
          />
          <TextFont>Logros</TextFont>
          <TextFont font="semibold">12</TextFont>
        </View>
      </View>
    </View>
  );
};
