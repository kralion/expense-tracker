import { useExpenseContext, useNotificationContext } from "@/context";
import { IGasto } from "@/interfaces";
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
  const { deleteExpenseById, getSingleExpense } = useExpenseContext();
  const params = useLocalSearchParams<{ id: string }>();
  const handleDeleteExpense = async (id: string) => {
    setIsLoading(true);
    deleteExpenseById(id);
    setIsLoading(false);
    router.push("/(tabs)/");
  };

  React.useEffect(() => {
    const fetchExpense = async () => {
      const fetchedExpense = await getSingleExpense(params.id);
      console.log(params.id);
      setExpenseDataDetails(fetchedExpense);
    };

    fetchExpense();
    console.log(JSON.stringify(expenseDataDetails, null, 2));
  }, [params.id]);
  const monto_gastado = parseInt(
    expenseDataDetails?.monto ? expenseDataDetails?.monto : "0"
  );
  // const monto_presupuestado = expense.cantidad;
  //TODO : Cambiar este valor por el monto presupuestado del mes actual
  const monto_presupuestado = 1000;
  const totalPercentageExpensed = (monto_gastado / monto_presupuestado) * 100;

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
          <Text className="font-bold">{expenseDataDetails?.divisa}</Text>
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

          <Text className="font-bold">{expenseDataDetails?.monto}</Text>
        </HStack>

        <HStack justifyContent="flex-end" space={3}>
          <Badge size="lg" variant="outline" className="rounded-full">
            {expenseDataDetails?.fecha?.toLocaleString()}
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
          maxW="330"
          defaultValue={totalPercentageExpensed}
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
