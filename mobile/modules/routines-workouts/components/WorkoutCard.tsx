import { ImageBackground, Pressable, View } from "react-native";
import { Workout } from "../types/workout.type";
import { TextFont } from "@/modules/core/components/TextFont";
import { Dumbbell, HashIcon } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";

interface WorkoutCardProps {
  workout: Workout;
  onPress?: () => void;
}

const image =
  "https://th.bing.com/th/id/R.1974fdb91f0b2ef615726af2ce73eda5?rik=XGa8nLzCSdZlmw&pid=ImgRaw&r=0";

export const WorkoutCard = ({ workout, onPress }: WorkoutCardProps) => {
  return (
    <Pressable onPress={onPress} key={workout.id}>
      <View>
        {/* <ImageBackground
          source={{ uri: image }}
          resizeMode="cover"
          className="w-full overflow-hidden rounded-t-xl"
        >
          <LinearGradient
            colors={["transparent", "rgba(25,30,40,0.9)"]}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "100%",
            }}
          />
        </ImageBackground> */}
        <View className="bg-tertiary mb-5 px-4 py-3 rounded-xl">
          <TextFont font="regular" className="text-2xl mb-2 !text-primary">
            {workout.name}
          </TextFont>
          <View className="flex-row items-center gap-5">
            <View className="flex-row items-center gap-1">
              {<HashIcon color="#b3bbc9" size={16} />}
              <TextFont font="regular" className="text-base text-[#b3bbc9]">
                {workout.number}
              </TextFont>
            </View>
            <View className="flex-row items-center gap-1">
              <Dumbbell color="#b3bbc9" size={16} />
              <TextFont font="regular" className="text-base text-[#b3bbc9]">
                8 ejercicios
              </TextFont>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};
