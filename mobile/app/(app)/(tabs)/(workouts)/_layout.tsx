import { Stack } from "expo-router";

export default function WorkoutsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="workouts" />
      <Stack.Screen name="details" />
    </Stack>
  );
}
