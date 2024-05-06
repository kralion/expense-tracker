import { Feather } from "@expo/vector-icons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { HStack } from "native-base";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

export default function ModalsLayout() {
  const params = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen
        name="details/[id]"
        options={{
          title: "",
          headerLeft: () => {
            return (
              <TouchableOpacity
                onPress={() => {
                  router.back();
                }}
              >
                <HStack alignItems="center">
                  <Feather name="chevron-left" size={24} color="#3b82f6" />
                  <Text className="text-action text-[17px]">Gastos</Text>
                </HStack>
              </TouchableOpacity>
            );
          },
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                router.push(`/edit/${params.id}`);
              }}
            >
              <Text className="text-blue-500 text-[17px] pr-2">Editar</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="edit/[id]"
        options={{
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                router.back();
              }}
            >
              <HStack alignItems="center">
                <Feather name="chevron-left" size={24} color="#3b82f6" />
                <Text className="text-action text-[17px]">Detalles</Text>
              </HStack>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Text className="text-red-500 text-[17px] pr-2">Cancelar</Text>
            </TouchableOpacity>
          ),

          headerTitle: "",
        }}
      />
    </Stack>
  );
}
