import { AppButton } from "@/modules/core/components/AppButton";
import { TextFont } from "@/modules/core/components/TextFont";
import { Dumbbell } from "lucide-react-native";
import { View } from "react-native";

export const ChallengeOfTheDay = () => {
  return (
    <View className="p-4 bg-black rounded-xl mb-4 gap-3">
      <View className="flex-row justify-between items-center">
        <TextFont font="semibold" className="text-2xl">
          Desafio del día
        </TextFont>
        <TextFont
          font="semibold"
          className="text-sm px-2 rounded-full bg-blue-500"
        >
          Nuevo
        </TextFont>
      </View>
      <View className="flex-row gap-4 bg-tertiary rounded-xl p-2">
        <View>
          <View className="bg-tertiary rounded-xl p-2">
            <Dumbbell color="#3b82f6" />
          </View>
        </View>
        <View className="gap-2 flex-1">
          <TextFont className="text-pretty" font="medium" numberOfLines={2}>
            Completa 4 series de press de banca sin fallar
          </TextFont>
          <TextFont>Gana 150 XP y 50 monedas</TextFont>
          <View className="w-full bg-secondary h-2 rounded-full mt-2">
            <View className="w-[80%] h-full bg-primary rounded-full"></View>
          </View>
        </View>
      </View>
      <AppButton buttonClassname="!bg-blue-500" textClassname="!text-white">
        Ver todos los desafios
      </AppButton>
    </View>
  );
};
