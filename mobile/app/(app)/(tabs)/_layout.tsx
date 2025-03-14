import { Tabs } from "expo-router";
import {
  UserIcon,
  WorkoutIcon,
  ProgressIcon,
  HomeIcon,
} from "@/modules/core/components/Icons";
import { COLORS } from "@/constants/colors";
import { Pressable, View } from "react-native";
import { BellIcon, PlusIcon, SearchIcon } from "lucide-react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.secondaryContrast,
        },
        headerTintColor: COLORS.primary,
        headerTitleStyle: {
          fontFamily: "marios-black",
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarStyle: {
          backgroundColor: COLORS.secondaryContrast,
          borderTopWidth: 0,
          height: 60,
        },
        tabBarLabelStyle: {
          fontFamily: "clashgrotesk-medium",
          fontSize: 12,
          marginTop: 2,
        },
        sceneStyle: {
          backgroundColor: COLORS.secondary,
        },
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color }) => <HomeIcon color={color} />,
          headerTitle: "GYMRAT",
          headerRight: () => (
            <View className="pr-4 flex-row gap-4">
              <SearchIcon color={COLORS.primary} />
              <BellIcon color={COLORS.primary} />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="(routines)"
        options={{
          headerShown: false,
          title: "Rutinas",
          tabBarIcon: ({ color }) => <WorkoutIcon color={color} />,
          headerTitle: "Rutinas",
          headerRight: () => (
            <Pressable className="pr-4 active:opacity-50">
              <PlusIcon color={COLORS.primary} size={30} />
            </Pressable>
          ),
        }}
      />

      <Tabs.Screen
        name="(progress)"
        options={{
          title: "Progreso",
          tabBarIcon: ({ color }) => <ProgressIcon color={color} />,
        }}
      />

      <Tabs.Screen
        name="(profile)"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color }) => <UserIcon color={color} />,
        }}
      />
    </Tabs>
  );
}
