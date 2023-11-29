import { Stack } from "expo-router";
import React from "react";
import { Pressable, Text } from "react-native";

export default function ModalsLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(modals)/buy-premium"
        options={{
          presentation: "modal",
          title: "",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(modals)/edit-payment-info
                "
        options={{ presentation: "modal", title: "Editar" }}
      />

      <Stack.Screen
        name="(modals)/add-expense-success
            "
        options={{ presentation: "modal", title: "Agregar Gasto" }}
      />
      <Stack.Screen
        name="(expenses)/edit/12"
        options={{
          presentation: "card",
          headerBackTitle: "Detalles",
          headerRight: () => (
            <Pressable className="active:opacity-50">
              <Text className="text-red-500 text-[17px]">Cancelar</Text>
            </Pressable>
          ),

          title: ` Detalles del Gasto
          1 `,
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
      <Stack.Screen
        name="(modals)/add-expense-success"
        options={{
          headerBackTitle: "Perfil",
          presentation: "modal",
          headerLeft: () => (
            <Pressable className="active:opacity-50">
              <Text className="text-red-500 text-[17px]">Hecho</Text>
            </Pressable>
          ),

          title: "",
          contentStyle: {
            backgroundColor: "#368983",
          },
        }}
      />
    </Stack>
  );
}
