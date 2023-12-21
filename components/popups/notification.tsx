import { INotification } from "@/interfaces/notification";
import { VStack, HStack, Box, Pressable } from "native-base";
import React from "react";
import { Text, Image } from "react-native";

export default function SingleNotification({
  notification,
}: {
  notification: INotification;
}) {
  const { descripcion, icono, fecha } = notification;
  return (
    <Pressable className="mx-3">
      {({ isHovered, isPressed }) => {
        return (
          <Box
            borderColor="coolGray.300"
            rounded={14}
            p={2}
            bg={
              isPressed ? "coolGray.200" : isHovered ? "coolGray.200" : "white"
            }
          >
            <HStack alignItems="center" className="p-2 rounded-xl">
              <Image
                className="w-10 h-10 mr-4"
                source={{
                  uri: icono.uri,
                }}
              />
              <VStack space={2} flex={1}>
                <HStack justifyContent="space-between">
                  <Text className="font-bold ">Premium</Text>
                  <Text className="text-mute   text-xs">
                    {fecha.toLocaleDateString() ===
                    new Date().toLocaleDateString()
                      ? fecha.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "Ayer"}
                  </Text>
                </HStack>
                <Text className="text-[#464444] ">{descripcion}</Text>
              </VStack>
            </HStack>
          </Box>
        );
      }}
    </Pressable>
  );
}
