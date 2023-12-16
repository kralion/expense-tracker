import { Fontisto } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Button, Center, VStack, View } from "native-base";
import React from "react";
import { Image, Text } from "react-native";

export default function Yape() {
  return (
    <VStack space={5}>
      <VStack space={1}>
        <Text className="  text-teal-200 ">Numero de Telefono</Text>
        <Text className="font-semibold  text-white text-2xl ">
          +51 999 999 999
        </Text>
      </VStack>
      <VStack space={1}>
        <Text className=" text-teal-200 ">Monto</Text>
        <Text className="font-semibold  text-white text-2xl ">S/. 15.00</Text>
      </VStack>
      <VStack space={1}>
        <Text className="text-mutedwhite text-[12px] mt-3  ">
          El ultimo paso es mandarnos una captura del yapeo al telefono
          <Link asChild href={"/modal"}>
            <Text className="text-[12px] text-accent font-semibold">
              {" "}
              914 019 929
            </Text>
          </Link>
        </Text>
      </VStack>
    </VStack>
  );
}
