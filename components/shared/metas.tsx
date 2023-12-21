import { router } from "expo-router";
import { Box, HStack, Pressable, Spacer, Text } from "native-base";
import * as React from "react";
import { Image, View } from "react-native";
import { ISaving } from "../../interfaces/saving";
import { expensesIdentifiers } from "@/constants/ExpensesIdentifiers";
import { formatDate } from "@/helpers/dateFormatter";
export function Metas({ metas }: { metas: ISaving }) {
  const { meta_ahorro, ahorro_actual } = metas;
  const assetIndentificador =
    expensesIdentifiers.find(
      (icon) => Number(icon.label) === Number(metas.meta_ahorro)
    )?.iconHref ||
    "https://img.icons8.com/?size=160&id=64704&format=png";

  return (
    <Pressable
      onPress={() => {
        router.push(`/(expenses)/details/${metas.id}`);
      }}
    >
      {({ isHovered, isPressed }) => {
        return (
          <Box
            margin={2}
            borderColor="coolGray.300"
            rounded={14}
            p={2}
            bg="white"
          >
            <HStack alignItems="center">
              <View className="flex-row gap-2  items-center">
                <Box p={2} backgroundColor="green.200" borderRadius={35}>
                  <Image
                    width={40}
                    height={40}
                    source={{
                      uri: assetIndentificador,
                    }}
                  />
                </Box>
                <View className="space-y-1">
                  <View className="flex flex-row items-center space-x-24">
                    <Text>Meta de ahorro:</Text>
                    <Text className=" text-[18px] text-black font-bold">
                      {meta_ahorro}
                    </Text>
                  </View>
                  <View className="flex flex-row items-center space-x-24">
                    <Text>Ahorros actuales:</Text>                    
                    <Text className="text-[14px] ">
                      {ahorro_actual}
                    </Text>
                  </View>
                </View>
              </View>
              <Spacer />
              {/* <Text className=" text-xl text-red-500   font-bold">
                S/. {monto}
              </Text> */}
            </HStack>
          </Box>
        );
      }}
    </Pressable>
  );
}
