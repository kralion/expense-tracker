import { INotification } from "@/interfaces/notification";
import { VStack, HStack, Box, Pressable } from "native-base";
import React from "react";
import { Text, Image, View } from "react-native";

export default function SingleNotification({
  notification,
}: {
  notification: INotification;
}) {
  const { descripcion, icono, fecha } = notification;
  const formatDate = (fecha: string) => {
    const date = new Date(fecha);
    const today = new Date();

    const isToday =
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();

    const isYesterday =
      date.getDate() === today.getDate() - 1 &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();

    if (isToday) {
      return "hoy";
    } else if (isYesterday) {
      return "ayer";
    } else {
      return date.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    }
  };
  return (
    <View className="mx-3 my-2">
      <Box borderColor="coolGray.300" rounded={14} p={2} bg={"white"}>
        <HStack alignItems="center" className="p-2 rounded-xl">
          <Image
            className="w-10 h-10 mr-4"
            source={{
              uri: icono.uri,
            }}
          />
          <VStack space={2} flex={1}>
            <HStack justifyContent="space-between">
              <Text className="font-bold ">{notification.titulo}</Text>
              <Text className="text-mute   text-xs">{formatDate(fecha)}</Text>
            </HStack>
            <Text className="text-[#464444] ">{descripcion}</Text>
          </VStack>
        </HStack>
      </Box>
    </View>
  );
}
