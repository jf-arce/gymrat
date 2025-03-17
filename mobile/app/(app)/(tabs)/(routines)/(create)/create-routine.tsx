import React, { useCallback, useMemo, useRef, useState } from "react";
import { useAuthStore } from "@/modules/auth/stores/auth.store";
import Screen from "@/modules/core/components/Screen";
import { TextFont } from "@/modules/core/components/TextFont";
import { COLORS } from "@/constants/colors";
import { Stack } from "expo-router";
import { Pressable, ScrollView, TextInput, View } from "react-native";
import { AppButton } from "@/modules/core/components/AppButton";
import {
  ArrowDownUp,
  Dumbbell,
  Ellipsis,
  PlusIcon,
  Trash,
} from "lucide-react-native";
import ExerciseCardCreate from "@/modules/workouts/components/ExerciseCardCreate";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetTextInput,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

export default function CreateRoutineScreen() {
  const user = useAuthStore((state) => state.authSession.user);
  const [workoutName, setWorkoutName] = useState("");
  const [workoutDays, setWorkoutDays] = useState([
    {
      day: 1,
      name: "Entrenamiento 1",
    },
  ]);

  // BottomSheet
  const bottomSheetModalRefAddWorkoutDay = useRef<BottomSheetModal>(null);
  const bottomSheetModalRefWorkOutOptions = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ["50%"], []);
  const snapPoints2 = useMemo(() => ["30%"], []);
  const handlePresentModalPressAddWorkoutDay = useCallback(() => {
    bottomSheetModalRefAddWorkoutDay.current?.present();
  }, []);
  const handlePresentModalPressWorkOutOptions = useCallback(() => {
    bottomSheetModalRefWorkOutOptions.current?.present();
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
  // Cuando le demos a guardar el nombre de l rutina debe aparecer otra card con el nombre de la rutina y un boton para agregar un nuevo dia
  const handleAddWorkoutDay = () => {
    setWorkoutDays((prev) => [
      ...prev,
      {
        day: prev.length + 1,
        name: workoutName,
      },
    ]);
    bottomSheetModalRefAddWorkoutDay.current?.close();
  };

  return (
    <Screen>
      <Stack.Screen
        name="/create-routine"
        options={{
          title: "Nueva rutina",
          headerShown: true,
          headerStyle: {
            backgroundColor: COLORS.secondaryContrast,
          },
          headerTintColor: COLORS.white,
          headerTitleStyle: {
            fontFamily: "clashgrotesk-bold",
          },
          headerRight: () => (
            <View className="active:opacity-50">
              <AppButton>Guardar</AppButton>
            </View>
          ),
        }}
      />
      <ScrollView>
        <View className="gap-3 mb-8">
          <TextFont font="semibold" className="text-xl">
            Nombre de la rutina
          </TextFont>
          <TextInput
            placeholder="Ej: Full Body"
            className="bg-slate-950 rounded-lg p-3 border-[1px] border-gray-700 placeholder:text-gray-400 mr-1"
            style={{ color: COLORS.white }}
          />
        </View>

        <View className="flex-row justify-between items-center mb-8">
          <TextFont font="semibold" className="text-2xl">
            Entrenamientos
          </TextFont>
          <AppButton
            icon={<PlusIcon color={COLORS.black} />}
            onPress={handlePresentModalPressAddWorkoutDay}
          >
            Agregar Día
          </AppButton>
        </View>

        {/* Entrenamientos */}
        <View className="gap-6 mb-6">
          {workoutDays.map((workoutDay) => (
            <View className="gap-6 bg-black p-4 rounded-xl">
              <View className="gap-4">
                <View className="gap-3">
                  <View className="flex-row justify-between">
                    <View className="flex-row items-center gap-3">
                      <TextFont
                        font="medium"
                        className="text-base bg-blue-500 px-3 rounded-full"
                      >
                        Dia {workoutDay.day}
                      </TextFont>
                      <TextFont
                        font="semibold"
                        className="text-xl text-wrap"
                        numberOfLines={2}
                      >
                        {workoutDay.name}
                      </TextFont>
                    </View>
                    <Pressable
                      className="active:opacity-50"
                      onPress={handlePresentModalPressWorkOutOptions}
                    >
                      <Ellipsis color={COLORS.white} />
                    </Pressable>
                  </View>
                  <View className="flex-row items-center gap-1">
                    <Dumbbell color="#9ca3af" size={14} />
                    <TextFont font="medium" className="!text-gray-400">
                      0 ejercicios
                    </TextFont>
                  </View>
                </View>
                <TextInput
                  className="bg-slate-950 rounded-xl p-3 border-[1px] border-gray-700 placeholder:text-gray-400"
                  style={{ color: COLORS.white }}
                  placeholder="Nombre del entrenamiento"
                  value={workoutDay.name}
                  onChangeText={(name) =>
                    setWorkoutDays((prev) =>
                      prev.map((wd) =>
                        wd.day === workoutDay.day ? { ...wd, name } : wd,
                      ),
                    )
                  }
                />
              </View>

              <AppButton
                buttonClassname="!bg-blue-500"
                textClassname="!text-white"
                icon={<PlusIcon color={COLORS.white} />}
              >
                Agregar Ejercicio
              </AppButton>
            </View>
          ))}
        </View>
        <BottomSheetModal
          ref={bottomSheetModalRefAddWorkoutDay}
          snapPoints={snapPoints}
          enablePanDownToClose
          backdropComponent={renderBackdrop}
          index={0}
          handleIndicatorStyle={{ backgroundColor: COLORS.secondaryText }}
          handleStyle={{
            backgroundColor: COLORS.secondaryContrast,
            borderRadius: 100,
          }}
          backgroundStyle={{ backgroundColor: COLORS.secondaryContrast }}
          aria-hidden={true}
          keyboardBehavior="fillParent"
          enableDynamicSizing={false}
        >
          <BottomSheetView className="p-4 justify-center">
            <TextFont font="medium" className="text-xl text-center mb-4">
              Nombre del entrenamiento
            </TextFont>
            <BottomSheetTextInput
              placeholder="Ej: Pecho y Bíceps"
              className="bg-slate-950 text-lg rounded-lg p-4 border-[1px] border-gray-700 placeholder:text-gray-400"
              style={{ color: COLORS.white }}
              onChangeText={(name) => setWorkoutName(name)}
            />
            <View className="flex-row gap-4 mt-6 justify-center">
              <AppButton onPress={handleAddWorkoutDay}>Aceptar</AppButton>
              <AppButton
                buttonClassname="!bg-red-500"
                textClassname="!text-white"
                onPress={() =>
                  bottomSheetModalRefAddWorkoutDay.current?.close()
                }
              >
                Cancelar
              </AppButton>
            </View>
          </BottomSheetView>
        </BottomSheetModal>

        <BottomSheetModal
          ref={bottomSheetModalRefWorkOutOptions}
          snapPoints={snapPoints2}
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
            {/* <TextFont font="medium" className="text-xl text-center mb-4">
              {workoutTitle}
            </TextFont> */}
            <View className="bg-secondary rounded-lg">
              <Pressable className="active:opacity-50 p-4 flex-row gap-3 items-center">
                <ArrowDownUp color={COLORS.white} size={25} />
                <TextFont font="medium" className="text-lg text-white">
                  Cambiar orden
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
      </ScrollView>
    </Screen>
  );
}
