import { Badge, FlatList, Modal, Text, VStack } from "native-base";
import * as React from "react";
import { Image, View } from "react-native";
const advices = [
  {
    id: "1",
    description: "Revisar tus gastos",
  },
  {
    id: "2",
    description: "Actualizar tu presupuesto",
  },
];

type TNotification = {
  setShowNotification: React.Dispatch<React.SetStateAction<boolean>>;
  showNotification: boolean;
};

export function BudgetLimitExceededModal({
  setShowNotification,
  showNotification,
}: TNotification) {
  return (
    <Modal
      isOpen={showNotification}
      onClose={() => setShowNotification(false)}
      backdropVisible={true}
    >
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header className="bg-red-200 ">
          <Text className="text-red-600 font-bold text-[16px]">
            Presupuesto Excedido
          </Text>
        </Modal.Header>
        <Modal.Body className="space-y-20 bg-red-200 ">
          <View className="flex flex-col  items-center">
            <Image
              className="w-28 h-28"
              source={require("../../assets/images/danger.png")}
              alt="BudgetLimit"
            />
            <Text>
              Parece que ya has gastado todo el monto presupuesto para este mes.
            </Text>
            <View>
              <VStack space={2} my={3} alignItems="start">
                <Badge colorScheme="red" variant="solid">
                  S/. 1,010.00 registrados
                </Badge>
                <Badge variant="solid">S/. 1,000.00 presupuestados</Badge>
              </VStack>
              <Text>Te recomendamos lo siguiente :</Text>

              {advices.map((advice) => (
                <View
                  key={advice.id}
                  className="flex mt-2 flex-row items-center"
                >
                  <View className="w-2 h-2 bg-teal-500 rounded-full mr-2"></View>
                  <Text>{advice.description}</Text>
                </View>
              ))}
            </View>
          </View>
        </Modal.Body>
      </Modal.Content>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
}
