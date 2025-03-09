import { COLORS } from "@/constants/colors";
import { ActivityIndicator, View } from "react-native";

export const Loading = () => {
  return (
    <View className="flex justify-center items-center h-full">
      <ActivityIndicator size="large" color={COLORS.primary} />
    </View>
  );
};
