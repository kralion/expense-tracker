import { Box, HStack, Pressable, Spacer, Text, VStack } from "native-base";
import * as React from "react";
import { Image, View } from "react-native";
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
          <Box mb={4} rounded={14} p={3} bg="coolGray.200">
            <HStack alignItems="center" justifyContent="space-between">
              <HStack space={3}>
                <Box
                  className="border-[0.5px] border-zinc-500"
                  borderRadius={35}
                >
                  <Image
                    width={40}
                    height={40}
                    source={{
                      uri: "https://img.icons8.com/?size=80&id=IxgyPdVjEhFa&format=png",
                    }}
                  />
                </Box>
                <VStack space={1}>
                  <Text className="font-semibold">Meta de ahorro:</Text>
                  <Text className="text-textmuted">Ahorros actuales:</Text>
                </VStack>
              </HStack>
              <VStack space={1}>
                <HStack justifyContent="space-between">
                  <Text className=" text-[16px] text-black font-bold">
                    S/. {meta_ahorro}
                  </Text>
                </HStack>
                <HStack justifyContent={"space-between"}>
                  <Text className="text-[14px] ">S/. {ahorro_actual}</Text>
                </HStack>
              </VStack>
            </HStack>
          </Box>
        );
      }}
    </Pressable>
  );
}
