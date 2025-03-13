import { COLORS } from "@/constants/colors";
import { Stack } from "expo-router";
import { PlusIcon } from "lucide-react-native";
import { Pressable } from "react-native";

export default function WorkoutsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="workouts"
        options={{
          title: "Entrenamientos",
          headerShown: true,
          headerStyle: {
            backgroundColor: COLORS.secondaryContrast,
          },
          headerTintColor: COLORS.primary,
          headerTitleStyle: {
            fontFamily: "clashgrotesk-bold",
          },
          headerRight: () => (
            <Pressable className="active:opacity-50">
              <PlusIcon color={COLORS.primary} size={30} />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen name="details" />
    </Stack>
  );
}
