import { Tabs } from "expo-router";
import {
  UserIcon,
  WorkoutIcon,
  ProgressIcon,
  HomeIcon,
} from "@/modules/core/components/Icons";
import { COLORS } from "@/constants/colors";
import { InfoIcon } from "@/modules/core/components/Icons";
import { View } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.secondary,
        },
        headerTintColor: COLORS.primary,
        headerTitleStyle: {
          fontWeight: "bold",
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarStyle: {
          backgroundColor: COLORS.secondary,
          borderTopWidth: 0,
          height: 60,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color }) => <HomeIcon color={color} />,
          headerTitle: "GYMRAT",
          headerRight: () => (
            <View className="pr-4">
              <InfoIcon color={COLORS.primary} />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="workouts"
        options={{
          title: "Entrenamientos",
          tabBarIcon: ({ color }) => <WorkoutIcon color={color} />,
        }}
      />

      <Tabs.Screen
        name="progress"
        options={{
          title: "Progreso",
          tabBarIcon: ({ color }) => <ProgressIcon color={color} />,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color }) => <UserIcon color={color} />,
        }}
      />
    </Tabs>
  );
}
