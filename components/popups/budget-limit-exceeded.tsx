import { FontAwesome } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Button, HStack, Modal, Text, VStack } from "native-base";
import * as React from "react";

type TNotification = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  showModal: boolean;
};

export function BudgetLimitExceededModal({
  setShowModal,
  showModal,
}: TNotification) {
  return (
    <Modal
      isOpen={showModal}
      _backdropFade={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
      animationPreset="slide"
      backdropVisible={true}
      size="xl"
      onClose={() => setShowModal(false)}
    >
      <Modal.Content rounded={30} className="p-5 bg-white">
        <Modal.CloseButton rounded={15} />
        <Modal.Body className="space-y-10">
          <VStack space={7} alignItems="center">
            <Image
              style={{
                width: 200,
                height: 300,
              }}
              source={require("../../assets/images/budget-limit.png")}
              alt="BudgetLimit"
            />
            <Text className=" font-bold text-2xl ">Presupuesto Excedido</Text>
            <Text className="text-[16px] text-center">
              Parece que ya has gastado todo el monto presupuesto para este mes.
            </Text>
          </VStack>
          <VStack space={3}>
            <Text className="font-semibold">
              Te recomendamos lo siguiente :
            </Text>
            <VStack space={2}>
              <HStack space={2} alignItems="center">
                <FontAwesome color="#10828D" name="lightbulb-o" size={15} />
                <Text>Revisar tus gastos frecuentes</Text>
              </HStack>
              <HStack space={2} alignItems="center">
                <FontAwesome color="#10828D" name="lightbulb-o" size={15} />
                <Text>Actualizar tu presupuesto a uno nuevo</Text>
              </HStack>
            </VStack>
            <Button
              className="w-full mt-10 rounded-full"
              height={12}
              variant="solid"
              onPress={() => {
                setShowNotification(false), router.push("/(tabs)/statistics");
              }}
            >
              <Text className="font-semibold text-white ">
                Ver Estadísticas
              </Text>
            </Button>
            <Text className="text-red-500 text-xs">
              Por ahora no podrás agregar mas gastos a tu{" "}
              <Text className="underline text-xs text-red-500">
                historial de gastos
              </Text>
            </Text>
          </VStack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}
