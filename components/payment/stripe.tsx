import { usePremiumStatusContext } from "@/context/PremiumContex";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
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

interface ICard {
  cardNumber: string;
  cvc: string;
  monto: string;
  expiracion: Date;
  divisa: string;
  mensaje: string;
}

export default function Stripe() {
  const { setIsPremium } = usePremiumStatusContext();
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
  const onSubmit = (data: ICard) => {
    console.log(data);
    setIsPremium(true);
    reset();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <VStack space={3}>
        <VStack space={2} p={5} className="bg-white rounded-lg">
          <FormControl isInvalid={!!errors.monto} isRequired>
            <VStack space={1}>
              <Text className="text-textmuted">Número de Tarjeta</Text>
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
              <Text className="text-textmuted">CVC / CVV</Text>
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
              <Text className="text-textmuted">Fecha Expiración</Text>
            </VStack>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  size="lg"
                  keyboardType="numeric"
                  marginY={3}
                  value={
                    value
                      ? `${value.getMonth() + 1}/${value.getFullYear()}`
                      : ""
                  }
                  onChangeText={(value) => {
                    const [month, year] = value.split("/");
                    onChange(new Date(+year, +month - 1));
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
              {errors.cardNumber && errors.cardNumber.message}
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.monto} isRequired>
            <VStack space={1}>
              <Text className="text-textmuted">Monto</Text>
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

          <Controller
            control={control}
            name="mensaje"
            render={({ field: { onChange, value } }) => (
              <TextArea
                marginTop={5}
                autoCompleteType
                placeholder="Mensaje..."
                minH={35}
                value={value}
                onChangeText={(value) => onChange(value)}
                borderRadius={7}
                size="lg"
              />
            )}
            defaultValue=""
          />
        </VStack>

        <Center>
          <Button
            colorScheme="accent"
            onPress={handleSubmit(onSubmit)}
            marginTop={16}
            rounded={7}
          >
            <Text className="font-semibold px-5 py-1">Realizar Compra</Text>
          </Button>
        </Center>
      </VStack>
    </TouchableWithoutFeedback>
  );
}
