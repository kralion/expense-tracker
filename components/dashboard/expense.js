import React from "react";
import { Pressable, Box, Spacer, Badge, HStack, Text, Flex } from "native-base";
import { Image, View } from "react-native";

export default function Expense() {
  return (
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
                <Image
                  width={50}
                  height={50}
                  source={{
                    uri: "https://img.icons8.com/?size=160&id=Q2m4bLp5g5kF&format=png",
                  }}
                />
                <View className="space-y-1">
                  <Text className=" text-[18px]   font-bold">taxi</Text>
                  <Text className="text-muted text-[14px] ">en la mañana</Text>
                </View>
              </View>
              <Spacer />
              <Text className=" text-xl text-red-500   font-bold">S/. 15</Text>
            </HStack>
          </Box>
        );
      }}
    </Pressable>
  );
}
