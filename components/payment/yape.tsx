import { Badge, VStack } from "native-base";
import React from "react";
import { Text } from "react-native";

export default function Yape() {
  return (
    <VStack className="bg-white rounded-lg" p={5} space={5}>
      <VStack space={2}>
        <Text className="  text-textmuted ">Numero de Telefono</Text>
        <Badge className="rounded-lg p-3 ">
          <Text className="font-semibold ">+51 910 219 517</Text>
        </Badge>
      </VStack>
      <VStack space={2}>
        <Text className=" text-textmuted ">Monto</Text>
        <Badge className="rounded-lg p-3">
          <Text className="font-semibold  ">S/. 15.00</Text>
        </Badge>
      </VStack>
      <Text className="text-textmuted text-[12px] mt-3  ">
        El ultimo paso es mandarnos una captura del yapeo al telefono
        <Text className="text-[12px] text-lime-600 font-semibold">
          {" "}
          914 019 929
        </Text>
      </Text>
    </VStack>
  );
}
