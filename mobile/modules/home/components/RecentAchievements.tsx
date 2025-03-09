import { COLORS } from "@/constants/colors";
import { TextFont } from "@/modules/core/components/TextFont";
import { AwardIcon } from "lucide-react-native";
import { View } from "react-native";

export const RecentAchievements = () => {
  return (
    <View className="p-4 bg-black rounded-xl mb-4 gap-3">
      <View className="flex-row justify-between items-center">
        <TextFont font="semibold" className="text-2xl">
          Logros recientes
        </TextFont>
        <TextFont
          font="medium"
          className="text-md px-2 rounded-full !text-primary"
        >
          Ver todos
        </TextFont>
      </View>
      <View className="flex-row gap-3">
        <View className="flex-1 justify-center items-center bg-tertiary rounded-lg p-2 gap-1">
          <View className="bg-orange-400/20 rounded-full p-3 mb-1">
            <AwardIcon height={25} width={25} color={COLORS.yellow} />
          </View>
          <TextFont>Racha</TextFont>
          <TextFont font="semibold">5 dias</TextFont>
        </View>
        <View className="flex-1 justify-center items-center bg-tertiary rounded-lg p-2 gap-1">
          <View className="bg-green-400/20 rounded-full p-3 mb-1">
            <AwardIcon height={25} width={25} color="#22c55e" />
          </View>
          <TextFont>Sesiones</TextFont>
          <TextFont font="semibold">42</TextFont>
        </View>
        <View className="flex-1 justify-center items-center bg-tertiary rounded-lg p-2 gap-1">
          <View className="bg-red-400/20 rounded-full p-3 mb-1">
            <AwardIcon height={25} width={25} color="#ff4949" />
          </View>
          <TextFont>Logros</TextFont>
          <TextFont font="semibold">12</TextFont>
        </View>
      </View>
    </View>
  );
};
