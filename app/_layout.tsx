import React, { useCallback, useEffect, useMemo } from "react";
import { View } from "react-native";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { colors } from "@/styles/global";

SplashScreen.preventAutoHideAsync().catch(() => {
});

const FONT_MAP: Record<string, any> = {
  "Inter-Regular": require("@/assets/fonts/Inter/Inter_18pt-Regular.ttf"),
  "Inter-Bold": require("@/assets/fonts/Inter/Inter_18pt-Bold.ttf"),
  "Inter-Black": require("@/assets/fonts/Inter/Inter_18pt-Black.ttf"),
};

const SCREEN_NAMES: string[] = [
  "index",
  "notes",
  "tasks",
  "note-page",
  "task-page",
];

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts(FONT_MAP);

  useEffect(() => {
    if (fontError) {
      console.error("Font loading error:", fontError);
    }
  }, [fontError]);

  const stackScreens = useMemo(
    () =>
      SCREEN_NAMES.map((name) => (
        <Stack.Screen key={name} name={name} /* options={{}} */ />
      )),
    []
  );

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync().catch(() => {
      });
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View
      style={{ flex: 1, backgroundColor: colors.background }}
      onLayout={onLayoutRootView}
    >
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        {stackScreens}
      </Stack>
    </View>
  );
}
