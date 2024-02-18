import { INotification } from "@/interfaces/notification";
import { Box, HStack, VStack } from "native-base";
import React from "react";
import { Image, Text, View } from "react-native";

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
      <Box borderColor="coolGray.300" rounded={10} p={1} bg={"white"}>
        <HStack alignItems="center" space={2} className="p-2 rounded-xl">
          <Image
            width={40}
            height={40}
            source={{
              uri: icono.uri,
            }}
          />
          <VStack space={2} flex={1}>
            <HStack justifyContent="space-between">
              <Text className="font-semibold ">{notification.titulo}</Text>
              <Text className="text-mute   text-xs">{formatDate(fecha)}</Text>
            </HStack>
            <Text className="text-textmuted text-xs ">{descripcion}</Text>
          </VStack>
        </HStack>
      </Box>
    </View>
  );
}
