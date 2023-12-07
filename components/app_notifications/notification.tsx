import { VStack, HStack, Box, Pressable } from "native-base";
import React from "react";
import { Text, Image } from "react-native";

export default function SingleNotification() {
  return (
    <Pressable className="mx-2.5">
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
                  uri: "https://img.icons8.com/?size=96&id=j0S9ltkvGe8K&format=gif",
                }}
              />
              <VStack space={2} maxWidth={350}>
                <HStack justifyContent="space-between">
                  <Text className="font-bold ">Premium</Text>
                  <Text className="text-mute   text-xs">6:30 AM</Text>
                </HStack>
                <Text className="text-[#464444] ">
                  ¡Felicidades! Tu solicitud ha sido aprobada, ahora tienes
                  acceso al plan premium.
                </Text>
              </VStack>
            </HStack>
          </Box>
        );
      }}
    </Pressable>
  );
}
