import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="Admin" options={{ title: "Admin" }} />
      <Tabs.Screen name="MealMenu" options={{ title: "Meal Menu" }} />
    </Tabs>
  );
}
