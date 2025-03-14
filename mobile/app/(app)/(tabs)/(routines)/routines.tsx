import { COLORS } from "@/constants/colors";
import { Loading } from "@/modules/core/components/Loading";
import Screen from "@/modules/core/components/Screen";
import { TextFont } from "@/modules/core/components/TextFont";
import { useCurrentRoutine } from "@/modules/workouts/hooks/useCurrentRoutine";
import { Pressable, ScrollView, View } from "react-native";
import { Pencil, Trash } from "lucide-react-native";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { CurrentRoutine } from "@/modules/workouts/components/CurrentRoutine";
import { MyRoutines } from "@/modules/workouts/components/MyRoutines";
import ButtonBar from "@/modules/workouts/components/ButtonBar";

export default function WorkoutsScreen() {
  const { currentRoutine, loading } = useCurrentRoutine();
  // TODO: CUANDO NO HAY RUTINA ACTUAL TIENE QUE MOSTRAR DIRECTAMENTE LA PANTALLA DE CREAR RUTINA
  const [option, setOption] = useState({
    currentRoutine: true,
    myRoutines: false,
  });
  const [workoutTitle, setWorkoutTitle] = useState("");
  const handleWorkoutTitle = (title: string) => {
    setWorkoutTitle(title);
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
        <ButtonBar option={option} setOption={setOption} />

        {option.currentRoutine ? (
          <CurrentRoutine
            currentRoutine={currentRoutine}
            handlePresentModalPress={handlePresentModalPress}
            handleWorkoutTitle={handleWorkoutTitle}
          />
        ) : (
          <MyRoutines />
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
