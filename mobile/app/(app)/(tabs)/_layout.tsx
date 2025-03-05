import { Tabs } from "expo-router";
import {
  UserIcon,
  WorkoutIcon,
  ProgressIcon,
  HomeIcon,
} from "@/modules/core/components/Icons";
import { COLORS } from "@/constants/colors";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarStyle: {
          backgroundColor: COLORS.secondary,
          borderTopWidth: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color }) => <HomeIcon color={color} />,
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
