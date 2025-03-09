import { AppButton } from "@/modules/core/components/AppButton";
import { Loading } from "@/modules/core/components/Loading";
import { TextFont } from "@/modules/core/components/TextFont";
import { ImageBackground, View } from "react-native";
import { useCurrentRoutineWorkouts } from "@/modules/routines-workouts/hooks/useCurrentRoutineWorkouts";

const card1 =
  "https://p4.wallpaperbetter.com/wallpaper/328/683/607/man-fitness-gym-arms-wallpaper-preview.jpg";
const card2 =
  "https://get.wallhere.com/photo/black-monochrome-portrait-dark-photography-bodybuilding-ART-light-blackandwhite-shadows-man-hand-gym-darkness-fineart-creative-muscle-arm-strong-computer-wallpaper-black-and-white-monochrome-photography-560580.jpg";

export const NextWorkoutCard = () => {
  const { currentRoutine, loading } = useCurrentRoutineWorkouts();

  if (loading) return <Loading />;

  if (!currentRoutine) return null;

  return (
    <ImageBackground
      source={{ uri: card1 }}
      className="overflow-hidden mt-8 p-4 rounded-xl"
      resizeMode="cover"
    >
      <View className="justify-between gap-5">
        <View className="flex-row items-center gap-2">
          <View className="">
            <TextFont font="bold" className="text-white text-2xl">
              Próximo Entrenamiento
            </TextFont>
            <TextFont
              font="medium"
              className="text-gray-400 font-semibold text-md text-wrap max-w-60"
              numberOfLines={2}
            >
              {currentRoutine.name}
            </TextFont>
          </View>
        </View>
        <View className="flex-row justify-between items-center mt-12">
          <View>
            <TextFont font="medium" className="text-white text-lg">
              Día {currentRoutine.getCurrentWorkout()?.number || "0"} de{" "}
              {currentRoutine.workouts.length}
            </TextFont>
            <TextFont
              font="semibold"
              className="text-primary text-lg text-wrap max-w-60"
              numberOfLines={2}
            >
              {currentRoutine.getCurrentWorkout()?.name ||
                "No hay entrenamiento programado"}
            </TextFont>
          </View>
          <View className="max-w-56">
            <AppButton variant="primary" textClassname="text-lg">
              Comenzar
            </AppButton>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};
