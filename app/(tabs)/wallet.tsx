import { SavingGoalModal } from "@/components/popups/save-goals";
import { Metas } from "@/components/shared/metas";
import useAuth from "@/context/AuthContext";
import { ISaving } from "@/interfaces/saving";
import { supabase } from "@/utils/supabase";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  Alert,
  Button,
  CheckIcon,
  FormControl,
  HStack,
  Input,
  ScrollView,
  Select,
  VStack,
  WarningOutlineIcon,
  useToast,
} from "native-base";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { FlatList, Text } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

export default function Wallet() {
  const [showSavingGoalModal, setShowSavingGoalModal] = React.useState(false);
  const [metas, setMetas] = React.useState<any>([]);

  async function getMetas() {
    const { data } = await supabase.from("metas").select("*");
    setMetas(data);
  }
  React.useEffect(() => {
    getMetas();
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ISaving>();

  const [isLoading, setIsLoading] = React.useState(false);
  const [presupuestos, setPresupuestos] = React.useState<any>([]);
  const { userData } = useAuth();
  const toast = useToast();
  const getPresupuestos = async () => {
    const { data } = await supabase
      .from("presupuestos")
      .select("*")
      .order("fecha_registro", { ascending: true })
      .limit(3);
    setPresupuestos(data);
  };

  async function onSubmit(data: ISaving) {
    data.id = userData?.id;
    setIsLoading(true);
    const ahorroActual = 200;
    const { error } = await supabase
      .from("metas")
      .insert({
        ...data,
        usuario_id: userData?.id,
        ahorro_actual: ahorroActual,
      })
      .single();
    if (error) {
      toast.show({
        render: () => (
          <Alert variant="solid" rounded={10} px={5} status="error">
            <HStack space={2} alignItems="center">
              <Alert.Icon mt="1" />
              <Text className="text-white">
                Error al registrar meta de ahorro
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
    setShowSavingGoalModal(true);
    getMetas();
    setIsLoading(false);
    reset();
  }
  React.useEffect(() => {
    getPresupuestos();
  }, []);

  return (
    <ScrollView background="white">
      <SafeAreaView className="px-5 pt-5">
        <VStack space={2}>
          <Text className="font-bold text-left text-2xl">Metas de ahorro</Text>
          <Text>
            Gestiona y visualiza tus metas de ahorro en la aplicación móvil de
            gestión de gastos.
          </Text>
        </VStack>
        <VStack space={5} mt={5}>
          <FormControl isInvalid={!!errors.meta_ahorro} isRequired>
            <FormControl.Label>Meta de ahorro</FormControl.Label>
            <FormControl isInvalid={!!errors.meta_ahorro} isRequired>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    size="lg"
                    keyboardType="numeric"
                    isFocused
                    value={value}
                    onChangeText={(value) => onChange(value)}
                    rightElement={
                      <Text className="text-textmuted pr-2">S/.</Text>
                    }
                    placeholder="1500"
                    borderRadius={7}
                  />
                )}
                name="meta_ahorro"
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
                {errors.meta_ahorro && errors.meta_ahorro.message}
              </FormControl.ErrorMessage>
            </FormControl>
          </FormControl>
          <FormControl isInvalid={!!errors.presupuesto_id} isRequired>
            <FormControl.Label>Presupuesto Relacionado</FormControl.Label>
            <Controller
              name="presupuesto_id"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  selectedValue={value}
                  isFocused
                  size="lg"
                  minWidth={300}
                  color="gray.800"
                  placeholder="Fecha de inicio - Fecha final"
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
                  {presupuestos.map(
                    (presupuesto: {
                      id: string;
                      fecha_registro: string;
                      fecha_final: string;
                    }) => (
                      <Select.Item
                        key={presupuesto.id}
                        label={`${new Date(
                          presupuesto.fecha_registro
                        ).toLocaleDateString("es-ES", {
                          day: "numeric",
                          month: "2-digit",
                          year: "2-digit",
                        })} - ${new Date(
                          presupuesto.fecha_final
                        ).toLocaleDateString("es-ES", {
                          day: "numeric",
                          month: "2-digit",
                          year: "2-digit",
                        })}`}
                        value={presupuesto.id}
                      />
                    )
                  )}
                </Select>
              )}
              rules={{ required: true }}
            />
            <FormControl.ErrorMessage
              marginTop={-1}
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              {errors.presupuesto_id && "Selecciona un presupuesto"}
            </FormControl.ErrorMessage>
          </FormControl>
        </VStack>

        <Button
          borderRadius={10}
          marginY={10}
          height={12}
          isLoading={isLoading}
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="font-semibold text-white ">Registrar</Text>
        </Button>
        <SavingGoalModal
          openModal={showSavingGoalModal}
          setOpenModal={setShowSavingGoalModal}
        />
        <Text className="font-bold text-left mb-5 text-2xl">
          Historial de Metas
        </Text>
        <FlatList
          data={metas}
          keyExtractor={(metas) => String(metas.id)}
          renderItem={({ item: metas }) => <Metas metas={metas} />}
        />
      </SafeAreaView>
    </ScrollView>
  );
}
