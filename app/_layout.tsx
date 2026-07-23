import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack>
    <Stack.Screen name="index" options={{ title: "Pokédex", }} />
    <Stack.Screen name="details" options={{ title: "Details", headerBackButtonDisplayMode: "minimal", presentation: "modal"}} />
  </Stack>;
}
