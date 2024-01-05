import { Link, router } from "expo-router";
import { Badge, Button, Modal, VStack } from "native-base";
import * as React from "react";
import { Text, TouchableOpacity } from "react-native";
import BuyPremiumAsset from "@/assets/svgs/buy-premium.svg";
import { LinearGradient } from "expo-linear-gradient";
type ModalProps = {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function BuyPremiumModal({
  openModal,
  setOpenModal,
}: ModalProps) {
  return (
    <Modal
      _backdropFade={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
      animationPreset="slide"
      backdropVisible={true}
      size="xl"
      isOpen={openModal}
      onClose={() => setOpenModal(false)}
    >
      <Modal.Content rounded={30}>
        <LinearGradient
          className={` rounded-3xl  p-5 shadow-2xl space-y-10 `}
          colors={["#10828d", "#a3e062"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Modal.CloseButton
            className="active:opacity-50 bg-white/30"
            rounded={15}
          />
          <Modal.Body className="space-y-10">
            <VStack space={7} alignItems="center">
              <BuyPremiumAsset width={200} height={220} />
              <Text className=" font-bold text-2xl ">Desbloquea Ahora</Text>
              <Text className="text-[16px] text-center">
                Con el plan <Text className="font-bold">Premium</Text> podrás
                acceder a funcionalidades exclusivas.
              </Text>
              <Text className="italic text-center">
                ¡Mejora tu experiencia hoy! y sacale el máximo provecho a la
                applicación.
              </Text>
            </VStack>
            <VStack space={3}>
              <Link href="/(modals)/buy-premium" asChild>
                <Button
                  className="w-full bg-white active:bg-zinc-200 mt-10 rounded-full"
                  height={12}
                  variant="solid"
                  onPress={() => {
                    setOpenModal(false), router.push("/(modals)/buy-premium");
                  }}
                >
                  <Text className="font-semibold  ">Adquiere Premium</Text>
                </Button>
              </Link>
            </VStack>
          </Modal.Body>
        </LinearGradient>
      </Modal.Content>
    </Modal>
  );
}
