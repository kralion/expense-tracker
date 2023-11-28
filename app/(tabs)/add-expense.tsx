import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Button,
  Divider,
  FormControl,
  HStack,
  Input,
  Radio,
  Select,
  TextArea,
  VStack,
  WarningOutlineIcon,
} from "native-base";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddExpense() {
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(values) {
    alert(values);
  }
  return (
    <SafeAreaView className="bg-background h-screen rounded-b-xl">
      <HStack justifyContent="space-between" className="px-7">
        <Text className="font-bold text-center text-xl ">Registrar Gasto</Text>
        <Button
          colorScheme="red"
          background="red.100"
          className="rounded-full active:opacity-70"
          variant="ghost"
        >
          <MaterialCommunityIcons color="red" name="broom" size={20} />
        </Button>
      </HStack>
      <VStack px={7} py={3}>
        <FormControl isRequired isInvalid={!!errors.email} w="90%" width={335}>
          <VStack space={1}>
            <FormControl.Label>
              <Text className="font-semibold text-[18px]">Categoría</Text>
            </FormControl.Label>
            <Text className="text-textmuted">Como se categoriza el gasto</Text>
          </VStack>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Select
                id="categorias"
                selectedValue={category}
                size="lg"
                color="gray.800"
                marginY={3}
                placeholder="Alimentación"
                borderRadius={7}
                dropdownIcon={
                  <FontAwesome5
                    name="chevron-down"
                    color="#6D6868"
                    marginRight={10}
                    size={10}
                  />
                }
                _selectedItem={{
                  bg: "teal.500",
                }}
                mt={1}
                onValueChange={(itemValue) => setCategory(itemValue)}
              >
                <Select.Item label="Transporte" value="transporte" />
                <Select.Item label="Alimentación" value="alimentacion" />
                <Select.Item label="Ropa" value="ropa" />
                <Select.Item label="Casuales" value="casuales" />
                <Select.Item label="Salud" value="salud" />
              </Select>
            )}
            name="email"
            rules={{ required: true }}
            defaultValue=""
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {errors.email && "Este campo es requerido"}
          </FormControl.ErrorMessage>
        </FormControl>
        <Divider
          my={3}
          _light={{
            bg: "muted.200",
          }}
          _dark={{
            bg: "muted.50",
          }}
        />
        <FormControl isRequired isInvalid={!!errors.email} w="90%" width={335}>
          <VStack space={1}>
            <FormControl.Label>
              <Text className="font-semibold text-[18px]">Monto</Text>
            </FormControl.Label>
            <Text className="text-textmuted">
              Cantidad de dinero expedido en el gasto
            </Text>
          </VStack>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                size="lg"
                keyboardType="numeric"
                isRequired
                marginY={3}
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
            name="email"
            rules={{ required: true }}
            defaultValue=""
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {errors.email && "Este campo es requerido"}
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl marginY={3} isInvalid={!!errors.email} w="90%" width={335}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Radio.Group
                defaultValue="pen"
                name="currency"
                accessibilityLabel="Divisa de Gasto"
              >
                <HStack space={4}>
                  <Radio value="pen">Soles</Radio>
                  <Radio value="usd">Dólares</Radio>
                  <Radio value="eur">Euros</Radio>
                </HStack>
              </Radio.Group>
            )}
            name="currency"
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {errors.email && "Este campo es requerido"}
          </FormControl.ErrorMessage>
        </FormControl>
        <Divider
          my={3}
          _light={{
            bg: "muted.200",
          }}
          _dark={{
            bg: "muted.50",
          }}
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextArea
              autoCompleteType
              placeholder="Breve descripcion ..."
              minH={35}
              marginY={3}
              borderRadius={5}
              size="lg"
            />
          )}
          name="email"
          rules={{ required: true }}
          defaultValue=""
        />

        {/* //! Quiza despues se implemente esta feature */}
        {/* <Select
            id="tipo"
            borderRadius={7}
            selectedValue={type}
            size="md"
            color="gray.800"
            placeholder="Tipo"
            minWidth="105"
            dropdownIcon={
              <FontAwesome5
                name="chevron-down"
                color="#6D6868"
                marginRight={10}
                size={10}
              />
            }
            _selectedItem={{
              bg: "teal.500",
            }}
            mt={1}
            onValueChange={(itemValue) => setType(itemValue)}
          >
            <Select.Item label="Fijo" value="transporte" />
            <Select.Item label="Variable" value="variable" />
          </Select> */}
      </VStack>
      <Button
        onPress={handleSubmit(onSubmit)}
        className="rounded-full m-7"
        marginTop={16}
      >
        Guardar
      </Button>
      {/* //! Probar esto solo el los dispositivos, en los emuladores no funciona
      <PushNotification /> */}
    </SafeAreaView>
  );
}
