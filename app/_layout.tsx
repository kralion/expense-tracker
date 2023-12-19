import { supabase } from "@/utils/supabase";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Session } from "@supabase/supabase-js";
import { useFonts } from "expo-font";
import { SplashScreen, Stack, router } from "expo-router";
import { NativeBaseProvider, extendTheme } from "native-base";
import * as React from "react";
import { useEffect } from "react";
export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
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

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const [session, setSession] = React.useState<Session | null>(null);

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  React.useEffect(() => {
    if (!session) {
      router.push("/(auth)/");
    }
  }, [session]);

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

  return (
    <NativeBaseProvider theme={theme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="(modals)/buy-premium.tsx)"
          options={{
            presentation: "transparentModal",
            animation: "fade",
            title: "",
            headerShown: false,
          }}
        />
      </Stack>
    </NativeBaseProvider>
  );
}
