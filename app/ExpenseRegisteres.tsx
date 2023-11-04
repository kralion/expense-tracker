import {
  Alert,
  Box,
  Button,
  Center,
  Heading,
  NativeBaseProvider,
  Text,
  VStack,
} from "native-base";
import React from "react";
import { Image, SafeAreaView } from "react-native";

export default function ExpenseRegistered() {
  return (
    <NativeBaseProvider>
      <SafeAreaView className="bg-primary h-screen">
        <Center>
          <Alert
            borderRadius={20}
            maxW="400"
            colorScheme="white"
            backgroundColor="white"
            w="90%"
            h="90%"
            shadow="2xl"
          >
            <VStack alignItems="center" space={5} flexShrink={1} w="100%">
              <Box width={300} flexShrink={1} alignItems="center">
                <Image
                  className="w-64 h-64 "
                  source={require("../assets/images/success-asset.png")}
                />
              </Box>
              <Heading size="md">Registro Exitoso</Heading>
              <Text textAlign="center" px={12}>
                <Text className="font-bold" px={2}>
                  S/. 50.99{" "}
                </Text>
                nuevos soles registrados en tu historial de gastos
              </Text>
              <Button colorScheme="teal" className="rounded-full" width={40}>
                <Text className=" font-semibold text-white">Aceptar</Text>
              </Button>
            </VStack>
          </Alert>
        </Center>
      </SafeAreaView>
    </NativeBaseProvider>
  );
}
