import React from "react";
import { View, StyleProp, ViewStyle } from "react-native";

interface ScreenProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export default function Screen({ children, style }: ScreenProps) {
  return (
    <View className="bg-secondary flex-1 pt-4 px-3" style={style}>
      {children}
    </View>
  );
}
