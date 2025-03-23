import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import NotificationIcon from "./notificationIcon";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{headerShown:true}}>
      <Stack.Screen name="index"options={{title:"Login"}}  />
      <Stack.Screen name="register"options={{title:"Register"}}  />
      <Stack.Screen name="home"options={{title:"Home", headerRight: () => <NotificationIcon/>}}  />
      <Stack.Screen name="notifications"options={{title:"Notifications"}}  />
      <Stack.Screen name="feedback"options={{title:"Feedback"}}  />
      </Stack>
    </SafeAreaProvider>
  );
}
