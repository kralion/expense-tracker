import { AntDesign } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Badge, HStack, ScrollView, VStack } from "native-base";
import React from "react";
import { Text, View } from "react-native";

export default function Membership() {
  return (
    <ScrollView className="p-5 space-y-5 mt-1">
      <HStack space={2} alignItems="start">
        <View className="bg-teal-500/20 rounded-lg p-3">
          <Image
            style={{
              width: 50,
              height: 50,
              resizeMode: "contain",
            }}
            source={require("../../assets/icon.png")}
          />
        </View>
        <VStack space={0.5} alignItems="start">
          <Text className="text-xl font-bold">Plan Básico</Text>

          <Text className="text-sm text-textmuted">
            Adquisición : 12/12/2023
          </Text>
          <Text className="text-sm ">
            Facturacion :<Text className="text-sm font-semibold"> 20/12</Text>
          </Text>
        </VStack>
      </HStack>
      <VStack className="bg-white" borderRadius={10}>
        <HStack
          className="bg-teal-300/50 p-4"
          borderTopRadius={10}
          space={2}
          alignItems="center"
        >
          <AntDesign name="infocirlceo" size={24} color="teal" />
          <Text className="text-sm font-semibold  text-teal-700">
            Informacion del Plan
          </Text>
        </HStack>
        <VStack className="p-4" space={3}>
          <Text className="text-sm mb-3 text-mute">
            Esta información es de caracter informativo y no puede ser editada o
            modificada. Se cauteloso con la información que compartas.
          </Text>

          <Text className="text-sm font-semibold  ">
            Fecha Adquirida : 12/12/2023 - 12:00
          </Text>
          <HStack space={2}>
            <Text className="text-sm text-slate-500">Código :</Text>
            <Text className="text-sm  ">154adf6</Text>
          </HStack>
          <HStack space={2}>
            <Text className="text-sm text-slate-500">Propietario :</Text>
            <Text className="text-sm  ">Miguel Angel</Text>
          </HStack>
          <HStack space={2} alignItems="center">
            <Text className="text-sm text-slate-500">Facturación Actual :</Text>
            <Badge className="text-sm" borderRadius={5} colorScheme="teal">
              15.00 PEN / mes
            </Badge>
          </HStack>
        </VStack>
      </VStack>
    </ScrollView>
  );
}
