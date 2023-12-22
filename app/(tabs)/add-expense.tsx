import { useExpenseContext } from "@/context";
import { IGasto } from "@/interfaces";
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
import { Text, TouchableWithoutFeedback, Keyboard } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddExpense() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<IGasto>({
    defaultValues: {
      divisa: "pen",
    },
  });
  const { addExpense } = useExpenseContext();
  const [isLoading, setIsLoading] = React.useState(false);
  async function onSubmit(data: IGasto) {
    setIsLoading(true);

    // await addExpense(data);
    console.log("Datos a registrar", data);
    // addExpense(data);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    reset();
    setValue("categoria", "");
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="bg-accent">
        <HStack justifyContent="space-between" className="p-7">
          <Text className="font-bold text-center text-xl ">
            Registrar Gasto
          </Text>
          <Button
            onPress={() => {
              reset();
              setValue("categoria", "");
            }}
            colorScheme="danger"
            variant="subtle"
            className="rounded-full active:opacity-70"
          >
            <MaterialCommunityIcons color="red" name="broom" size={20} />
          </Button>
        </HStack>
        <VStack px={7} space={4}>
          <FormControl isInvalid={!!errors.categoria} isRequired>
            <VStack space={1}>
              <FormControl.Label>
                <Text className="font-semibold text-[18px]">Categoría</Text>
              </FormControl.Label>
              <Text className="text-textmuted">
                Como se categoriza el gasto
              </Text>
            </VStack>
            <Controller
              name="categoria"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  id="categorias"
                  selectedValue={value}
                  isFocused
                  size="lg"
                  minWidth={300}
                  color="gray.800"
                  marginY={3}
                  accessibilityLabel="Seleccione una categoría"
                  placeholder="Tap en el icono"
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

          <FormControl isInvalid={!!errors.monto} isRequired>
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
                  isFocused
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
                placeholder="Descripcion ..."
                minH={35}
                isFocused
                value={value}
                onChangeText={(value) => onChange(value)}
                borderRadius={7}
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
          isLoading={isLoading}
          className="rounded-full m-7"
          marginTop={16}
          height={12}
        >
          <Text className="font-semibold text-white ">Registrar</Text>
        </Button>
        {/* //! Probar esto solo el los dispositivos, en los emuladores no funciona
      <PushNotification /> */}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
