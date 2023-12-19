import { SavingGoalModal } from "@/components/popups/save-goals";
import { router } from "expo-router";
import { Button, HStack, Input, VStack } from "native-base";
import * as React from "react";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProgressBar } from "react-native-paper";

export default function Wallet() {
  const [showSavingGoalModal, setShowSavingGoalModal] = React.useState(false);
  const [ahorro, setAhorro] = React.useState(0);
  const [meta, setMeta] = React.useState(0);
  const [inputMeta, setInputMeta] = React.useState<number | null>(null);
  const [inputAhorro, setInputAhorro] = React.useState<number | null>(null);

  const handleButtonClick = () => {
    setMeta(inputMeta !== null ? inputMeta : 0);
    setAhorro(inputAhorro !== null ? inputAhorro : 0);
    setInputMeta(null);
    setInputAhorro(null);
  };

  return (
    <SafeAreaView className=" space-y-6 px-5">
      <Text className="font-bold text-left text-2xl">Metas de ahorro</Text>
      <Text>
        Gestiona y visualiza tus metas de ahorro en la aplicación móvil de
        gestión de gastos.
      </Text>
      <VStack space={7}>
        <HStack space={1} alignItems="center">
          <Image
            source={{
              uri: "https://img.icons8.com/?size=50&id=6x8oEfs1nn_K&format=png",
            }}
            alt="Meta de Ahorro"
            width={30}
            height={30}
          />
          <Text className="font-semibold mr-4">Meta de Ahorro</Text>
          <Input
            placeholder="500"
            size="lg"
            w="190"
            keyboardType="numeric"
            onChangeText={(value) => setInputMeta(Number(value))}
            value={inputMeta !== null ? inputMeta.toString() : undefined}
          />
        </HStack>
        <HStack space={1} alignItems="center">
          <Image
            source={{
              uri: "https://img.icons8.com/?size=50&id=423&format=png",
            }}
            alt="Meta de Ahorro"
            width={30}
            height={30}
          />
          <Text className="font-semibold mr-1.5">Ahorros Actuales</Text>
          <Input
            placeholder="100"
            size="lg"
            w="190"
            keyboardType="numeric"
            onChangeText={(value) => setInputAhorro(Number(value))}
            value={inputAhorro !== null ? inputAhorro.toString() : undefined}
          />
        </HStack>
        <Button className="rounded-full" marginTop={16} height={12}>
          <Text className="font-semibold text-white ">Registrar</Text>
        </Button>

        <Text className="font-bold text-left text-2xl">Metas guardadas</Text>
        <Text>Aquí puedes visualizar todas tus metas de ahorro guardadas.</Text>

        <View className="space-y-3 bg-white py-4 px-3 rounded-xl">
          <HStack space={2} alignItems="center">
            <Image
              source={{
                uri: "https://img.icons8.com/?size=50&id=6x8oEfs1nn_K&format=png",
              }}
              alt="Meta de Ahorro"
              width={30}
              height={30}
            />
            <Text className="font-semibold mr-4">Meta 1: ${meta}</Text>
            <Text>Faltan - ${meta - ahorro}</Text>
          </HStack>
          <Text className="text-lg font-bold">Progreso</Text>
          <ProgressBar
            progress={meta !== 0 ? ahorro / meta : 0}
            color={"#5cb85c"}
            style={{ height: 7, borderRadius: 5 }}
          />
          <Text>
            Has completado el{" "}
            {meta !== 0 ? ((ahorro / meta) * 100).toFixed(2) : 0}% de tu meta.
          </Text>
        </View>
        <SavingGoalModal
          openModal={showSavingGoalModal}
          setOpenModal={setShowSavingGoalModal}
        />
      </VStack>
    </SafeAreaView>
  );
}
