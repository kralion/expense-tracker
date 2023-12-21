import { Badge, VStack } from "native-base";
import React from "react";
import { Text } from "react-native";

export default function Yape() {
  return (
    <VStack space={5}>
      <VStack space={2} p={5} className="bg-white rounded-lg">
        <Text className="  text-textmuted ">Numero de Telefono</Text>
        <Badge colorScheme="amber" className="rounded-full p-3">
          <Text className="font-semibold  ">+51 999 999 999</Text>
        </Badge>
      </VStack>
      <VStack space={1}>
        <Text className=" text-textmuted ">Monto</Text>
        <Badge colorScheme="amber" className="rounded-full p-3">
          <Text className="font-semibold ">S/. 15.00</Text>
        </Badge>
      </VStack>
      <Text className="text-textmuted text-[12px] mt-3  ">
        El ultimo paso es mandarnos una captura del yapeo al telefono
        <Text className="text-[12px] text-accent font-semibold">
          {" "}
          914 019 929
        </Text>
      </Text>
    </VStack>
  );
}
