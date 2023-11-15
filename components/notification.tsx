import {
  Alert,
  Box,
  Button,
  Center,
  CloseIcon,
  Collapse,
  FormControl,
  HStack,
  IconButton,
  Input,
  Modal,
  Text,
  VStack,
} from "native-base";
import * as React from "react";
import { Image } from "react-native";

type TNotification = {
  setShowNotification: React.Dispatch<React.SetStateAction<boolean>>;
  showNotification: boolean;
};

export function Notification({
  setShowNotification,
  showNotification,
}: TNotification) {
  return (
    <Center>
      <Modal
        isOpen={showNotification}
        onClose={() => setShowNotification(false)}
        backdropVisible={true}
      >
        <Modal.Content width={350} maxWidth={400}>
          <Modal.CloseButton className="bg-red-200" />
          <Modal.Header className="bg-red-500 ">
            <Text className="text-white font-bold text-[16px]">
              Presupuesto Excedido
            </Text>
          </Modal.Header>
          <Modal.Body className="bg-red-100">
            <Center>
              <Image
                width={150}
                height={150}
                source={{
                  uri: "https://img.icons8.com/?size=160&id=AyHHKGHt204t&format=png",
                }}
                alt="Notification"
              />
              <Text>
                Esto se ve mal, parece que haz excedido el presupuesto que
                tienes para este mes, será mejor que reconsideres los gastos que
                realizas
              </Text>
            </Center>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </Center>
  );
}
