import { COLORS } from "@/constants/colors";
import { Loading } from "@/modules/core/components/Loading";
import Screen from "@/modules/core/components/Screen";
import { TextFont } from "@/modules/core/components/TextFont";
import { useCurrentRoutine } from "@/modules/workouts/hooks/useCurrentRoutine";
import { Pressable, ScrollView, View } from "react-native";
import { Pencil, PlusIcon, Trash } from "lucide-react-native";
import { ShortcutsSlides } from "@/modules/home/components/ShortcutsSlides";
import { useCallback, useMemo, useRef, useState } from "react";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { CurrentRoutine } from "@/modules/workouts/components/CurrentRoutine";
import { AppButton } from "@/modules/core/components/AppButton";

export default function WorkoutsScreen() {
  const { currentRoutine, loading } = useCurrentRoutine();
  const [option, setOption] = useState({
    currentRoutine: true,
    myRoutines: false,
  });

  const [workoutTitle, setWorkoutTitle] = useState("");
  const handleWorkoutTitle = (title: string) => {
    setWorkoutTitle(title);
  };

  // Pressable bar animation
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

  // BottomSheet
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["30%"], []);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    [],
  );

  if (loading) {
    return (
      <Screen>
        <Loading />
      </Screen>
    );
  }

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
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

        {option.currentRoutine ? (
          <CurrentRoutine
            currentRoutine={currentRoutine}
            handlePresentModalPress={handlePresentModalPress}
            handleWorkoutTitle={handleWorkoutTitle}
          />
        ) : (
          // <ShortcutsSlides />
          <View>
            <View className="mb-8">
              <AppButton
                icon={<PlusIcon color={COLORS.white} size={25} />}
                buttonClassname="!bg-blue-500"
                textClassname="!text-white"
              >
                Nueva rutina
              </AppButton>
            </View>
            <View className="gap-4">
              {[1, 2, 3].map((item, index) => (
                <View
                  className="flex-row justify-between items-center bg-black p-4 rounded-xl"
                  key={index}
                >
                  <View>
                    <TextFont font="medium" className="text-xl">
                      Rutina de piernas
                    </TextFont>
                    <TextFont font="regular" className="text-sm">
                      6 ejercicios
                    </TextFont>
                  </View>
                  <TextFont
                    font="medium"
                    className="text-base bg-green-500 px-3 rounded-full"
                  >
                    Actual
                  </TextFont>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={snapPoints}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        index={1}
        handleIndicatorStyle={{ backgroundColor: COLORS.secondaryText }}
        handleStyle={{
          backgroundColor: COLORS.secondaryContrast,
          borderRadius: 100,
        }}
        backgroundStyle={{ backgroundColor: COLORS.secondaryContrast }}
      >
        <BottomSheetView className="p-4 justify-center">
          <TextFont font="medium" className="text-xl text-center mb-4">
            {workoutTitle}
          </TextFont>
          <View className="bg-secondary rounded-lg">
            <Pressable className="active:opacity-50 p-4 flex-row gap-3 items-center">
              <Pencil color={COLORS.white} size={25} />
              <TextFont font="medium" className="text-lg text-white">
                Editar
              </TextFont>
            </Pressable>
            <View className="border-t-[1px] border-gray-700"></View>
            <Pressable className="active:opacity-50 p-4 flex-row gap-3 items-center">
              <Trash color={COLORS.red} size={25} />
              <TextFont font="medium" className="text-lg !text-red-500">
                Eliminar
              </TextFont>
            </Pressable>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </Screen>
  );
}
