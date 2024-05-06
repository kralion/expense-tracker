import {
  Box,
  Button,
  HStack,
  Modal,
  Pressable,
  Spacer,
  Text,
  VStack,
} from "native-base";
import * as React from "react";
import { Alert, Image, View } from "react-native";
import { IPresupuesto } from "../../interfaces/presupuesto";
import { FontAwesome5 } from "@expo/vector-icons";
export function Presupuesto({ presupuesto }: { presupuesto: IPresupuesto }) {
  const { monto, descripcion, fecha_registro, fecha_final } = presupuesto;
  const [openBudgetDetails, setOpenBudgetDetails] = React.useState(false);

  function openModal() {
    setOpenBudgetDetails(true);
  }

  return (
    <Pressable onPress={() => openModal()}>
      {({ isHovered, isPressed }) => {
        return (
          <>
            <Box
              bg={isPressed ? "white" : "coolGray.100"}
              rounded={10}
              p={4}
              my={2}
            >
              <HStack justifyContent="space-between" alignItems="center">
                <HStack space={3} alignItems="center">
                  <Box className="rounded-full">
                    <Image
                      width={40}
                      height={40}
                      source={{
                        uri: "https://img.icons8.com/?size=80&id=IxgyPdVjEhFa&format=png",
                      }}
                    />
                  </Box>
                  <Text className="text-textmuted text-xs w-1/2">
                    Monto Mensual Presupuestado
                  </Text>
                </HStack>
                <Text className=" text-black font-bold">S/. {monto}</Text>
              </HStack>
            </Box>
            <Modal
              isOpen={openBudgetDetails}
              onClose={() => setOpenBudgetDetails(false)}
              safeAreaTop={true}
            >
              <Modal.Content rounded={10} padding={3}>
                <Modal.Header className=" flex justify-center items-center">
                  Detalles del Presupuesto
                </Modal.Header>
                <Modal.Body>
                  <VStack space={3}>
                    <VStack>
                      <Text className="font-bold">Monto</Text>
                      <Text>S/. {monto}</Text>
                    </VStack>
                    <VStack>
                      <Text className="font-bold">Fecha de Registro</Text>
                      <Text>{fecha_registro}</Text>
                    </VStack>
                    <VStack>
                      <Text className="font-bold">Fecha Final Propuesta</Text>
                      <Text>{fecha_final}</Text>
                    </VStack>
                    <VStack>
                      <Text className="font-bold">Descripción</Text>
                      <Text>{descripcion}</Text>
                    </VStack>
                  </VStack>
                </Modal.Body>
                <Modal.Footer>
                  <Button.Group space={2}>
                    <Button
                      variant="ghost"
                      colorScheme="blueGray"
                      onPress={() => {
                        setOpenBudgetDetails(false);
                      }}
                    >
                      Cerrar
                    </Button>
                    <Button
                      rounded={5}
                      onPress={() => {
                        alert("La funcionalidad aun no esta disponible");
                        setOpenBudgetDetails(false);
                      }}
                    >
                      Editar
                    </Button>
                  </Button.Group>
                </Modal.Footer>
              </Modal.Content>
            </Modal>
          </>
        );
      }}
    </Pressable>
  );
}
