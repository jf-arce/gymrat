import { TextFont } from "@/modules/core/components/TextFont";
import React, { useRef } from "react";
import { Pressable, View } from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";

interface ButtonBarProps {
  option: { currentRoutine: boolean; myRoutines: boolean };
  setOption: (option: { currentRoutine: boolean; myRoutines: boolean }) => void;
}

export default function ButtonBar({ option, setOption }: ButtonBarProps) {
  const translateX = useSharedValue(0);
  const buttonWidth = useRef(0);

  const toggle = (position: "left" | "right") => {
    translateX.value = position === "left" ? 0 : buttonWidth.current;
  };

  const animatedButtonBar = useAnimatedStyle(() => ({
    transform: [
      { translateX: withTiming(translateX.value, { duration: 150 }) },
    ],
  }));

  const handleLeftPressable = () => {
    setOption({ currentRoutine: true, myRoutines: false });
    toggle("left");
  };

  const handleRightPressable = () => {
    setOption({ currentRoutine: false, myRoutines: true });
    toggle("right");
  };

  return (
    <View className="bg-tertiary p-2 rounded-xl mb-6">
      <View className={`flex-row relative`}>
        <Animated.View
          className={`absolute top-0 left-0 w-1/2 h-full bg-primary rounded-xl`}
          style={animatedButtonBar}
        />
        <Pressable
          onPress={handleLeftPressable}
          className={` flex-1 rounded-xl py-4 px-2`}
          onLayout={(e) => {
            buttonWidth.current = e.nativeEvent.layout.width;
          }}
        >
          <TextFont
            font="medium"
            className={`text-center ${option.currentRoutine ? "!text-black" : "text-white"}`}
          >
            Rutina Actual
          </TextFont>
        </Pressable>
        <Pressable
          onPress={handleRightPressable}
          className={`flex-1 rounded-xl py-4 px-2`}
        >
          <TextFont
            className={`text-center ${option.myRoutines ? "!text-black" : "text-white"}`}
            font="medium"
          >
            Mis rutinas
          </TextFont>
        </Pressable>
      </View>
    </View>
  );
}
