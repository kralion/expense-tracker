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
                <Badge colorScheme="teal" variant="solid">
                  S/. 1,000.00 presupuestados
                </Badge>
              </VStack>
              <Text>Te recomendamos lo siguiente :</Text>
              <FlatList
                data={advices}
                className="mt-3 text-left"
                renderItem={({ item }) => (
                  <Text variant="link" className="font-bold text-muted mt-2">
                    - {item.description}
                  </Text>
                )}
                keyExtractor={(item) => item.id}
              />
            </View>
          </View>
        </Modal.Body>
      </Modal.Content>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
}
