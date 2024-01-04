import { FontAwesome5 } from "@expo/vector-icons";
import { Stack, router } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";

export default function ModalsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="export-data"
        options={{
          headerLeft: () => {
            return (
              <TouchableOpacity
                onPress={() => {
                  router.back();
                }}
              >
                <FontAwesome5 name="chevron-left" size={20} color="teal" />
              </TouchableOpacity>
            );
          },
          presentation: "card",
          title: "Exportar",
        }}
      />
      <Stack.Screen name="buy-premium" options={{ headerShown: false }} />

      <Stack.Screen
        name="notifications"
        options={{
          headerLeft: () => {
            return (
              <TouchableOpacity
                onPress={() => {
                  router.back();
                }}
              >
                <FontAwesome5 name="chevron-left" size={20} color="teal" />
              </TouchableOpacity>
            );
          },
          presentation: "card",
          title: "Notificaciones",
        }}
      />
      <Stack.Screen
        name="membership"
        options={{
          presentation: "card",
          title: "Membresía",
          headerLeft: () => {
            return (
              <TouchableOpacity
                onPress={() => {
                  router.back();
                }}
              >
                <FontAwesome5 name="chevron-left" size={20} color="teal" />
              </TouchableOpacity>
            );
          },
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
      <Stack.Screen
        name="personal-info"
        options={{
          headerLeft: () => {
            return (
              <TouchableOpacity
                onPress={() => {
                  router.back();
                }}
              >
                <FontAwesome5 name="chevron-left" size={20} color="teal" />
              </TouchableOpacity>
            );
          },
          presentation: "card",
          title: "Tus Datos",
        }}
      />
    </Stack>
  );
}
