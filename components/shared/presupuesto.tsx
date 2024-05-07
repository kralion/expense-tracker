import {
  Box,
  Button,
  HStack,
  Modal,
  Pressable,
  Text,
  VStack,
} from "native-base";
import * as React from "react";
import { Image } from "react-native";
import { IPresupuesto } from "../../interfaces/presupuesto";
export function Presupuesto({ presupuesto }: { presupuesto: IPresupuesto }) {
  const { monto, descripcion, fecha_registro, fecha_final } = presupuesto;
  const [openBudgetDetails, setOpenBudgetDetails] = React.useState(false);
  const formattedFechaRegistro = fecha_registro
    ? new Date(fecha_registro).toLocaleDateString("es-ES", {
        year: "2-digit",
        month: "numeric",
        day: "numeric",
      })
    : "";
  const formattedFechaFinal = fecha_final
    ? new Date(fecha_final).toLocaleDateString("es-ES", {
        year: "2-digit",
        month: "numeric",
        day: "numeric",
      })
    : "";

  function openModal() {
    setOpenBudgetDetails(true);
  }

  return (
    <Pressable onPress={() => openModal()}>
      {({ isPressed }) => {
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
                  <Box className="rounded-full ">
                    <Image
                      width={40}
                      height={40}
                      source={{
                        uri: "https://img.icons8.com/?size=48&id=WXSGKqvop1Fo&format=gif",
                      }}
                    />
                  </Box>
                  <VStack space={1}>
                    <Text className="text-textmuted">Periodo</Text>
                    <HStack space={1}>
                      <Text className="text-xs">
                        {formattedFechaRegistro} -
                      </Text>
                      <Text className="text-xs">{formattedFechaFinal}</Text>
                    </HStack>
                  </VStack>
                </HStack>

                <Text className=" text-black font-bold">S/. {monto}</Text>
              </HStack>
            </Box>
            <Modal
              isOpen={openBudgetDetails}
              onClose={() => setOpenBudgetDetails(false)}
              safeAreaTop={true}
              size="xl"
            >
              <Modal.Content rounded={10}>
                <Modal.Header>Detalles del Presupuesto</Modal.Header>
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
                      rounded={10}
                      onPress={() => {
                        alert("La funcionalidad aun no esta disponible");
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
