import { StatusBar } from "expo-status-bar";
import { Platform, Pressable, View } from "react-native";
import {
  Badge,
  Button,
  Divider,
  HStack,
  Slider,
  Tag,
  Tooltip,
  VStack,
} from "native-base";
import { Text } from "react-native";
import { IGasto } from "@/interfaces";
import { supabase } from "@/utils/supabase";
import { useRouter, Stack, Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function ExpenseDetailsModal(expense: IGasto) {
  const router = useRouter();
  const handleDeleteExpense = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from("gastos")
        .delete()
        .eq("id", expense.id);

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const monto_gastado = expense.indice_gastado || 70;
  const monto_presupuestado = expense.indice_gastado || 100;
  const totalPercentageExpensed = (monto_gastado / monto_presupuestado) * 100;

  return (
    <VStack bgColor="white" rounded={7} p={3}>
      <Stack.Screen
        options={{
          presentation: "card",
          headerBackTitle: "Gastos",
          headerRight: () => (
            <Link href="/(expenses)/edit/12" asChild>
              <Pressable className="active:opacity-50">
                <Text className="text-blue-500 text-[17px]">Editar</Text>
              </Pressable>
            </Link>
          ),

          title: ` Detalles del Gasto
          ${expense.id}  `,
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
          <Text className="text-black font-bold mb-1  text-[18px]">#781</Text>
          <Badge
            size="lg"
            borderWidth="0"
            variant="subtle"
            className="rounded-full"
            colorScheme="green"
          >
            {expense.categoria || "Comida"}
          </Badge>
        </HStack>
        {/* //! FEATURE : Cambiar este icono dependiendo al tipo de gasto */}
        <Ionicons name="information-circle-outline" size={24} />
      </HStack>
      <VStack p={5} space={4}>
        <HStack justifyContent="space-between" alignItems="center">
          <Text>Monto</Text>
          <Text className="font-bold">S/. {expense.cantidad || 100.99}</Text>
        </HStack>
        <HStack justifyContent="space-between" alignItems="center">
          <Text>Divisa</Text>
          <Text className="font-bold">{expense.divisa || "Soles"}</Text>
        </HStack>
        <HStack justifyContent="space-between" alignItems="center">
          <Text>Categoría</Text>
          <Text className="font-bold">{expense.categoria || "Comida"}</Text>
        </HStack>
        <HStack justifyContent="space-between" alignItems="center">
          <Text>Descripción</Text>
          <Text className="font-bold">
            {expense.descripcion || "Cena familiar"}
          </Text>
        </HStack>
        <HStack justifyContent="space-between" alignItems="center">
          <Text>% Presupuesto</Text>

          <Text className="font-bold">
            {expense.porcentaje_presupuesto || "8%"}
          </Text>
        </HStack>

        <HStack justifyContent="space-between">
          <Badge size="lg" variant="outline" className="rounded-full">
            {expense.fecha || "05 de Noviembre del 2023"}
          </Badge>
          <Badge size="lg" variant="solid" className="rounded-full">
            {expense.fecha || "16:53 PM"}
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
          accessibilityLabel="indice gastado"
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
          onPress={() => handleDeleteExpense(expense.id)}
          className="w-full rounded-full"
          height={12}
          variant="solid"
          colorScheme="rose"
        >
          Eliminar
        </Button>
      </HStack>
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </VStack>
  );
}
