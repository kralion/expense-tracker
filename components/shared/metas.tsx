import { Box, HStack, Pressable, Text, VStack } from "native-base";
import * as React from "react";
import { Image } from "react-native";
import { ISaving } from "../../interfaces/saving";
export function Metas({ metas }: { metas: ISaving }) {
  const { meta_ahorro, ahorro_actual } = metas;

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
          <Box mb={4} rounded={10} p={4} bg="coolGray.200">
            <HStack alignItems="center" justifyContent="space-between">
              <HStack space={2}>
                <Box className="rounded-full border-zinc-500">
                  <Image
                    width={40}
                    height={40}
                    source={{
                      uri: "https://img.icons8.com/?size=80&id=IxgyPdVjEhFa&format=png",
                    }}
                  />
                </Box>
                <VStack>
                  <Text className="font-semibold">Meta de ahorro:</Text>
                  <Text className="text-textmuted">Ahorros actuales:</Text>
                </VStack>
              </HStack>
              <VStack>
                <HStack justifyContent="space-between">
                  <Text className="text-black font-bold">
                    S/. {meta_ahorro}
                  </Text>
                </HStack>
                <HStack justifyContent="space-between">
                  <Text className=" text-text-muted">S/. {ahorro_actual}</Text>
                </HStack>
              </VStack>
            </HStack>
          </Box>
        );
      }}
    </Pressable>
  );
}
