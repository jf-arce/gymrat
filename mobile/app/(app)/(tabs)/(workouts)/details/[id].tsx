import { COLORS } from "@/constants/colors";
import { AppButton } from "@/modules/core/components/AppButton";
import { Loading } from "@/modules/core/components/Loading";
import Screen from "@/modules/core/components/Screen";
import { TextFont } from "@/modules/core/components/TextFont";
import { WorkoutExercisesService } from "@/modules/workouts/services/workout-exercises.service";
import { WorkoutExercises } from "@/modules/workouts/types/workout-exercises.type";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Stack, useLocalSearchParams } from "expo-router";
import {
  Clock,
  Dumbbell,
  EllipsisIcon,
  Pencil,
  PlayIcon,
  Trash,
} from "lucide-react-native";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Pressable, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function WorkoutDetailsScreen() {
  const { id: workoutId } = useLocalSearchParams();
  const [workoutExercises, setWorkoutExercises] = useState<WorkoutExercises[]>(
    [],
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWorkoutDetails() {
      const data =
        await WorkoutExercisesService.findExercisesByWorkoutId(+workoutId);
      setLoading(false);
      setWorkoutExercises(data);
    }
    fetchWorkoutDetails();
  }, []);

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
        <Stack.Screen
          name="details/[id]"
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: COLORS.secondaryContrast,
            },
            headerTintColor: COLORS.white,
            headerTitleStyle: {
              fontFamily: "clashgrotesk-bold",
            },
            headerTitle: `${workoutExercises[0]?.workouts.name}`,

            headerRight: () => (
              <Pressable
                className="active:opacity-50"
                onPress={handlePresentModalPress}
              >
                <View>
                  <EllipsisIcon color={COLORS.white} size={30} />
                </View>
              </Pressable>
            ),
          }}
        />
        <View className="gap-5 mb-8">
          <AppButton
            buttonClassname="!bg-blue-500"
            textClassname="!text-white"
            icon={<PlayIcon color={COLORS.white} />}
          >
            Iniciar Entrenamiento
          </AppButton>
        </View>

        <View className="bg-tertiary h-1 mb-7 rounded-full w-full" />

        <View className="gap-7">
          <View className="flex-row justify-between items-center pr-1">
            <TextFont
              font="medium"
              className="text-lg !text-gray-200 border-[1px] border-gray-200 rounded-full px-3"
            >
              {workoutExercises.length} Ejercicios
            </TextFont>
            <Pressable className="active:opacity-50">
              <View className="py-1">
                <TextFont font="medium" className="text-lg !text-primary">
                  Editar rutina
                </TextFont>
              </View>
            </Pressable>
          </View>

          <View className="gap-8">
            {workoutExercises.map((workoutExercise) => (
              <View key={workoutExercise.exercises.id}>
                <View className="flex-row gap-4 items-center">
                  <View>
                    <View className="bg-tertiary rounded-xl p-2">
                      <Dumbbell color={COLORS.purple} />
                    </View>
                  </View>
                  <View className="gap-2 flex-1 flex-row justify-between items-center">
                    <View className="gap-1">
                      <TextFont
                        className="text-pretty text-xl"
                        font="semibold"
                        numberOfLines={2}
                      >
                        {workoutExercise.exercises.name}
                      </TextFont>
                      <TextFont className="!text-gray-400">
                        {workoutExercise.sets.length}{" "}
                        {workoutExercise.sets.length > 1 ? "series" : "serie"}
                      </TextFont>
                    </View>
                  </View>
                </View>

                <View className="bg-tertiary h-[1px] w-full mx-auto rounded-full mt-4" />

                <View className="mt-4 px-2">
                  <View className="flex-row items-center gap-2 py-2">
                    <Clock color={COLORS.purple} size={18} />
                    <TextFont font="medium" className="!text-gray-300">
                      {workoutExercise.rest} seg de descanso
                    </TextFont>
                  </View>
                  <View className="flex-row justify-between items-center py-2">
                    <TextFont font="medium" className="!text-gray-400">
                      Serie
                    </TextFont>
                    <TextFont font="medium" className="!text-gray-400">
                      Peso (kg)
                    </TextFont>
                    <TextFont font="medium" className="!text-gray-400">
                      Reps
                    </TextFont>
                  </View>
                  {workoutExercise.sets.map((set, index) => (
                    <View
                      key={index}
                      className="flex-row justify-between items-center p-2"
                    >
                      <TextFont font="medium">{index + 1}</TextFont>
                      <TextFont font="medium">{set.weightKg}</TextFont>
                      <TextFont font="medium">{set.repetitions}</TextFont>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>
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
            {workoutExercises[0]?.workouts.name}
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
