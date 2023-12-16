import { router } from "expo-router";
import { Box, HStack, Pressable, Spacer, Text } from "native-base";
import * as React from "react";
import { Image, View } from "react-native";
import { IGasto } from "../../interfaces";

export function Expense(expense: IGasto) {
  return (
    <Pressable
      onPress={() => {
        router.push(`/(expenses)/details/${expense.id}`);
      }}
    >
      {({ isHovered, isPressed }) => {
        return (
          <Box
            marginX={2}
            borderColor="coolGray.300"
            rounded={14}
            p={2}
            bg={
              isPressed ? "white" : isHovered ? "coolGray.200" : "coolGray.100"
            }
          >
            <HStack alignItems="center">
              <View className="flex-row gap-2  items-center">
                <Box p={2} backgroundColor="gray.200" borderRadius={35}>
                  <Image
                    width={40}
                    height={40}
                    source={{
                      uri: expense.assetIdentificador,
                    }}
                  />
                </Box>
                <View className="space-y-1">
                  <Text className=" text-[18px]  text-black font-bold">
                    {expense.categoria}
                  </Text>
                  <Text className="text-muted text-[14px] ">
                    {expense.fecha?.toLocaleString("es-PE", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}
                  </Text>
                </View>
              </View>
              <Spacer />
              <Text className=" text-xl text-red-500   font-bold">
                S/. {expense.monto}
              </Text>
            </HStack>
          </Box>
        );
      }}
    </Pressable>
  );
}
