import AddExpenseSuccesModal from "@/components/popups/add-expense-sucess";
import { useExpenseContext } from "@/context/ExpenseContext";
import useAuth from "@/context/AuthContext";
import { IGasto } from "@/interfaces";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  Button,
  CheckIcon,
  Divider,
  FormControl,
  HStack,
  Input,
  Radio,
  ScrollView,
  Select,
  Switch,
  TextArea,
  VStack,
  WarningOutlineIcon,
} from "native-base";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Keyboard, Text, TouchableWithoutFeedback } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddExpense() {
  const { userData } = useAuth();
  const { addExpense } = useExpenseContext();
  const [openModal, setOpenModal] = React.useState(false);
  const [expensePrice, setExpensePrice] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<IGasto>();

  async function onSubmit(data: IGasto) {
    setIsLoading(true);
    addExpense({
      ...data,
      usuario_id: userData.id,
    });
    setExpensePrice(data.monto);
    reset();

    setValue("categoria", "");
    setIsLoading(false);
    setOpenModal(true);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView>
        <AddExpenseSuccesModal
          expensePrice={expensePrice}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
        <SafeAreaView className=" h-screen p-5">
          <Text className="font-bold mb-5 text-xl ">Registrar Gasto</Text>
          <VStack space={4}>
            <FormControl isInvalid={!!errors.categoria} isRequired>
              <VStack>
                <FormControl.Label>
                  <Text className="font-semibold text-[18px]">Categoría</Text>
                </FormControl.Label>
                <Text className="text-textmuted text-xs">
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
                    <Select.Item label="Hogar " value="hogar" />
                    <Select.Item label="Salud" value="salud" />
                    <Select.Item label="Alimentacion" value="alimentacion" />
                    <Select.Item label="Finanzas" value="finanzas" />
                    <Select.Item label="Educación" value="educacion" />
                    <Select.Item label="Personal" value="personal" />
                    <Select.Item label="Casuales" value="casuales" />
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
              <VStack>
                <FormControl.Label>
                  <Text className="font-semibold text-[18px]">Monto</Text>
                </FormControl.Label>
                <Text className="text-textmuted text-xs">
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
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <VStack space={3}>
                  <HStack
                    alignItems="center"
                    justifyContent="space-between"
                    space={4}
                  >
                    <Text> Es un gasto recurrente ?</Text>
                    <HStack space={1} alignItems="center">
                      <Text>{value ? "Sí" : "No"}</Text>
                      <Switch size="sm" value={value} onToggle={onChange} />
                    </HStack>
                  </HStack>
                  {value && (
                    <Text className="text-textmuted text-xs">
                      La recurrencia del gasto se hará efectivo cada mes en la
                      fecha en la que fue creado inicialmente, en este caso cada{" "}
                      <Text className="font-bold text-black">
                        {new Date().toLocaleDateString("es-PE", {
                          day: "numeric",
                        })}
                      </Text>{" "}
                      de cada mes
                    </Text>
                  )}
                </VStack>
              )}
              name="periodicidad"
              defaultValue={false}
            />
          </VStack>
          <Button
            onPress={handleSubmit(onSubmit)}
            isLoading={isLoading}
            className="w-full"
            borderRadius={10}
            marginTop={12}
            height={12}
          >
            <Text className="font-semibold text-white ">Registrar</Text>
          </Button>
          {/* TODO: Probar esto solo el los dispositivos, en los emuladores no funciona
      <PushNotification /> */}
        </SafeAreaView>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
