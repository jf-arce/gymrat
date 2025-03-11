import { COLORS } from "@/constants/colors";
import { AppButton } from "@/modules/core/components/AppButton";
import { Loading } from "@/modules/core/components/Loading";
import Screen from "@/modules/core/components/Screen";
import { TextFont } from "@/modules/core/components/TextFont";
import { useCurrentRoutineWorkouts } from "@/modules/routines-workouts/hooks/useCurrentRoutineWorkouts";
import { Pressable, ScrollView, View } from "react-native";
import {
  ChevronRightIcon,
  EllipsisIcon,
  Pencil,
  PlayIcon,
  Trash,
} from "lucide-react-native";
import { ShortcutsSlides } from "@/modules/home/components/ShortcutsSlides";
import { useCallback, useMemo, useRef, useState } from "react";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

export default function WorkoutsScreen() {
  const { currentRoutine, loading } = useCurrentRoutineWorkouts();
  const [option, setOption] = useState({
    currentRoutine: true,
    myRoutines: false,
  });

  const sheetRef = useRef<BottomSheet>(null);
  const [isOpenButtonSheet, setIsOpenButtonSheet] = useState(false);
  const snapPoints = useMemo(() => ["40%"], []);

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

  const handleButtonSheet = useCallback((index: number) => {
    sheetRef.current?.snapToIndex(index);
    setIsOpenButtonSheet(true);
  }, []);

  if (loading || !currentRoutine) {
    return (
      <Screen>
        <Loading />
      </Screen>
    );
  }

  const currentWorkout = currentRoutine.getCurrentWorkout();
  const nextWorkouts = currentWorkout
    ? currentRoutine.workouts.filter(
        (workout) => workout.number > currentWorkout.number,
      )
    : [];

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
          <View>
            <View className="flex-row justify-between items-center px-1">
              <View>
                <TextFont font="semibold" className="text-2xl">
                  {currentRoutine.name}
                </TextFont>
                <TextFont font="medium" className="text-base text-gray-500">
                  {currentRoutine.workouts.length} días por semana
                </TextFont>
              </View>
              <TextFont
                font="medium"
                className="text-lg px-3 rounded-full !text-primary border-[1px] border-primary"
              >
                Día {currentRoutine?.getCurrentWorkout()?.number} /{" "}
                {currentRoutine?.workouts.length}
              </TextFont>
            </View>

            <Pressable key={currentWorkout?.id} className="active:opacity-60">
              <View
                className="px-4 py-7 bg-black rounded-xl gap-4 my-4"
                key={currentWorkout?.id}
              >
                <View className="flex-row justify-between items-center mb-1">
                  <View className="flex-row gap-3">
                    <TextFont
                      font="medium"
                      className="text-lg px-3 rounded-full !text-blue-500 border-[1px] border-blue-500"
                    >
                      Día {currentWorkout?.number}
                    </TextFont>
                    <TextFont font="semibold" className="text-xl">
                      {currentWorkout?.name}
                    </TextFont>
                  </View>
                  <Pressable
                    className="active:opacity-50"
                    onPress={() => handleButtonSheet(1)}
                  >
                    <View>
                      <EllipsisIcon color={COLORS.white} size={30} />
                    </View>
                  </Pressable>
                </View>
                <AppButton
                  buttonClassname="!bg-blue-500"
                  textClassname="!text-white"
                  icon={<PlayIcon color={COLORS.white} />}
                >
                  Comenzar Entrenamiento
                </AppButton>
              </View>
            </Pressable>

            <TextFont font="semibold" className="text-2xl my-5">
              Próximos Entrenamientos
            </TextFont>

            {nextWorkouts.map((workout) => (
              <Pressable key={workout.id} className="active:opacity-50">
                <View
                  className="p-4 bg-black rounded-xl gap-4 mb-4"
                  key={workout.id}
                >
                  <View className="flex-row justify-between items-center mb-1">
                    <View className="flex-row gap-3">
                      <TextFont
                        font="medium"
                        className="text-lg px-3 rounded-full !text-blue-500 border-[1px] border-blue-500"
                      >
                        Día {workout.number}
                      </TextFont>
                      <TextFont font="semibold" className="text-xl">
                        {workout.name}
                      </TextFont>
                    </View>
                    <View>
                      <ChevronRightIcon color={COLORS.primary} size={30} />
                    </View>
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        ) : (
          <ShortcutsSlides />
        )}
      </ScrollView>
      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose
        index={-1}
        onClose={() => setIsOpenButtonSheet(false)}
        handleIndicatorStyle={{ backgroundColor: COLORS.primary }}
        handleStyle={{
          backgroundColor: COLORS.secondaryContrast,
          borderRadius: 100,
        }}
        backgroundStyle={{ backgroundColor: COLORS.secondaryContrast }}
      >
        <BottomSheetView className="p-4 justify-center">
          <TextFont font="medium" className="text-xl text-center mb-4">
            Pecho Bicep
          </TextFont>
          <View className="bg-secondary rounded-lg justify-center">
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
      </BottomSheet>
    </Screen>
  );
}
