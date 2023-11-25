import { MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Button, Center, VStack, View } from "native-base";
import React from "react";
import { Image, Text } from "react-native";

export default function Yape() {
  return (
    <VStack space={2}>
      <Text className=" font-semibold text-white ">Numero de Telefono</Text>
      <View className="bg-white p-3 rounded-md">
        <Text className="font-semibold  text-textmuted ">+51 999 999 999</Text>
      </View>
      <Text className=" font-semibold text-white ">Monto</Text>
      <View className="bg-white p-3 rounded-md">
        <Text className="font-semibold  text-textmuted ">S/. 15.00</Text>
      </View>
      <Text className="text-mutedwhite text-[12px] mt-3  ">
        El ultimo paso es mandarnos una captura del yapeo al telefono
        <Link asChild href={"/modal"}>
          <Text className="text-[12px] text-accent font-semibold">
            {" "}
            914 019 929
          </Text>
        </Link>
      </Text>
      <Text className="text-mutedwhite text-[12px] ">
        El plan se activará en cuanto recibamos el pago, puedes cancelarlo
        cuando quieras.
      </Text>
      <Center>
        <Button
          marginTop={10}
          height={12}
          rounded={7}
          width={150}
          colorScheme="purple"
          endIcon={
            <MaterialIcons name="arrow-forward-ios" size={20} color="#fff" />
          }
        >
          <Image
            className="scale-[0.2]"
            source={require("../../assets/yape-logo.png")}
          />
        </Button>
      </Center>
    </VStack>
  );
}
