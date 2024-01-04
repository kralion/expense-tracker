import useAuth, { AuthProvider } from "@/context/AuthContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { NativeBaseProvider, extendTheme } from "native-base";
import * as React from "react";
import { useEffect } from "react";
export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(auth)",
};
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });
  const theme = extendTheme({
    colors: {
      primary: {
        600: "#10828D", // Primary (default) color
        800: "#387682", // Active color
      },
      accent: {
        600: "#A3E062",
        800: "#75934C",
      },

      amber: {
        400: "#d97706",
      },
    },
    config: {
      initialColorMode: "light",
    },
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <NativeBaseProvider theme={theme}>
        <RootLayoutNav />
      </NativeBaseProvider>
    </AuthProvider>
  );
}

function RootLayoutNav() {
  return (
    <Stack>
      <Stack.Screen
        name="(auth)"
        options={{
          headerShown: false,
          title: "",
        }}
      />
      <Stack.Screen name="(tabs)" options={{ headerShown: false, title: "" }} />
      <Stack.Screen
        name="(modals)"
        options={{ headerShown: false, title: "" }}
      />
      <Stack.Screen
        name="(expenses)"
        options={{ headerShown: false, title: "" }}
      />
    </Stack>
  );
}
