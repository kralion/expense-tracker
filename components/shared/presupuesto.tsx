import { Box, HStack, Pressable, Spacer, Text, VStack } from "native-base";
import * as React from "react";
import { Image, View } from "react-native";
import { IPresupuesto } from "../../interfaces/presupuesto";
export function Presupuesto({ presupuesto }: { presupuesto: IPresupuesto }) {
  const { monto, descripcion, fecha_registro, fecha_final } = presupuesto;

  return (
    <Pressable
      onPress={() => {
        alert(
          "Presupuesto: " +
            monto +
            "\n" +
            "Fecha Registro: " +
            fecha_registro +
            "\n" +
            "Fecha Final: " +
            fecha_final
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
                  <Text className="text-textmuted">Monto Actual</Text>
                  <Text className=" text-[16px] text-black font-bold">
                    S/. {monto}
                  </Text>
                </VStack>
              </HStack>
              <VStack space={1}>
                <HStack justifyContent="space-between"></HStack>
                <HStack justifyContent={"space-between"}>
                  <Text className="text-primary ">{fecha_registro}</Text>
                </HStack>
                <HStack justifyContent={"space-between"}>
                  <Text className="text-red-500 ">{fecha_final}</Text>
                </HStack>
              </VStack>
            </HStack>
          </Box>
        );
      }}
    </Pressable>
  );
}
