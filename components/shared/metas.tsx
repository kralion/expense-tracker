import { Box, Divider, HStack, Pressable, Text, VStack } from "native-base";
import * as React from "react";
import { ISaving } from "../../interfaces/saving";
import { Image } from "expo-image";
export function Metas({ metas }: { metas: ISaving }) {
  const { meta_ahorro, id, ahorro_actual } = metas;

  return (
    <Pressable
      onPress={() => {
        alert(
          "Meta de ahorro: " +
            meta_ahorro +
            "\n" +
            "Ahorro actual: " +
            ahorro_actual
        );
      }}
    >
      {({ isHovered, isPressed }) => {
        return (
          <Box mb={4} rounded={10} bg="coolGray.200">
            <HStack alignItems="center" justifyContent="space-between">
              <HStack space={2}>
                <Box
                  p={2}
                  className="rounded-full flex justify-center items-center "
                >
                  <Image
                    source={{
                      uri: "https://img.icons8.com/?size=80&id=UNnue1nN3EPg&format=png",
                    }}
                    style={{
                      width: 40,
                      height: 40,
                    }}
                  />
                </Box>
                <Divider
                  orientation="vertical"
                  color="teal.600"
                  className="bg-background w-[2px] h-[74px] rounded-full"
                />
                <VStack p={4}>
                  <Text className="font-semibold">Meta de ahorro </Text>
                  <Text className="text-mute">Identificador </Text>
                </VStack>
              </HStack>
              <VStack p={4}>
                <HStack justifyContent="space-between">
                  <Text className="text-black font-bold">
                    S/. {meta_ahorro}
                  </Text>
                </HStack>
                <HStack justifyContent="space-between">
                  <Text className=" text-textmuted">{id?.split("-")[0]}</Text>
                </HStack>
              </VStack>
            </HStack>
          </Box>
        );
      }}
    </Pressable>
  );
}
