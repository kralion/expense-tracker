import { NativeBaseProvider, extendTheme } from "native-base";
import React from "react";
import { View } from "react-native";
import NavBar from "./navbar";

export default function AppLayout({ children }) {
  const theme = extendTheme({
    colors: {
      // Add new color
      primary: {
        50: "#E3F2F9",
        100: "#C5E4F3",
        200: "#A2D4EC",
        300: "#7AC1E4",
        400: "#47A9DA",
        500: "#368983",
        600: "#007AB8",
        700: "#006BA1",
        800: "#005885",
        900: "#003F5E",
      },
      // Redefining only one shade, rest of the color will remain same.
      amber: {
        400: "#d97706",
      },
    },
  });
  return (
    <NativeBaseProvider theme={theme}>
      <View className="flex bg-slate-100 flex-col justify-between ">
        {children}
      </View>
      <NavBar />
    </NativeBaseProvider>
  );
}
