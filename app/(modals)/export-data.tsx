import { FontAwesome } from "@expo/vector-icons";
import { Button, HStack, VStack } from "native-base";
import * as React from "react";
import { Alert, Image, Text, View } from "react-native";

export default function Export() {
  return (
    <View className="flex flex-col space-y-6 justify-between">
      <VStack space={1} className="bg-background rounded-b-lg py-4 px-7">
        <HStack>
          <View className="bg-accent w-2 h-8 rounded-full my-3 " />
          <Text className="text-[#464444] p-3 font-bold text-lg">
            Formatos de Exportación
          </Text>
        </HStack>

        <Text className=" text-[#464444]">
          Selecciona el tipo de documento en el que desea exportar su historial
          de gastos
        </Text>

        <VStack mt={10} space={4}>
          <HStack space={4}>
            <Button
              colorScheme="blue"
              variant="subtle"
              py={4}
              borderWidth={1}
              borderColor="blue.400"
              onPress={() =>
                Alert.alert("Exportación", "Se exportó correctamente")
              }
            >
              <HStack alignItems="center">
                <Image
                  className="w-5 h-5 mr-2"
                  source={{
                    uri: "https://img.icons8.com/?size=48&id=13674&format=png",
                  }}
                />
                <Text className="font-semibold text-black">Documento</Text>
              </HStack>
            </Button>

            <Button
              colorScheme="green"
              variant="subtle"
              py={4}
              borderWidth={1}
              borderColor="green.400"
              onPress={() =>
                Alert.alert("Exportación", "Se exportó correctamente")
              }
            >
              <HStack alignItems="center">
                <Image
                  className="w-5 h-5 mr-2"
                  source={{
                    uri: "https://img.icons8.com/?size=48&id=13654&format=png",
                  }}
                />
                <Text className="font-semibold text-black">
                  Hoja de Cálculo
                </Text>
              </HStack>
            </Button>
          </HStack>

          <Button
            colorScheme="red"
            variant="subtle"
            p={4}
            borderWidth={1}
            borderColor="red.400"
            onPress={() =>
              Alert.alert("Exportación", "Se exportó correctamente")
            }
          >
            <HStack alignItems="center">
              <Image
                className="w-5 h-5 mr-2"
                source={{
                  uri: "https://img.icons8.com/?size=48&id=13417&format=png",
                }}
              />
              <Text className="font-semibold text-black">Archivo PDF</Text>
            </HStack>
          </Button>
        </VStack>
        <Button
          className="rounded-lg  mt-14"
          height={10}
          endIcon={
            <FontAwesome
              name="download"
              color="white"
              marginRight={3}
              marginTop={2}
            />
          }
        >
          <Text
            className="font-semibold text-white"
            onPress={() =>
              Alert.alert("Exportación", "Se exportó correctamente")
            }
          >
            Exportar en los 3 formatos
          </Text>
        </Button>
      </VStack>
    </View>
  );
}
