import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Button,
  CheckIcon,
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
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
interface FormData {
  cantidad: string;
  divisa: string;
  categoria: string;
  descripcion: string;
}
export default function AddExpense() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      divisa: "pen",
    },
  });

  async function onSubmit(data: FormData) {
    alert(JSON.stringify(data));
  }
  return (
    <SafeAreaView className="bg-background h-screen rounded-b-xl">
      <HStack justifyContent="space-between" className="px-7">
        <Text className="font-bold text-center text-xl ">Registrar Gasto</Text>
        <Button
          onPress={() => {
            reset();
            setValue("categoria", "");
          }}
          colorScheme="red"
          background="red.100"
          className="rounded-full active:opacity-70"
          variant="ghost"
        >
          <MaterialCommunityIcons color="red" name="broom" size={20} />
        </Button>
      </HStack>
      <VStack px={7} space={4} py={3}>
        <FormControl
          isInvalid={!!errors.categoria}
          isRequired
          w="90%"
          width={335}
        >
          <VStack space={1}>
            <FormControl.Label>
              <Text className="font-semibold text-[18px]">Categoría</Text>
            </FormControl.Label>
            <Text className="text-textmuted">Como se categoriza el gasto</Text>
          </VStack>
          <Controller
            name="categoria"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select
                id="categorias"
                selectedValue={value}
                size="lg"
                minWidth={300}
                color="gray.800"
                marginY={3}
                accessibilityLabel="Seleccineuna categoria"
                placeholder="Seleccione"
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
                  bg: "gray.200",
                  endIcon: <CheckIcon size={4} />,
                }}
                onValueChange={(value) => onChange(value)}
              >
                <Select.Item label="Transporte" value="transporte" />
                <Select.Item label="Alimentación" value="alimentacion" />
                <Select.Item label="Ropa" value="ropa" />
                <Select.Item label="Casuales" value="casuales" />
                <Select.Item label="Salud" value="salud" />
              </Select>
            )}
            rules={{ required: true }}
          />
          <FormControl.ErrorMessage
            marginTop={-1}
            leftIcon={<WarningOutlineIcon size="xs" />}
          >
            {errors.categoria && "Selecciona una categoría"}
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl
          isInvalid={!!errors.cantidad}
          isRequired
          w="90%"
          width={335}
        >
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
            name="cantidad"
            rules={{
              required: { value: true, message: "Ingrese el monto" },
              pattern: {
                value: /^\d+(\.\d*)?$/,
                message: "Solo se permiten números",
              },
            }}
          />
          <FormControl.ErrorMessage
            marginTop={-1}
            leftIcon={<WarningOutlineIcon size="xs" />}
          >
            {errors.cantidad && errors.cantidad.message}
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl marginY={3} w="90%" width={335}>
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
                <HStack space={4}>
                  <Radio value="pen">Soles</Radio>
                  <Radio value="usd">Dólares</Radio>
                  <Radio value="eur">Euros</Radio>
                </HStack>
              </Radio.Group>
            )}
          />
        </FormControl>
        <Divider
          _light={{
            bg: "muted.200",
          }}
          _dark={{
            bg: "muted.50",
          }}
        />
        <Controller
          control={control}
          name="descripcion"
          render={({ field: { onChange, value } }) => (
            <TextArea
              autoCompleteType
              placeholder="Breve descripcion ..."
              minH={35}
              value={value}
              onChangeText={(value) => onChange(value)}
              borderRadius={5}
              size="lg"
            />
          )}
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
        height={12}
      >
        Registrar
      </Button>
      {/* //! Probar esto solo el los dispositivos, en los emuladores no funciona
      <PushNotification /> */}
    </SafeAreaView>
  );
}
