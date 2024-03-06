import { Badge, VStack } from "native-base";
import React from "react";
import { Text } from "react-native";

export default function Yape() {
  return (
    <VStack className="bg-white rounded-lg" p={5} space={5}>
      <VStack space={2}>
        <Text className="  text-textmuted ">Número de Teléfono</Text>
        <Badge className="rounded-lg p-3 ">
          <Text className="font-semibold ">+51 914 019 629</Text>
        </Badge>
      </VStack>
      <VStack space={2}>
        <Text className=" text-textmuted ">Monto</Text>
        <Badge className="rounded-lg p-3">
          <Text className="font-semibold  ">S/. 15.00</Text>
        </Badge>
      </VStack>
      <Text className="text-textmuted text-[12px] mt-3  ">
        El último paso es mandarnos una captura del yapeo a este número
        <Text className="text-[12px] text-lime-600 font-semibold">
          {" "}
          914 019 929
        </Text>
      </Text>
    </VStack>
  );
}
