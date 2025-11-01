import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { colors } from "@/styles/global"

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Inter-Regular": require("@/assets/fonts/Inter/Inter_18pt-Regular.ttf"),
    "Inter-Bold": require("@/assets/fonts/Inter/Inter_18pt-Bold.ttf"),
    "Inter-Black": require("@/assets/fonts/Inter/Inter_18pt-Black.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    />
  );
}
