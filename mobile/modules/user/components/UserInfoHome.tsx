import { Image, View } from "react-native";
import { User } from "../types/user";
import { TextFont } from "@/modules/core/components/TextFont";
import { CoinsIcon } from "lucide-react-native";
import { COLORS } from "@/constants/colors";

const avatar = "https://i.blogs.es/bb9765/en-forma-sin-gimnasio/840_560.jpg";
const avatar2 =
  "https://s1.1zoom.me/big0/778/Men_Barbell_Muscle_Gym_Workout_Human_back_582141_1280x853.jpg";

const rank =
  "https://i.pinimg.com/originals/81/07/c3/8107c34393d15f48eafb608d5e15d3d0.png";

interface UserInfoHomeProps {
  user: User;
}
export const UserInfoHome = ({ user }: UserInfoHomeProps) => {
  return (
    <View className="flex-row justify-between items-center mb-6">
      <View className="flex-row gap-3 justify-center items-center flex-1">
        <View className="items-center gap-2">
          <Image
            source={{ uri: avatar2 }}
            style={{ width: 70, height: 70 }}
            className="rounded-full"
          />
        </View>
        <View className="gap-2 justify-between flex-1">
          <TextFont
            font="semibold"
            className="text-2xl text-white font-undinaru-bold"
          >
            {user.username.length > 20
              ? `${user.username.slice(0, 17)}...`
              : user.username}
          </TextFont>
          <View className="flex-row items-center gap-2">
            <TextFont
              font="medium"
              className="text-sm px-2 border-[1px] rounded-full !border-primary !text-primary"
            >
              Nivel {user.level}
            </TextFont>
            <Image
              source={{ uri: rank }}
              style={{ width: 30, height: 30 }}
              className="rounded-full"
            />
          </View>
        </View>
      </View>
      <View>
        <View className="items-center gap-2">
          <CoinsIcon size={25} color={COLORS.yellow} />
          <TextFont font="medium" className="text-md font-medium">
            $1.500
          </TextFont>
        </View>
      </View>
    </View>
  );
};
