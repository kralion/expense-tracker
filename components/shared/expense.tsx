import { router } from "expo-router";
import { Box, HStack, Pressable, Spacer, Text } from "native-base";
import * as React from "react";
import { Image, View } from "react-native";
import { IGasto } from "../../interfaces";
import { expensesIdentifiers } from "@/constants/ExpensesIdentifiers";
import { formatDate } from "@/helpers/dateFormatter";
export function Expense({ expense }: { expense: IGasto }) {
  const { categoria, monto, fecha } = expense;
  const formattedDate = fecha
    ? formatDate(new Date(fecha))
    : "No date provided";
  const assetIndentificador =
    expensesIdentifiers.find(
      (icon) => icon.label.toLowerCase() === expense.categoria.toLowerCase()
    )?.iconHref ||
    "https://img.icons8.com/?size=160&id=MjAYkOMsbYOO&format=png";

  return (
    <Pressable
      onPress={() => {
        router.push(`/(expenses)/details/${expense.id}`);
      }}
    >
      {({ isHovered, isPressed }) => {
        return (
          <Box
            margin={2}
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
                      uri: assetIndentificador,
                    }}
                  />
                </Box>
                <View className="space-y-1">
                  <Text className=" text-[18px]  text-black font-bold">
                    {categoria}
                  </Text>
                  <Text className="text-muted text-[14px] ">
                    {formattedDate}
                  </Text>
                </View>
              </View>
              <Spacer />
              <Text className=" text-xl text-red-500   font-bold">
                S/. {monto}
              </Text>
            </HStack>
          </Box>
        );
      }}
    </Pressable>
  );
}
