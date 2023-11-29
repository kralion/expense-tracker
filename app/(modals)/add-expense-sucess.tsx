import {
  Alert,
  Badge,
  Box,
  Button,
  Center,
  Heading,
  Text,
  VStack,
} from "native-base";
import React from "react";
import { Image, ImageBackground, SafeAreaView } from "react-native";

export default function AddExpenseSuccesModal() {
  return (
    <ImageBackground
      source={{
        uri: "https://img.freepik.com/free-vector/wave-vector-abstract-background-flat-design-stock-illustration-vector-illustration_1142-13277.jpg?size=626&ext=jpg&ga=GA1.1.1574565953.1694553592&semt=sph",
      }}
      style={{ flex: 1, filter: "blur(20px)" }}
      className=" h-screen px-5 py-10"
    >
      <Center>
        <VStack
          background="white"
          className="shadow-md rounded-2xl"
          p={7}
          alignItems="center"
          space={5}
          w="100%"
        >
          <Box width={300} flexShrink={1} alignItems="center">
            <Image
              className="w-64 h-64 "
              source={require("../../assets/images/success.png")}
            />
          </Box>
          <Heading size="md">Registro Exitoso</Heading>
          <Text textAlign="center">
            Para mas detalles sobre este registro puedes revisar el historial de
            gastos.
          </Text>
          <Badge className="rounded-lg w-full py-4 bg-zinc-200">
            <Text className="font-bold text-xl">S/. 140.00</Text>
          </Badge>
          <Button className="rounded-full w-full py-4">
            <Text className=" font-semibold text-white">Aceptar</Text>
          </Button>
        </VStack>
      </Center>
    </ImageBackground>
  );
}
