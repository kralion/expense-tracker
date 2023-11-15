import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Link, SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { Pressable, View, useColorScheme, Text } from "react-native";
import { NativeBaseProvider } from "native-base";
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";
import * as React from "react";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
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
  const colorScheme = useColorScheme();

  return (
    <NativeBaseProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        {/* <Stack>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        </Stack> */}
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="(modals)/buy-premium"
            options={{
              presentation: "modal",
              title: "",
              headerBackground: () => (
                <View className="bg-primary" style={{ flex: 1 }} />
              ),
            }}
          />
          <Stack.Screen
            name="(modals)/expense-details"
            options={{
              presentation: "card",
              headerBackTitle: "Gastos",
              headerRight: () => (
                <Link
                  href="/(modals)/expense-edit"
                  className="active:opacity-70"
                >
                  <Text className="text-blue-500 text-[17px]">Editar</Text>
                </Link>
              ),

              title: "Detalles del Gasto",
            }}
          />
          <Stack.Screen
            name="(modals)/add-expense-success
            "
            options={{ presentation: "modal", title: "Agregar Gasto" }}
          />
          <Stack.Screen
            name="(modals)/expense-edit"
            options={{
              presentation: "formSheet",
              title: "Editar Gasto ",
              contentStyle: {
                backgroundColor: "#368983",
              },
            }}
          />
          <Stack.Screen
            name="(modals)/export-data"
            options={{
              headerBackTitle: "Perfil",
              presentation: "card",

              title: "Exportar",
              contentStyle: {
                backgroundColor: "#368983",
              },
            }}
          />
        </Stack>
      </ThemeProvider>
    </NativeBaseProvider>
  );
}
