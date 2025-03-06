import { Text, Pressable } from "react-native";
import ExercisePicker from "@/modules/exercises/components/ExercisePicker";
import { Link, Stack } from "expo-router";
import Screen from "@/modules/core/components/Screen";
import { useUser } from "@/modules/user/hooks/useUser";

export default function Index() {
  const { user, isUserLoading } = useUser();

  if (isUserLoading) {
    return <Text style={{ color: "white" }}>Loading...</Text>;
  }

  return (
    <Screen>
      <Stack.Screen
        options={{
          title: "Home",
        }}
      />

      <Text style={{ color: "white" }}>Bienvenido {user?.name}</Text>
      <Text style={{ color: "white" }}>Nivel {user?.level}</Text>
      <Text style={{ color: "white" }}>Rango {user?.level}</Text>
      {/* <Link href="/profile" asChild>
        <Pressable className="bg-blue-500 p-4 rounded-md">
          <Text>Go to profile</Text>
        </Pressable>
      </Link>

      <ExercisePicker /> */}
    </Screen>
  );
}
