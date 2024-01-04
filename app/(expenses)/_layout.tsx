import { Stack } from "expo-router";
import React from "react";
import { Pressable, Text } from "react-native";

export default function ModalsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="details/[id]"
        options={{
          headerBackTitle: "Gastos",
          presentation: "card",
          title: "Detalles",
          contentStyle: {
            backgroundColor: "#368983",
          },
        }}
      />
      <Stack.Screen
        name="edit/[id]"
        options={{
          presentation: "card",
          headerBackTitle: "Editar Gasto",
          headerRight: () => (
            <Pressable className="active:opacity-50">
              <Text className="text-red-500 text-[17px]">Cancelar</Text>
            </Pressable>
          ),

          headerTitle: "Editar Gasto",
        }}
      />
    </Stack>
  );
}
