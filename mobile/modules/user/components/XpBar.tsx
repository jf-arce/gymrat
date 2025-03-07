import { TextFont } from "@/modules/core/components/TextFont";
import { View } from "react-native";

interface XpBarProps {
  level: number;
  currentExp: number;
  expToNextLevel: number;
  containerClassname?: string;
}

export const XpBar = ({
  level,
  currentExp,
  expToNextLevel,
  containerClassname,
}: XpBarProps) => {
  const progress = (currentExp / expToNextLevel) * 100;

  return (
    <View className={`w-full ${containerClassname}`}>
      <TextFont font="black" className="text-gray-200 text-sm">
        Nivel {level}
      </TextFont>

      <View className="w-full h-4 bg-neutral-950 rounded-full overflow-hidden mt-2">
        <View className="h-full bg-primary" style={{ width: `${progress}%` }} />
      </View>

      <TextFont className="text-xs mt-2 text-gray-400 ">
        {currentExp} / {expToNextLevel} XP (Nivel {level + 1})
      </TextFont>
    </View>
  );
};
