import {
  Badge,
  Box,
  Button,
  Center,
  Heading,
  Modal,
  Text,
  VStack,
} from "native-base";
import React from "react";
import { Image } from "react-native";

export default function AddExpenseSuccesModal({
  openModal,
  setOpenModal,
  expensePrice,
}: {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  expensePrice: string;
}) {
  return (
    <Modal
      _backdropFade={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
      background="white"
      animationPreset="slide"
      backdropVisible={true}
      size="xl"
      isOpen={openModal}
      onClose={() => setOpenModal(false)}
    >
      <Modal.Content rounded={30}>
        <Center>
          <VStack
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
              Para mas detalles sobre este registro puedes revisar el historial
              de gastos.
            </Text>
            <Badge className="rounded-lg w-full py-4 bg-zinc-200">
              <Text className="font-bold text-xl">S/. {expensePrice}</Text>
            </Badge>
            <Button
              onPress={() => setOpenModal(false)}
              className="rounded-full w-full py-4"
            >
              <Text className=" font-semibold text-white">Aceptar</Text>
            </Button>
          </VStack>
        </Center>
      </Modal.Content>
      /
    </Modal>
  );
}
