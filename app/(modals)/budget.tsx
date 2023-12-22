import { SavingGoalModal } from "@/components/popups/save-goals";
import { router } from "expo-router";
import {
  Button,
  FormControl,
  HStack,
  Input,
  VStack,
  WarningOutlineIcon,
  ScrollView,
} from "native-base";
import * as React from "react";
import { Image, Text, View, FlatList, Pressable, TextInput, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProgressBar } from "react-native-paper";
import { supabase } from "@/utils/supabase";
import { Controller, useForm } from "react-hook-form";
import { FontAwesome5 } from "@expo/vector-icons";
import { IPresupuesto } from "@/interfaces/presupuesto";
import { useExpenseContext } from "@/context/ExpenseContext";
import { Presupuesto } from "@/components/shared/presupuesto";
import DateTimePicker from '@react-native-community/datetimepicker';
import useAuth from "@/context/AuthContext";

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
  const styles = StyleSheet.create({
    input: {
        height: 40,
        borderColor: 'green',
        borderWidth: 1,
        borderRadius: 7,
        padding: 7,
        backgroundColor: "#cddbda",
    },
});


  return (
    <SafeAreaView className="px-5">
      <ScrollView>
        <VStack space={2} mb={10}>
          <Text className="font-bold text-left text-2xl">Presupuesto</Text>
          <Text>
            Gestiona tus finanzas personales.
          </Text>
        </VStack>
        <VStack space={7}>
          <VStack space={1}>
            <View className="flex flex-row items-center">
                <Image
                source={{
                    uri: "https://img.icons8.com/?size=48&id=34028&format=png",
                }}
                alt="Presupuesto"
                width={30}
                height={30}
                />
                <Text className="font-semibold text-lg ml-4">Presupuesto</Text>
            </View>
            <FormControl isInvalid={!!errors.monto} isRequired>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    size="lg"
                    keyboardType="numeric"
                    isFocused
                    marginY={3}
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
                    placeholder="Ingresa tu presupuesto"
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
          </VStack>

          <VStack space={1}>
            <View className="flex flex-row items-center">    
                <Image
                source={{
                    uri: "https://img.icons8.com/?size=80&id=czTWm4uF2TUo&format=png",
                }}
                alt="Descripción"
                width={30}
                height={30}
                />
                <Text className="font-semibold text-lg ml-4">Descripción</Text>
            </View>
            <FormControl isInvalid={!!errors.descripcion} isRequired>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    size="lg"
                    isFocused
                    marginY={3}
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
                    placeholder="Ingresa una descripción"
                    borderRadius={7}
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
            
        <HStack space={5}>
          <VStack space={1}>
            <View className="flex flex-row items-center">
                <Image
                source={{
                    uri: "https://img.icons8.com/?size=80&id=67337&format=png",
                }}
                alt="Fecha inicio"
                width={30}
                height={30}
                />
                <Text className="font-semibold text-lg ml-4">Fecha inicio</Text>
            </View>
            <FormControl isInvalid={!!errors.fecha_registro} isRequired>
                <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <Pressable onPress={toggleDatepicker}>
                            <TextInput
                                style={styles.input}
                                editable={false} // Esto evita que el teclado se muestre cuando se toca el TextInput
                                value={value ? new Date(value).toLocaleDateString() : "Selecciona una fecha"}
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
                    rules={{ required: { value: true, message: "Fecha requerida" } }}
                />
              <FormControl.ErrorMessage
                marginTop={-1}
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                {errors.fecha_registro && errors.fecha_registro.message}
              </FormControl.ErrorMessage>
            </FormControl>
          </VStack>
          
          <VStack space={1}>
            <View className="flex flex-row items-center">
                <Image
                source={{
                    uri: "https://img.icons8.com/?size=80&id=67337&format=png",
                }}
                alt="Fecha final"
                width={30}
                height={30}
                />
                <Text className="font-semibold text-lg ml-4">Fecha final</Text>
            </View>
            <FormControl isInvalid={!!errors.fecha_final} isRequired>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                    <Pressable onPress={toggleDatepicker}>
                        <TextInput
                            style={styles.input}
                            editable={false} 
                            value={value ? new Date(value).toLocaleDateString() : "Selecciona una fecha"}
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
                rules={{ required: { value: true, message: "Fecha requerida" } }}
              />
              <FormControl.ErrorMessage
                marginTop={-1}
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                {errors.fecha_final && errors.fecha_final.message}
              </FormControl.ErrorMessage>
            </FormControl>
          </VStack>
        </HStack>
          <Button
            className="rounded-full"
            height={10}
            isLoading={isLoading}
            onPress={handleSubmit(onSubmit)}
          >
            Registrar
          </Button>
          <Text className="font-bold text-left text-2xl">
            Presupuesto General
          </Text>
          <FlatList
            data={presupuesto}
            keyExtractor={(presupuesto) => String(presupuesto.id)}
            renderItem={({ item: presupuesto }) => <Presupuesto presupuesto={presupuesto} />}
          />
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
