import { Link } from "expo-router";
import { Box, HStack, Pressable, Spacer, Text } from "native-base";
import * as React from "react";
import { Image, View } from "react-native";
import { IGasto } from "../../interfaces";

export default function Expense({
  categoría,
  cantidad,
  fecha,
  assetIdentificador,
}: IGasto) {
  return (
    <Link href="/expense-details" asChild>
      <Pressable>
        {({ isHovered, isFocused, isPressed }) => {
          return (
            <Box
              maxW="96"
              borderColor="coolGray.300"
              rounded={14}
              p={2}
              bg={
                isPressed
                  ? "coolGray.200"
                  : isHovered
                  ? "coolGray.200"
                  : "coolGray.100"
              }
              style={{
                transform: [
                  {
                    scale: isPressed ? 0.96 : 1,
                  },
                ],
              }}
            >
              <HStack alignItems="center">
                <View className="flex-row gap-2  items-center">
                  <Box p={2} backgroundColor="gray.200" borderRadius={35}>
                    <Image
                      width={40}
                      height={40}
                      source={{
                        uri: assetIdentificador,
                      }}
                    />
                  </Box>
                  <View className="space-y-1">
                    <Text className=" text-[18px]  text-black font-bold">
                      {categoría}
                    </Text>
                    <Text className="text-muted text-[14px] ">
                      {fecha?.toLocaleString("es-PE", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                      })}
                    </Text>
                  </View>
                </View>
                <Spacer />
                <Text className=" text-xl text-red-500   font-bold">
                  S/. {cantidad.toFixed(2)}
                </Text>
              </HStack>
            </Box>
          );
        }}
      </Pressable>
    </Link>
  );
}
