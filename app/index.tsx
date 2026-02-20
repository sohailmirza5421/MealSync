import { Redirect } from "expo-router";

export default function Index() {
  // Redirect to appropriate screen
  return <Redirect href={"/(tabs)/Admin"} />;
}
