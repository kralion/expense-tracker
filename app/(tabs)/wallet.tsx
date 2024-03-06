import { SavingGoalModal } from "@/components/popups/save-goals";
import { Metas } from "@/components/shared/metas";
import useAuth from "@/context/AuthContext";
import { useExpenseContext } from "@/context/ExpenseContext";
import { ISaving } from "@/interfaces/saving";
import { supabase } from "@/utils/supabase";
import { FontAwesome5 } from "@expo/vector-icons";
import { Image } from "expo-image";
import {
  Button,
  FormControl,
  HStack,
  Input,
  ScrollView,
  VStack,
  WarningOutlineIcon,
} from "native-base";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { FlatList, Text } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

export default function Wallet() {
  const [showSavingGoalModal, setShowSavingGoalModal] = React.useState(false);
  const [metas, setMetas] = React.useState<any>([]);

  async function getMetas() {
    const { data } = await supabase.from("metas").select("*");
    setMetas(data);
  }
  React.useEffect(() => {
    getMetas();
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ISaving>();

  const [isLoading, setIsLoading] = React.useState(false);
  const { userData } = useAuth();
  async function onSubmit(data: ISaving) {
    data.id = userData?.id;
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("metas")
        .insert({
          meta_ahorro: data.meta_ahorro,
          ahorro_actual: data.ahorro_actual,
        })
        .single();
      setShowSavingGoalModal(true);
      if (error) {
        console.log("Error al guardar la meta", error);
      }
    } catch (error) {
      console.log("Error al guardar la meta", error);
    } finally {
      getMetas();
      reset();
      setIsLoading(false);
    }
  }

  return (
    <ScrollView>
      <SafeAreaView className="px-5 pt-5">
        <VStack space={2} mb={7}>
          <Text className="font-bold text-left text-2xl">Metas de ahorro</Text>
          <Text>
            Gestiona y visualiza tus metas de ahorro en la aplicación móvil de
            gestión de gastos.
          </Text>
        </VStack>

        <HStack space={2} alignItems="center">
          <Image
            source={{
              uri: "https://api.iconify.design/solar:money-bag-outline.svg",
            }}
            style={{
              tintColor: "black",
              width: 24,
              height: 24,
            }}
            alt="Meta de Ahorro"
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
                  marginY={2}
                  w={190}
                  value={value}
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

        <HStack space={2} alignItems="center">
          <Image
            source={{
              uri: "https://api.iconify.design/solar:chat-round-money-broken.svg",
            }}
            alt="Ahorro actual"
            style={{
              tintColor: "black",
              width: 24,
              height: 24,
            }}
          />
          <Text className="font-semibold mr-7">Ahorro actual</Text>
          <FormControl isInvalid={!!errors.ahorro_actual} isRequired>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  size="lg"
                  keyboardType="numeric"
                  isFocused
                  marginY={2}
                  w={190}
                  value={value}
                  onChangeText={(value) => onChange(value)}
                  rightElement={
                    <FontAwesome5
                      name="dollar-sign"
                      color="#6D6868"
                      marginRight={10}
                      size={10}
                    />
                  }
                  placeholder="100"
                  borderRadius={7}
                />
              )}
              name="ahorro_actual"
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
              {errors.ahorro_actual && errors.ahorro_actual.message}
            </FormControl.ErrorMessage>
          </FormControl>
        </HStack>

        <Button
          borderRadius={10}
          marginY={10}
          height={12}
          isLoading={isLoading}
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="font-semibold text-white ">Registrar</Text>
        </Button>
        <SavingGoalModal
          openModal={showSavingGoalModal}
          setOpenModal={setShowSavingGoalModal}
        />
        <Text className="font-bold text-left mb-5 text-2xl">
          Historial de Metas
        </Text>
        <FlatList
          data={metas}
          keyExtractor={(metas) => String(metas.id)}
          renderItem={({ item: metas }) => <Metas metas={metas} />}
        />
      </SafeAreaView>
    </ScrollView>
  );
}
