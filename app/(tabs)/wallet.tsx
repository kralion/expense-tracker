import { SavingGoalModal } from "@/components/popups/save-goals";
import { router } from "expo-router";
import { Button, FormControl, HStack, Input, VStack, WarningOutlineIcon, ScrollView } from "native-base";
import * as React from "react";
import { Image, Text, View, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProgressBar } from "react-native-paper";
import { supabase } from "@/utils/supabase";
import { Controller, useForm } from "react-hook-form";
import { FontAwesome5 } from "@expo/vector-icons";
import { ISaving } from "@/interfaces/saving";
import { useExpenseContext } from "@/context/ExpenseContext";
import { Metas } from "@/components/shared/metas";

export default function Wallet() {
  const [showSavingGoalModal, setShowSavingGoalModal] = React.useState(false);
  const [ahorro, setAhorro] = React.useState(0);
  const [meta, setMeta] = React.useState(0);
  const [inputMeta, setInputMeta] = React.useState<number | null>(null);
  const [metas, setMetas] = React.useState<any>([]);
  const [inputAhorro, setInputAhorro] = React.useState<number | null>(null);
  
  async function getMetas () {
    const { data } = await supabase.from("metas").select("*");
    setMetas(data);
    console.log(data?.length);
  }

  React.useEffect(() => {
    getMetas();
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ISaving>();
  
  const { addExpense } = useExpenseContext();
  const [isLoading, setIsLoading] = React.useState(false);
  async function onSubmit(data: ISaving) {
    setIsLoading(true);
    console.log(data);
    reset();
    setIsLoading(false);
  }

  return (
    <SafeAreaView className=" space-y-6 px-5">
      <ScrollView>
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
            <FormControl isInvalid={!!errors.meta_ahorro} isRequired>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    size="lg"
                    keyboardType="numeric"
                    isFocused
                    marginY={3}
                    w={190}
                    value={value?.toString()}
                    onChangeText={(value) => onChange(value)}
                    rightElement={
                      <FontAwesome5
                        name="dollar-sign"
                        color="#6D6868"
                        marginRight={10}
                        size={10}
                      />
                    }
                    placeholder="1500"
                    borderRadius={7}
                  />
                )}
                name="meta_ahorro"
                rules={{
                  required: { value: true, message: "Ingrese el monto" },
                  pattern: {
                    value: /^\d+(\.\d*)?$/,
                    message: "Solo se permiten números válidos",
                  },
                }}
              />
              <FormControl.ErrorMessage
                marginTop={-1}
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                {errors.meta_ahorro && errors.meta_ahorro.message}
              </FormControl.ErrorMessage>
            </FormControl>
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
          <Button
            className="rounded-full"
            height={10}
            w={40}
            onPress={() => {
              setShowSavingGoalModal(true);
              handleSubmit(onSubmit);
            }}
            maxW="100px"
          >
            Registrar meta de ahorro
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
          <Text className="font-bold text-left text-2xl">Listado de Metas</Text>
          <FlatList
            data={metas}
            keyExtractor={(metas) => String(metas.id)}
            renderItem={({ item: metas }) => <Metas metas={metas} />}
          />
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
