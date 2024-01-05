import { AntDesign } from "@expo/vector-icons";
import { Image } from "expo-image";
import { HStack, ScrollView, VStack } from "native-base";
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
          <Text className="text-sm text-textmuted">
            Facturacion :
            <Text className="text-sm font-semibold text-textmuted"> 20/12</Text>
          </Text>
        </VStack>
      </HStack>
      <VStack className="bg-white rounded-xl">
        <HStack className="bg-teal-300/50 p-4" space={2} alignItems="center">
          <AntDesign name="infocirlceo" size={24} color="teal" />
          <Text className="text-sm font-semibold  text-teal-500">
            Informacion Detallada
          </Text>
        </HStack>
        <VStack
          className="p-4"
          space={3}
          style={{
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.01,
          }}
        >
          <Text className="text-sm mb-3 text-slate-500">
            Esta información es de caracter informativo y no puede ser editada o
            modificada. Se cauteloso con la información que compartas.
          </Text>

          <Text className="text-sm font-semibold  ">
            TimeStamp : 12/12/2023 - 12:00
          </Text>
          <HStack space={2}>
            <Text className="text-sm text-slate-500">Codigo :</Text>
            <Text className="text-sm  ">154adf6</Text>
          </HStack>
          <HStack space={2}>
            <Text className="text-sm text-slate-500">Owner de la cuenta :</Text>
            <Text className="text-sm  ">Miguel Angel</Text>
          </HStack>
          <HStack space={2}>
            <Text className="text-sm text-slate-500">Facturación Actual :</Text>
            <Text className="text-sm">15 USD / mes</Text>
          </HStack>
        </VStack>
      </VStack>
    </ScrollView>
  );
}
