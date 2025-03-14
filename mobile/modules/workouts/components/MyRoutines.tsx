import { COLORS } from "@/constants/colors";
import { useAuthStore } from "@/modules/auth/stores/auth.store";
import { AppButton } from "@/modules/core/components/AppButton";
import { TextFont } from "@/modules/core/components/TextFont";
import { PlusIcon } from "lucide-react-native";
import React from "react";
import { View } from "react-native";
import { useAllRoutines } from "../hooks/useAllRoutines";
import { Pressable } from "react-native-gesture-handler";

export const MyRoutines = () => {
  const user = useAuthStore((state) => state.authSession.user);
  const { routines } = useAllRoutines(user?.id);

  return (
    <View>
      <View className="mb-8">
        <AppButton
          icon={<PlusIcon color={COLORS.white} size={25} />}
          buttonClassname="!bg-blue-500"
          textClassname="!text-white"
        >
          Nueva rutina
        </AppButton>
      </View>
      <View className="gap-4">
        {routines.map((routine) => (
          <Pressable key={routine.id} className="active:opacity-50">
            <View className="flex-row justify-between items-center bg-black p-4 rounded-xl">
              <View>
                <TextFont font="medium" className="text-xl">
                  {routine.name}
                </TextFont>
                <TextFont font="regular" className="text-sm"></TextFont>
              </View>
              {routine.isCurrent ? (
                <TextFont
                  font="medium"
                  className="text-lg text-green-500 px-3 py-1 rounded-xl border-[1px] border-green-500"
                >
                  Actual
                </TextFont>
              ) : (
                <AppButton
                  buttonClassname="!bg-red-500"
                  textClassname="!text-white"
                >
                  Activar
                </AppButton>
              )}
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
};
