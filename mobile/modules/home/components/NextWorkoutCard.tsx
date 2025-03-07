import { COLORS } from "@/constants/colors";
import { AppButton } from "@/modules/core/components/AppButton";
import { WorkoutIcon } from "@/modules/core/components/Icons";
import { TextFont } from "@/modules/core/components/TextFont";
import { ImageBackground, View } from "react-native";

const card1 =
  "https://get.wallhere.com/photo/black-monochrome-portrait-dark-photography-bodybuilding-ART-light-blackandwhite-shadows-man-hand-gym-darkness-fineart-creative-muscle-arm-strong-computer-wallpaper-black-and-white-monochrome-photography-560580.jpg";

export const NextWorkoutCard = () => {
  return (
    <ImageBackground
      source={{ uri: card1 }}
      className="overflow-hidden mt-8 p-4 rounded-xl"
      resizeMode="cover"
    >
      <View className="justify-between gap-5">
        <View className="flex-row items-center gap-2">
          <View className="">
            {/* <WorkoutIcon color={COLORS.tertiary} /> */}
            <TextFont font="black" className="text-white text-xl">
              Próximo Entrenamiento
            </TextFont>
            <TextFont
              font="regular"
              className="text-gray-400 font-semibold text-lg text-wrap max-w-60"
              numberOfLines={2}
            >
              Rutina Push Pull Leg
            </TextFont>
          </View>
        </View>
        <View className="flex-row justify-between items-center mt-12">
          {/* <View className="gap-2 mr-4">
            <TextFont
              font="semibold"
              className="text-white font-semibold text-lg text-wrap max-w-60"
              numberOfLines={2}
            >
              Rutina Push Pull Leg
            </TextFont>
          </View> */}
          <TextFont
            font="semibold"
            className="text-gray-300 text-lg text-wrap max-w-60"
            numberOfLines={2}
          >
            Pecho y Biceps
          </TextFont>
          <View className="max-w-56">
            <AppButton variant="primary">Comenzar</AppButton>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};
