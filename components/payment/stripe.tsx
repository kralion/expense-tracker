import useAuth from "@/context/AuthContext";
import { usePremiumStatusContext } from "@/context/PremiumContex";
import { supabase } from "@/utils/supabase";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Button,
  Center,
  FormControl,
  HStack,
  Input,
  Radio,
  TextArea,
  VStack,
  WarningOutlineIcon,
} from "native-base";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Keyboard, Text, TouchableWithoutFeedback } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";

interface ICard {
  cardNumber: string;
  cvc: string;
  expiracion: string;
  monto: string;
  divisa: string;
  mensaje: string;
}

export default function Stripe() {
  const { setIsPremium } = usePremiumStatusContext();
  const [showConfetti, setShowConfetti] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const { userData } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ICard>({
    defaultValues: {
      divisa: "pen",
    },
  });
  async function updateUserRole(userId: string | undefined) {
    const { error } = await supabase
      .from("usuarios")
      .update({ rol: "free" })
      .eq("id", userId);

    if (error) {
      console.error("Error updating user role:", error);
    }
  }
  async function onSubmit(data: ICard) {
    setIsLoading(true);
    const createdAt = new Date();
    const expiresAt = new Date(createdAt);
    expiresAt.setMonth(createdAt.getMonth() + 1);
    const { error } = await supabase.from("payments").insert({
      usuario_id: userData.id,
      created_At: createdAt.toISOString(),
      expires_At: expiresAt.toISOString(),
      card_data: JSON.stringify(data),
    });

    await updateUserRole("972cf283-22e9-4224-bb76-3d5805884f1b");
    if (error) {
      console.error("Error inserting payment:", error);
    }
    setIsPremium(true);
    reset();
    setIsLoading(false);
    setShowConfetti(true);
    setTimeout(() => {
      router.push("/(tabs)/");
    }, 3000);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <VStack space={3}>
        {showConfetti && (
          <ConfettiCannon autoStart count={200} origin={{ x: -10, y: 0 }} />
        )}
        <VStack space={2} p={5} className="bg-mutedwhite rounded-lg">
          <FormControl isInvalid={!!errors.monto} isRequired>
            <VStack space={1}>
              <Text>Número de Tarjeta</Text>
            </VStack>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  size="lg"
                  keyboardType="numeric"
                  marginY={3}
                  value={value}
                  onChangeText={(value) => onChange(value)}
                  rightElement={
                    <FontAwesome5
                      name="credit-card"
                      color="#6D6868"
                      marginRight={10}
                      size={15}
                    />
                  }
                  placeholder="1234 1234 1234 1234"
                  borderRadius={7}
                />
              )}
              name="cardNumber"
              rules={{
                required: {
                  value: true,
                  message: "Ingrese el número de tarjeta",
                },
                pattern: {
                  value: /^\d+(\.\d*)?$/,
                  message: "Solo caracteres válidos",
                },
              }}
            />
            <FormControl.ErrorMessage
              marginTop={-1}
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              {errors.cardNumber && errors.cardNumber.message}
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.cvc} isRequired>
            <VStack space={1}>
              <Text>CVC / CVV</Text>
            </VStack>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  size="lg"
                  keyboardType="numeric"
                  marginY={3}
                  value={value}
                  onChangeText={(value) => onChange(value)}
                  rightElement={
                    <MaterialCommunityIcons
                      name="identifier"
                      color="#6D6868"
                      marginRight={10}
                      size={20}
                    />
                  }
                  placeholder="123"
                  borderRadius={7}
                />
              )}
              name="cvc"
              rules={{
                required: {
                  value: true,
                  message: "Ingrese el CVC/CVV de la tarjeta",
                },
                pattern: {
                  value: /^\d+(\.\d*)?$/,
                  message: "Solo caracteres válidos",
                },
              }}
            />
            <FormControl.ErrorMessage
              marginTop={-1}
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              {errors.cvc && errors.cvc.message}
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.expiracion} isRequired>
            <VStack space={1}>
              <Text>Fecha Expiración</Text>
            </VStack>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  size="lg"
                  keyboardType="numeric"
                  marginY={3}
                  value={value}
                  onChangeText={(value) => {
                    if (value.length === 2 && !value.includes("/")) {
                      onChange(value + "/");
                    } else {
                      onChange(value);
                    }
                  }}
                  rightElement={
                    <MaterialCommunityIcons
                      name="calendar-month"
                      color="#6D6868"
                      marginRight={10}
                      size={20}
                    />
                  }
                  placeholder="MM/YY"
                  borderRadius={7}
                />
              )}
              name="expiracion"
              rules={{
                required: {
                  value: true,
                  message: "Ingrese la fecha de expiración",
                },
                pattern: {
                  value: /^\d+(\.\d*)?$/,
                  message: "Solo caracteres válidos",
                },
              }}
            />
            <FormControl.ErrorMessage
              marginTop={-1}
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              {errors.expiracion && errors.expiracion.message}
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.monto} isRequired>
            <VStack space={1}>
              <Text>Monto</Text>
            </VStack>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  size="lg"
                  keyboardType="numeric"
                  marginY={3}
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
                  placeholder="65.00"
                  borderRadius={7}
                />
              )}
              name="monto"
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
              {errors.monto && errors.monto.message}
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl>
            <Controller
              name="divisa"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Radio.Group
                  value={value}
                  name="currency"
                  onChange={(value) => onChange(value)}
                  accessibilityLabel="Divisa de Gasto"
                >
                  <HStack space={5}>
                    <Radio value="pen">Soles</Radio>
                    <Radio value="usd">Dólares</Radio>
                    <Radio value="eur">Euros</Radio>
                  </HStack>
                </Radio.Group>
              )}
            />
          </FormControl>
        </VStack>

        <Center>
          <Button
            colorScheme="accent"
            onPress={handleSubmit(onSubmit)}
            isLoading={isLoading}
            rounded={10}
            p={4}
            className="w-full"
            marginTop={2}
          >
            <Text className="font-bold px-5 py-1">Realizar Compra</Text>
          </Button>
        </Center>
      </VStack>
    </TouchableWithoutFeedback>
  );
}
