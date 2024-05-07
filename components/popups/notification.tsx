import { INotification } from "@/interfaces/notification";
import { Box, HStack, VStack } from "native-base";
import React from "react";
import { Image, Text } from "react-native";

const iconos = {
  INFO: "https://img.icons8.com/?size=48&id=63308&format=png",
  WARNING: "https://img.icons8.com/?size=48&id=12116&format=png",
  ERROR: "https://img.icons8.com/?size=48&id=12226&format=png",
};

export default function SingleNotification({
  notification,
}: {
  notification: INotification;
}) {
  const { descripcion, fecha } = notification;
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
    <Box
      className="m-3"
      borderColor="coolGray.300"
      rounded={7}
      p={1}
      bg={"white"}
    >
      <HStack alignItems="center" space={2} className="p-2 rounded-xl">
        <Image
          width={40}
          height={40}
          source={{
            uri:
              notification.tipo === "INFO"
                ? iconos.INFO
                : notification.tipo === "WARNING"
                ? iconos.WARNING
                : iconos.ERROR,
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
  );
}
