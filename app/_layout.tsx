// app/_layout.tsx
import { ChildProvider } from "@/src/context/ChildContext";
import { MealProvider } from "@/src/context/MealContext";
import { Slot } from "expo-router";

export default function RootLayout() {
  return (
    <ChildProvider>
      <MealProvider>
        <Slot /> {/* All pages and tabs go here */}
      </MealProvider>
    </ChildProvider>
  );
}
