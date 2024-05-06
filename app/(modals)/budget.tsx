import { SavingGoalModal } from "@/components/popups/save-goals";
import { Presupuesto } from "@/components/shared/presupuesto";
import useAuth from "@/context/AuthContext";
import { IPresupuesto } from "@/interfaces/presupuesto";
import { supabase } from "@/utils/supabase";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import {
  Alert,
  Button,
  FormControl,
  HStack,
  Input,
  ScrollView,
  TextArea,
  VStack,
  WarningOutlineIcon,
  useToast,
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
  async function getPresupuesto() {
    const { data } = await supabase.from("presupuestos").select("*");
    setPresupuesto(data);
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<IPresupuesto>();
  const setDate = (event: DateTimePickerEvent, date: Date) => {
    const {
      type,
      nativeEvent: { timestamp },
    } = event;
  };
  const [toggleDatePicker, setToggleDatePicker] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(false);
  const { userData } = useAuth();

  const onChangeFechaRegistro = (event: DateTimePickerEvent) => {
    const {
      type,
      nativeEvent: { timestamp },
    } = event;
    const selectedDate = new Date(timestamp ?? 0);
    setValue("fecha_registro", selectedDate.toISOString());
  };
  const onChangeFechaFinal = (event: DateTimePickerEvent) => {
    const {
      type,
      nativeEvent: { timestamp },
    } = event;
    const selectedDate = new Date(timestamp ?? 0);
    setValue("fecha_final", selectedDate.toISOString());
  };

  const toast = useToast();
  async function onSubmit(data: IPresupuesto) {
    setIsLoading(true);
    const { error } = await supabase
      .from("presupuesto")
      .insert({
        ...data,
        usuario_id: userData?.id,
      })
      .single();
    console.log(error);
    if (error) {
      toast.show({
        render: () => (
          <Alert variant="solid" rounded={10} px={5} status="error">
            <HStack space={2} alignItems="center">
              <Alert.Icon mt="1" />
              <Text className="text-white">
                Error al guardar el presupuesto
              </Text>
            </HStack>
          </Alert>
        ),
        description: "",
        duration: 2000,
        placement: "top",
        variant: "solid",
      });
    }
    setIsLoading(false);
    setShowSavingGoalModal(true);
    reset();
  }

  React.useEffect(() => {
    getPresupuesto();
  }, []);
  return (
    <ScrollView background="white">
      <SafeAreaView className="p-5 ">
        <SavingGoalModal
          openModal={showSavingGoalModal}
          setOpenModal={setShowSavingGoalModal}
        />
        <HStack justifyContent="space-between" alignItems="start">
          <VStack space={2}>
            <Text className="font-bold text-left text-2xl">Presupuestos</Text>
            <Text className=" text-textmuted">
              Presupuestos mensuales para limitar tus gastos
            </Text>
          </VStack>

          <TouchableOpacity
            onPress={() => {
              router.back();
            }}
          >
            <AntDesign name="close" size={20} />
          </TouchableOpacity>
        </HStack>
        <VStack mt={5} space={5}>
          <FormControl isInvalid={!!errors.monto} isRequired>
            <FormControl.Label>Monto</FormControl.Label>
            <Controller
              control={control}
              name="monto"
              render={({ field: { onChange, value } }) => (
                <Input
                  size="lg"
                  keyboardType="numeric"
                  isFocused
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

          <HStack justifyContent="space-between">
            <FormControl
              flex={1}
              isInvalid={!!errors.fecha_registro}
              isRequired
            >
              <FormControl.Label>Fecha Registro</FormControl.Label>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <DateTimePicker
                    value={value ? new Date(value) : new Date()}
                    onChange={onChangeFechaRegistro}
                  />
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
                name="fecha_final"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <DateTimePicker
                    value={value ? new Date(value) : new Date()}
                    onChange={onChangeFechaFinal}
                  />
                )}
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
              name="descripcion"
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
          borderRadius={10}
          mt={5}
          height={12}
          isLoading={isLoading}
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="font-semibold text-white ">Registrar Nuevo</Text>
        </Button>
        <VStack space={5} mt={10}>
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
