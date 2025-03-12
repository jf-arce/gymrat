import { Stack } from "expo-router";

export default function ProgressLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="progress" />
    </Stack>
  );
}
