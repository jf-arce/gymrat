import Screen from "@/modules/core/components/Screen";
import { useUser } from "@/modules/user/hooks/useUser";
import { Loading } from "@/modules/core/components/Loading";
import { Image, ScrollView, View } from "react-native";
import { TextFont } from "@/modules/core/components/TextFont";
import {
  AwardIcon,
  CoinsIcon,
  Dumbbell,
  Flame,
  TrophyIcon,
} from "lucide-react-native";
import { COLORS } from "@/constants/colors";
import { AppButton } from "@/modules/core/components/AppButton";

const avatar = "https://i.blogs.es/bb9765/en-forma-sin-gimnasio/840_560.jpg";
const avatar2 =
  "https://s1.1zoom.me/big0/778/Men_Barbell_Muscle_Gym_Workout_Human_back_582141_1280x853.jpg";

const rank =
  "https://i.pinimg.com/originals/81/07/c3/8107c34393d15f48eafb608d5e15d3d0.png";

export default function Index() {
  const { user, isUserLoading } = useUser();

  if (isUserLoading || !user) {
    return (
      <Screen>
        <Loading />
      </Screen>
    );
  }

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* User */}
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
                  Nivel 16
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

        {/* Progreso diario */}
        <View className="p-4 bg-black rounded-xl mb-4 gap-5">
          <View className="flex-row justify-between items-center">
            <TextFont font="semibold" className="text-2xl">
              Progreso Diario
            </TextFont>
            <TextFont
              font="medium"
              className="text-sm px-2 rounded-full bg-primary !text-black"
            >
              + 125 XP hoy
            </TextFont>
          </View>
          <View>
            <View className="flex-row items-center gap-2 justify-between">
              <TextFont font="medium">Nivel 16</TextFont>
              <TextFont font="medium" className="text-xs">
                2.450 / 3.000 XP
              </TextFont>
            </View>
            <View className="w-full bg-secondary h-3 rounded-full mt-2">
              <View className="w-[80%] h-full bg-primary rounded-full"></View>
            </View>
          </View>
          <View className="flex-row gap-3">
            <View className="flex-1 justify-center items-center bg-tertiary rounded-lg p-2 gap-1">
              <Flame size={20} color="#f97316" style={{ marginBottom: 4 }} />
              <TextFont>Racha</TextFont>
              <TextFont font="semibold">5 dias</TextFont>
            </View>
            <View className="flex-1 justify-center items-center bg-tertiary rounded-lg p-2 gap-1">
              <Dumbbell size={20} color="#3b82f6" style={{ marginBottom: 4 }} />
              <TextFont>Sesiones</TextFont>
              <TextFont font="semibold">42</TextFont>
            </View>
            <View className="flex-1 justify-center items-center bg-tertiary rounded-lg p-2 gap-1">
              <TrophyIcon
                size={20}
                color={COLORS.yellow}
                style={{ marginBottom: 4 }}
              />
              <TextFont>Logros</TextFont>
              <TextFont font="semibold">12</TextFont>
            </View>
          </View>
        </View>

        {/* Desafio diario */}
        <View className="p-4 bg-black rounded-xl mb-4 gap-3">
          <View className="flex-row justify-between items-center">
            <TextFont font="semibold" className="text-2xl">
              Desafio Diario
            </TextFont>
            <TextFont
              font="semibold"
              className="text-sm px-2 rounded-full bg-blue-500"
            >
              Nuevo
            </TextFont>
          </View>
          <View className="flex-row gap-4 bg-tertiary rounded-xl p-2">
            <View>
              <View className="bg-tertiary rounded-xl p-2">
                <Dumbbell color="#3b82f6" />
              </View>
            </View>
            <View className="gap-2 flex-1">
              <TextFont className="text-pretty" font="medium" numberOfLines={2}>
                Completa 4 series de press de banca sin fallar
              </TextFont>
              <TextFont>Gana 150 XP y 50 monedas</TextFont>
              <View className="w-full bg-secondary h-2 rounded-full mt-2">
                <View className="w-[80%] h-full bg-primary rounded-full"></View>
              </View>
            </View>
          </View>
          <AppButton buttonClassname="!bg-blue-500" textClassname="!text-white">
            Ver todos los desafios
          </AppButton>
        </View>

        {/* Rutina actual */}
        <View className="p-4 bg-black rounded-xl mb-4 gap-3">
          <View className="flex-row justify-between items-center">
            <TextFont font="semibold" className="text-2xl">
              Tu Rutina Actual
            </TextFont>
            <TextFont
              font="medium"
              className="text-sm px-2 rounded-full text-purple-500 border-[1px] border-purple-500"
            >
              Día 1/3
            </TextFont>
          </View>
          <View className="flex-row gap-4 bg-tertiary rounded-xl p-2">
            <View>
              <View className="bg-tertiary rounded-xl p-2">
                <Dumbbell color="#9a4fe3" />
              </View>
            </View>
            <View className="gap-2 flex-1">
              <TextFont className="text-pretty" font="medium" numberOfLines={2}>
                Pecho y biceps
              </TextFont>
              <TextFont>8 ejercicios</TextFont>
            </View>
          </View>
          <AppButton
            buttonClassname="!bg-purple-500"
            textClassname="!text-white"
          >
            Ver rutina completa
          </AppButton>
        </View>

        {/* Logros recientes */}
        <View className="p-4 bg-black rounded-xl mb-4 gap-3">
          <View className="flex-row justify-between items-center">
            <TextFont font="semibold" className="text-2xl">
              Logros recientes
            </TextFont>
            <TextFont
              font="medium"
              className="text-md px-2 rounded-full !text-primary"
            >
              Ver todos
            </TextFont>
          </View>
          <View className="flex-row gap-3">
            <View className="flex-1 justify-center items-center bg-tertiary rounded-lg p-2 gap-1">
              <View className="bg-orange-400/20 rounded-full p-3 mb-1">
                <AwardIcon height={25} width={25} color={COLORS.yellow} />
              </View>
              <TextFont>Racha</TextFont>
              <TextFont font="semibold">5 dias</TextFont>
            </View>
            <View className="flex-1 justify-center items-center bg-tertiary rounded-lg p-2 gap-1">
              <View className="bg-green-400/20 rounded-full p-3 mb-1">
                <AwardIcon height={25} width={25} color="#22c55e" />
              </View>
              <TextFont>Sesiones</TextFont>
              <TextFont font="semibold">42</TextFont>
            </View>
            <View className="flex-1 justify-center items-center bg-tertiary rounded-lg p-2 gap-1">
              <View className="bg-red-400/20 rounded-full p-3 mb-1">
                <AwardIcon height={25} width={25} color="#ff4949" />
              </View>
              <TextFont>Logros</TextFont>
              <TextFont font="semibold">12</TextFont>
            </View>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}
