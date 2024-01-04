import { Stack } from "expo-router";
import React from "react";

export default function ModalsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="export-data"
        options={{
          headerBackTitle: "Estadisticas",
          presentation: "card",
          title: "Exportar",
          contentStyle: {
            backgroundColor: "#368983",
          },
        }}
      />
      <Stack.Screen
        name="notifications"
        options={{
          headerBackTitle: "Perfil",
          presentation: "card",
          title: "Notificaciones",
          contentStyle: {
            backgroundColor: "#368983",
          },
        }}
      />
      <Stack.Screen
        name="membership"
        options={{
          presentation: "card",
          title: "",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="budget"
        options={{
          presentation: "card",
          title: "",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
