import { Button, HStack, Input, VStack } from "native-base";
import * as React from "react";
import { Image, SafeAreaView, Text, View } from "react-native";

export default function Wallet() {
  const [show, setShow] = React.useState(false);

  return (
    <SafeAreaView className=" space-y-6  ">
      <Text className="font-bold text-center text-2xl">Billetera</Text>
      <View className="bg-[#ffff] mx-5 rounded-lg">
        <HStack>
          <View className="bg-accent w-[3%] rounded-full my-3 ml-3">
            <Text></Text>
          </View>
          <Text className="text-[#464444] p-3 font-bold text-lg">
            Ingresar los detalles
          </Text>
        </HStack>
        <View className="w-72 mx-auto border-b border-[#AEACAC] mt-3"></View>
        <VStack>
          <View className="mt-4 ml-3">
            <Text className=" text-[#464444]">Metas a corto plazo</Text>
          </View>
          <View className="flex flex-row items-center p-4 border m-4 border-[#368983] rounded-xl">
            <Image
              className="w-7 h-7 mr-2"
              source={{
                uri: "https://img.icons8.com/?size=48&id=13013&format=png",
              }}
            />
            <Input
              size="sm"
              borderRadius={7}
              w={{
                base: "90%",
                md: "25%",
              }}
              placeholder="Ingresa el monto de meta de ahorro"
            />
          </View>
          <View className="flex flex-row items-center p-4 border m-4 border-[#368983] rounded-xl">
            <Image
              className="w-7 h-7 mr-2"
              source={{
                uri: "https://img.icons8.com/?size=80&id=TVHK3ohcpSmp&format=gif",
              }}
            />
            <Input
              size="sm"
              borderRadius={7}
              w={{
                base: "90%",
                md: "25%",
              }}
              placeholder="Ingresa la fecha limite de ahorro"
            />
          </View>
          <Button
            colorScheme="teal"
            className="rounded-full mb-4 ml-48"
            height={10}
            w={40}
            maxW="100px"
          >
            <Text className="font-semibold text-white ">Registrar</Text>
          </Button>
        </VStack>
      </View>
    </SafeAreaView>
  );
}
