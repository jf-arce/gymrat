import { XpBar } from "@/modules/user/components/XpBar";
import { Image, View } from "react-native";
import { User } from "../types/user";
import { TextFont } from "@/modules/core/components/TextFont";

const avatar = "https://i.blogs.es/bb9765/en-forma-sin-gimnasio/840_560.jpg";

const rank =
  "https://i.pinimg.com/originals/81/07/c3/8107c34393d15f48eafb608d5e15d3d0.png";

interface UserInfoHomeProps {
  user: User;
}
export const UserInfoHome = ({ user }: UserInfoHomeProps) => {
  return (
    <View className="flex-row justify-between items-center">
      <View className="flex-row gap-6 justify-center items-center">
        <View className="items-center gap-2">
          <Image
            source={{ uri: avatar }}
            style={{ width: 90, height: 90 }}
            className="rounded-full"
          />
        </View>
        <View className="gap-2 justify-between">
          <TextFont
            font="semibold"
            className="text-xl text-white font-undinaru-bold"
          >
            {user.username.length > 20
              ? `${user.username.slice(0, 17)}...`
              : user.username}
          </TextFont>
          <XpBar
            level={user?.level || 0}
            currentExp={500}
            expToNextLevel={1000}
            containerClassname="w-40"
          />
        </View>
      </View>
      <View>
        <Image
          source={{ uri: rank }}
          style={{ width: 70, height: 70 }}
          className="rounded-full"
        />
      </View>
    </View>
  );
};
