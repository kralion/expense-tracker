import { useExpenseContext } from "@/context";
import { IGasto } from "@/interfaces";
import { supabase } from "@/utils/supabase";
import { FontAwesome5 } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import {
  Button,
  CheckIcon,
  Divider,
  FormControl,
  HStack,
  Input,
  Radio,
  Select,
  Switch,
  TextArea,
  VStack,
  WarningOutlineIcon,
} from "native-base";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Keyboard, Text, TouchableWithoutFeedback, View } from "react-native";
interface FormData {
  monto: string;
  divisa: string;
  categoria: string;
  descripcion: string;
  periodicidad: boolean;
}
export default function EditExpense() {
  const params = useLocalSearchParams<{ id: string }>();
  const [expenseDataDetails, setExpenseDataDetails] =
    React.useState<IGasto | null>();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  async function onSubmit(data: FormData) {
    data.monto = parseFloat(data.monto).toString();
    alert(JSON.stringify(data));
  }
  async function getExpense() {
    const { data, error } = await supabase
      .from("expenses")
      .select("*")
      .eq("id", params.id)
      .single();
    setExpenseDataDetails(data);

    if (error) {
      console.log(error);
    }
  }
  React.useEffect(() => {
    getExpense();
  }, [params.id]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <VStack bgColor="white" className=" h-screen p-7  rounded-b-xl ">
        <HStack space={3}>
          <Text className=" text-textmuted text-center text-xl ">
            Numero de Gasto
          </Text>
          <Text className="font-bold text-center text-xl ">
            #{expenseDataDetails?.numeroGasto}
          </Text>
        </HStack>
        <VStack space={4} py={3}>
          <FormControl isInvalid={!!errors.categoria} isRequired>
            <VStack space={1}>
              <FormControl.Label>
                <Text className="font-semibold text-[18px]">Categoría</Text>
              </FormControl.Label>
            </VStack>
            <Controller
              name="categoria"
              control={control}
              render={({ field: { onChange } }) => (
                <Select
                  id="categorias"
                  size="lg"
                  color="gray.800"
                  selectedValue={expenseDataDetails?.categoria}
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

          <FormControl isInvalid={!!errors.monto} isRequired>
            <VStack space={1}>
              <FormControl.Label>
                <Text className="font-semibold text-[18px]">Monto</Text>
              </FormControl.Label>
            </VStack>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  size="lg"
                  keyboardType="numeric"
                  marginY={3}
                  value={expenseDataDetails?.monto}
                  onChangeText={(value) => onChange(value)}
                  rightElement={
                    <FontAwesome5
                      name="dollar-sign"
                      color="#6D6868"
                      marginRight={10}
                      size={10}
                    />
                  }
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
          <FormControl marginY={3} w="90%" width={335}>
            <Controller
              name="divisa"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Radio.Group
                  value={expenseDataDetails?.divisa}
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
                value={expenseDataDetails?.descripcion}
                onChangeText={(value) => onChange(value)}
                borderRadius={5}
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
                    <Switch
                      size="sm"
                      value={expenseDataDetails?.periodicidad}
                      onToggle={onChange}
                    />
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
        {/* //! Probar esto solo el los dispositivos, en los emuladores no funciona
      <PushNotification /> */}
        <Button
          onPress={handleSubmit(onSubmit)}
          className="rounded-full w-full"
          height={12}
          marginTop={10}
        >
          Guardar
        </Button>
      </VStack>
    </TouchableWithoutFeedback>
  );
}
