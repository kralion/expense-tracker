import { Presupuesto } from "@/components/shared/presupuesto";
import useAuth from "@/context/AuthContext";
import { useExpenseContext } from "@/context/ExpenseContext";
import { IPresupuesto } from "@/interfaces/presupuesto";
import { supabase } from "@/utils/supabase";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import {
  Button,
  FormControl,
  HStack,
  Input,
  ScrollView,
  TextArea,
  VStack,
  WarningOutlineIcon,
} from "native-base";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Budget() {
  const [showSavingGoalModal, setShowSavingGoalModal] = React.useState(false);
  const [presupuesto, setPresupuesto] = React.useState<any>([]);
  const [fechaRegistro, setFechaRegistro] = React.useState(new Date());
  const [fechaFinal, setFechaFinal] = React.useState(new Date());
  const [showPicker, setShowPicker] = React.useState(false);

  const toggleDatepicker = () => {
    setShowPicker(!showPicker);
  };

  const onChangeRegistro = (event: Event, selectedDate?: Date) => {
    const currentDate = selectedDate || fechaRegistro;
    setFechaRegistro(currentDate);
  };
  const onChangeFinal = (event: Event, selectedDate?: Date) => {
    const currentDate = selectedDate || fechaFinal;
    setFechaFinal(currentDate);
  };

  async function getPresupuesto() {
    const { data } = await supabase.from("presupuestos").select("*");
    setPresupuesto(data);
  }
  React.useEffect(() => {
    getPresupuesto();
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<IPresupuesto>();

  const { addExpense } = useExpenseContext();
  const [isLoading, setIsLoading] = React.useState(false);
  const { userData } = useAuth();
  async function onSubmit(data: IPresupuesto) {
    data.id = userData?.id;
    console.log("Datos a registrar", data);
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("presupuestos")
        .insert({
          monto: data.monto,
          descripcion: data.descripcion,
          fecha_registro: data.fecha_registro,
          fecha_final: data.fecha_final,
          usuario_id: data.usuario_id,
        })
        .single();
      setShowSavingGoalModal(true);
      if (error) {
        console.log("Error al guardar el presupuesto", error);
      }
    } catch (error) {
      console.log("Error al guardar el presupuesto", error);
    } finally {
      getPresupuesto();
      reset();
      setIsLoading(false);
    }
  }

  return (
    <ScrollView>
      <SafeAreaView className="p-5 h-screen space-y-5">
        <HStack justifyContent="space-between" alignItems="start">
          <VStack space={2} className="w-2/3">
            <Text className="font-bold text-left text-2xl">Presupuestos</Text>
            <Text>Registra un presupuesto mensuales para limitarte</Text>
          </VStack>

          <TouchableOpacity
            className="mt-1 bg-teal-500/30 rounded-full p-1"
            onPress={() => {
              router.back();
            }}
          >
            <AntDesign name="close" size={20} />
          </TouchableOpacity>
        </HStack>
        <VStack space={5}>
          <FormControl isInvalid={!!errors.monto} isRequired>
            <FormControl.Label>Monto</FormControl.Label>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  size="lg"
                  keyboardType="numeric"
                  isFocused
                  w={350}
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
                  placeholder="450.50"
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

          <HStack space={3}>
            <FormControl
              flex={1}
              isInvalid={!!errors.fecha_registro}
              isRequired
            >
              <FormControl.Label>Fecha Registro</FormControl.Label>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Pressable onPress={toggleDatepicker}>
                    <Input
                      size="lg"
                      editable={false}
                      value={
                        value
                          ? new Date(value).toLocaleDateString()
                          : "12/12/2021"
                      }
                    />
                    {showPicker && (
                      <DateTimePicker
                        value={fechaRegistro}
                        mode="date"
                        display="default"
                        onChange={(_, selectedDate) => {
                          onChangeRegistro(selectedDate);
                          onChange(selectedDate);
                          toggleDatepicker(); // Esto ocultará el DateTimePicker
                        }}
                      />
                    )}
                  </Pressable>
                )}
                name="fecha_registro"
                rules={{
                  required: { value: true, message: "Requerido" },
                }}
              />
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                {errors.fecha_registro && errors.fecha_registro.message}
              </FormControl.ErrorMessage>
            </FormControl>

            <FormControl flex={1} isInvalid={!!errors.fecha_final} isRequired>
              <FormControl.Label>Fecha Expiración</FormControl.Label>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Pressable onPress={toggleDatepicker}>
                    <Input
                      size="lg"
                      editable={false}
                      value={
                        value
                          ? new Date(value).toLocaleDateString()
                          : "12/12/2023"
                      }
                    />
                    {showPicker && (
                      <DateTimePicker
                        value={fechaFinal}
                        mode="date"
                        display="default"
                        onChange={(_, selectedDate) => {
                          onChangeFinal(selectedDate);
                          onChange(selectedDate);
                          toggleDatepicker();
                        }}
                      />
                    )}
                  </Pressable>
                )}
                name="fecha_final"
                rules={{
                  required: { value: true, message: "Requerido" },
                }}
              />
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                {errors.fecha_final && errors.fecha_final.message}
              </FormControl.ErrorMessage>
            </FormControl>
          </HStack>

          <FormControl isInvalid={!!errors.descripcion} isRequired>
            <FormControl.Label>Descripción</FormControl.Label>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextArea
                  autoCompleteType
                  placeholder="Escribe aquí ..."
                  minH={35}
                  isFocused
                  value={value}
                  onChangeText={(value) => onChange(value)}
                  borderRadius={7}
                  size="lg"
                />
              )}
              name="descripcion"
            />
            <FormControl.ErrorMessage
              marginTop={-1}
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              {errors.descripcion && errors.descripcion.message}
            </FormControl.ErrorMessage>
          </FormControl>
        </VStack>
        <Button
          className="rounded-lg"
          py={3}
          isLoading={isLoading}
          onPress={handleSubmit(onSubmit)}
        >
          Registrar
        </Button>
        <VStack space={3}>
          <Text className="font-bold text-xl">Historial de Presupuestos</Text>
          <FlatList
            data={presupuesto}
            keyExtractor={(presupuesto) => String(presupuesto.id)}
            renderItem={({ item: presupuesto }) => (
              <Presupuesto presupuesto={presupuesto} />
            )}
          />
        </VStack>
      </SafeAreaView>
    </ScrollView>
  );
}
