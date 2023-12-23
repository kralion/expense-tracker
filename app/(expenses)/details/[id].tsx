import { useExpenseContext, useNotificationContext } from "@/context";
import useAuth from "@/context/AuthContext";
import { IGasto } from "@/interfaces";
import { supabase } from "@/utils/supabase";
import { Ionicons } from "@expo/vector-icons";
import { Link, Stack, router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Badge, Button, Divider, HStack, Slider, VStack } from "native-base";
import * as React from "react";
import { Platform, Pressable, Text, View } from "react-native";

export default function ExpenseDetailsModal() {
  const [expenseDataDetails, setExpenseDataDetails] =
    React.useState<IGasto | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const { session } = useAuth();
  const { showNotification } = useNotificationContext();
  const { deleteExpenseById } = useExpenseContext();
  const params = useLocalSearchParams<{ id: string }>();
  const [presupuesto, setPresupuesto] = React.useState<any>([]);

  const handleDeleteExpense = async (id: string) => {
    setIsLoading(true);
    deleteExpenseById(id);
    setIsLoading(false);
    router.push("/(tabs)/");
  };

  async function getSingleExpense(id: string): Promise<IGasto | null> {
    if (!session?.user?.id) {
      throw new Error("La sesión o el ID de usuario no están definidos");
    }

    try {
      const { data, error } = await supabase
        .from("expenses")
        .select("*")
        .eq("id", id) // Verificar el ID del gasto
        .eq("session_id", session.user.id); // Verificar que el gasto pertenezca al usuario en sesión

      if (error) throw error;
      if (data.length === 0) return null;

      console.log("Datos del Gasto", JSON.stringify(data));
      return data[0];
    } catch (error) {
      console.error("Error al obtener gasto:", error);
      showNotification({
        title: "Error al obtener gasto",
        alertStatus: "error",
      });
      return null;
    }
  }

  React.useEffect(() => {
    const fetchExpenseData = async () => {
      const data = await getSingleExpense(params.id);
      setExpenseDataDetails(data);
    };

    fetchExpenseData();
  }, []);
  async function getPresupuesto() {
    const { data, error } = await supabase
      .from("presupuestos")
      .select("monto")
      .eq("usuario_id", session?.user?.id)
      .single();
    if (error) {
      console.log("Error al obtener el presupuesto", error);
    }
    if (data) {
      setPresupuesto(data.monto);
    }
  }
  React.useEffect(() => {
    getPresupuesto();
  }, []);

  const monto_gastado = parseInt(
    expenseDataDetails?.monto ? expenseDataDetails?.monto : "0"
  );
  const monto_presupuestado = 2470;
  const totalPercentageExpensed = parseFloat(
    ((monto_gastado / monto_presupuestado) * 100).toFixed(2)
  );
  return (
    <VStack bgColor="white" rounded={7} p={3}>
      <Stack.Screen
        options={{
          presentation: "card",
          headerBackTitle: "Gastos",
          headerRight: () => (
            <Link href={`/(expenses)/edit/${params.id}`} asChild>
              <Pressable className="active:opacity-50">
                <Text className="text-blue-500 text-[17px]">Editar</Text>
              </Pressable>
            </Link>
          ),

          title: "Detalles",
        }}
      />
      {totalPercentageExpensed >= 80 && (
        <View className="rounded-t-md border-[0.5px] border-red-400 bg-red-100">
          <Text className="p-5 text-red-500  ">
            Parece que ya gastaste un{" "}
            <Text className="underline">alto porcentaje</Text> de tu{" "}
            <Text className="underline">presupuesto mensual</Text>, te
            recomendamos <Text className="underline"> reconsiderar</Text> — los
            gastos que realizas.
          </Text>
        </View>
      )}

      <HStack p={5} justifyContent="space-between">
        <HStack space={2}>
          <Text className="text-black font-bold mb-1  text-[18px]">
            #{expenseDataDetails?.numeroGasto}
          </Text>
          <Badge
            size="lg"
            borderWidth="0"
            variant="subtle"
            className="rounded-full"
            colorScheme="green"
          >
            {expenseDataDetails?.categoria}
          </Badge>
        </HStack>
        {/* //! FEATURE : Cambiar este icono dependiendo al tipo de gasto */}
        <Ionicons name="information-circle-outline" size={24} />
      </HStack>
      <VStack p={5} space={4}>
        <HStack justifyContent="space-between" alignItems="center">
          <Text>Monto</Text>
          <Text className="font-bold">S/. {expenseDataDetails?.monto}</Text>
        </HStack>
        <HStack justifyContent="space-between" alignItems="center">
          <Text>Divisa</Text>
          <Text className="font-bold">
            {" "}
            {expenseDataDetails?.divisa === "pen"
              ? "soles"
              : expenseDataDetails?.divisa === "usd"
              ? "dolares"
              : expenseDataDetails?.divisa}
          </Text>
        </HStack>
        <HStack justifyContent="space-between" alignItems="center">
          <Text>Categoría</Text>
          <Text className="font-bold">{expenseDataDetails?.categoria}</Text>
        </HStack>
        <HStack justifyContent="space-between" alignItems="center">
          <Text>Descripción</Text>
          <Text className="font-bold">{expenseDataDetails?.descripcion}</Text>
        </HStack>
        <HStack justifyContent="space-between" alignItems="center">
          <Text>% Presupuesto</Text>

          <Text className="font-bold">{totalPercentageExpensed}%</Text>
        </HStack>

        <HStack justifyContent="flex-end" space={3}>
          <Badge size="lg" variant="outline" className="rounded-full">
            {expenseDataDetails?.fecha
              ? new Date(expenseDataDetails?.fecha).toLocaleDateString(
                  "en-GB",
                  {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  }
                )
              : ""}
          </Badge>
          <Badge size="lg" variant="solid" className="rounded-full">
            {expenseDataDetails?.fecha
              ? new Date(expenseDataDetails?.fecha).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : ""}
          </Badge>
        </HStack>
      </VStack>
      <Divider
        my="2"
        _light={{
          bg: "muted.200",
        }}
        _dark={{
          bg: "muted.50",
        }}
      />
      <HStack space={2} p={5}>
        <Text className="text-black font-bold mb-1  text-[18px]">
          Presupuesto Gastado
        </Text>
        <Badge
          size="lg"
          borderWidth="0"
          variant="subtle"
          colorScheme={totalPercentageExpensed > 80 ? "error" : "primary"}
        >
          <Text>{totalPercentageExpensed}%</Text>
        </Badge>
      </HStack>

      <HStack justifyContent="center" p={5} space={3}>
        <Slider
          defaultValue={30}
          minValue={0}
          maxValue={100}
          colorScheme={totalPercentageExpensed >= 80 ? "error" : "primary"}
          accessibilityLabel="Indice gastado"
          step={1}
        >
          <Slider.Track>
            <Slider.FilledTrack />
          </Slider.Track>
          <Slider.Thumb />
        </Slider>
      </HStack>

      <Divider
        _light={{
          bg: "muted.200",
        }}
        _dark={{
          bg: "muted.50",
        }}
      />
      <HStack justifyContent="center" p={5} space={3}>
        <Button
          onPress={() => handleDeleteExpense(params.id)}
          className="w-full rounded-full"
          height={12}
          variant="solid"
          isLoading={isLoading}
          colorScheme="rose"
        >
          <Text className="font-semibold text-white ">Eliminar Gasto</Text>
        </Button>
      </HStack>
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </VStack>
  );
}
