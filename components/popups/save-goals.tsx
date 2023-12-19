import SaveGoalAsset from "@/assets/svgs/save-goal.svg";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { Button, HStack, Modal, Text, VStack } from "native-base";
import * as React from "react";

type TNotification = {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const savingGoalAdvices = [
  "Automatiza transferencias para ahorrar fácilmente.",
  "Establece metas de ahorro mensuales.",
  "Revisa y ajusta tu presupuesto regularmente.",
  "Celebra pequeños logros de ahorro.",
  "Categoriza gastos para un seguimiento detallado.",
  "Recibe notificaciones de límites de gastos.",
  "Analiza gráficos para insights rápidos.",
  "Aprovecha alertas de revisión de presupuesto.",
];

export function SavingGoalModal({ openModal, setOpenModal }: TNotification) {
  const [currentAdvices, setCurrentAdvices] = React.useState<string[]>([]);
  React.useEffect(() => {
    const randomAdvices = savingGoalAdvices
      .sort(() => 0.5 - Math.random())
      .slice(0, 2);

    setCurrentAdvices(randomAdvices);
  }, []);
  return (
    <Modal
      isOpen={openModal}
      _backdropFade={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
      animationPreset="slide"
      backdropVisible={true}
      size="xl"
      onClose={() => setOpenModal(false)}
    >
      <Modal.Content rounded={30} className="p-5 bg-white">
        <Modal.CloseButton rounded={15} />
        <Modal.Body className="space-y-10">
          <VStack space={7} alignItems="center">
            <SaveGoalAsset width={200} height={220} />
            <Text className=" font-bold text-2xl ">Meta Registrada</Text>
            <Text className="text-[16px] text-center">
              Ahora los gastos que realizas debes de concientizarlos para que
              puedas cumplir tu objetivo
            </Text>
          </VStack>
          <VStack space={3}>
            <Text className="font-semibold">Tips que te servirán :</Text>
            <VStack space={2}>
              {currentAdvices.map((advice, index) => (
                <HStack key={index} space={2} alignItems="center">
                  <FontAwesome color="#10828D" name="check" size={15} />
                  <Text>{advice}</Text>
                </HStack>
              ))}
            </VStack>
            <Button
              className="w-full mt-10 rounded-full"
              height={12}
              variant="solid"
              onPress={() => {
                setOpenModal(false), router.push("/(tabs)/statistics");
              }}
            >
              <Text className="font-semibold text-white ">
                Ver Estadísticas
              </Text>
            </Button>
          </VStack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}
