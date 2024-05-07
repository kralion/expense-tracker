import { ISaving } from "@/interfaces/saving";
import { Image } from "expo-image";
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
export function Metas({ metas }: { metas: ISaving }) {
  const { meta_ahorro, id, ahorro_actual, presupuesto_id } = metas;
  const [openBudgetDetails, setOpenBudgetDetails] = React.useState(false);
  function openModal() {
    setOpenBudgetDetails(true);
  }
  return (
    <Pressable onPress={() => openModal()}>
      {({ isPressed }) => {
        return (
          <>
            <Box
              my={2}
              p={4}
              rounded={10}
              bg={isPressed ? "white" : "coolGray.100"}
            >
              <HStack alignItems="center" justifyContent="space-between">
                <HStack space={3} alignItems="center">
                  <Image
                    source={{
                      uri: "https://img.icons8.com/?size=48&id=ek6vl8DEBehk&format=png",
                    }}
                    style={{
                      width: 40,
                      height: 40,
                    }}
                  />

                  <VStack>
                    <Text className="font-semibold">Meta de ahorro </Text>
                    <Text className="text-mute">Identificador </Text>
                  </VStack>
                </HStack>
                <VStack>
                  <HStack justifyContent="space-between">
                    <Text className="text-black font-bold">
                      S/. {meta_ahorro}
                    </Text>
                  </HStack>
                  <HStack justifyContent="space-between">
                    <Text className=" text-textmuted">{id?.split("-")[0]}</Text>
                  </HStack>
                </VStack>
              </HStack>
            </Box>
            <Modal
              isOpen={openBudgetDetails}
              onClose={() => setOpenBudgetDetails(false)}
              safeAreaTop={true}
              size="xl"
            >
              <Modal.Content rounded={10}>
                <Modal.Header>Detalles de la Meta de Ahorro</Modal.Header>
                <Modal.Body>
                  <VStack space={3}>
                    <VStack>
                      <Text className="font-bold">Monto</Text>
                      <Text>S/. {meta_ahorro}</Text>
                    </VStack>
                    <VStack>
                      <Text className="font-bold">Ahorraste hasta ahora</Text>
                      <Text>{ahorro_actual}</Text>
                    </VStack>
                    <VStack>
                      <Text className="font-bold">El presupuesto vence en</Text>
                      <Text>{presupuesto_id}</Text>
                    </VStack>
                    <VStack>
                      <Text className="font-bold">Descripción</Text>
                      <Text>{presupuesto_id}</Text>
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
