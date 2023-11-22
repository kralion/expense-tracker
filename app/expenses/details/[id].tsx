import { StatusBar } from "expo-status-bar";
import { Platform, Pressable } from "react-native";
import { Badge, Button, HStack, Tag, VStack } from "native-base";
import { Text } from "react-native";
import { IGasto } from "@/interfaces";
import { supabase } from "@/utils/supabase";
import { useLocalSearchParams, Stack, Link } from "expo-router";

export default function ExpenseDetailsModal(expense: IGasto) {
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
  return (
    <VStack>
      <Stack.Screen
        options={{
          presentation: "card",
          headerBackTitle: "Gastos",
          headerRight: () => (
            <Link href="/expenses/edit/1" asChild>
              <Pressable className="active:opacity-50">
                <Text className="text-blue-500 text-[17px]">Editar</Text>
              </Pressable>
            </Link>
          ),

          title: ` Detalles del Gasto
          ${expense.id}  `,
        }}
      />
      <VStack
        borderColor="coolGray.300"
        rounded={14}
        p={3}
        space={4}
        bg="coolGray.200"
        m={3}
      >
        <Text className="text-black font-bold mb-1  text-[18px]">
          Categoría
        </Text>

        <Tag size="lg" variant="solid">
          {expense.categoria || "Educación"}
        </Tag>
        <Text>
          Esta categoría representa gastos que se realizan referentes a la
          educacion, universidad, pago de mensualidad, examenes
        </Text>
      </VStack>

      <VStack
        borderColor="coolGray.300"
        rounded={14}
        space={4}
        p={3}
        bg="coolGray.200"
        m={3}
      >
        <Text className="text-black font-bold text-[18px]">Fecha Registro</Text>

        <HStack space={2}>
          <Badge size="lg" variant="outline" className="rounded-full">
            {expense.fecha || "05 de Noviembre del 2023"}
          </Badge>
          <Badge size="lg" variant="solid" className="rounded-full">
            {expense.fecha || "16:53 PM"}
          </Badge>
        </HStack>
      </VStack>
      <VStack
        borderColor="coolGray.300"
        rounded={14}
        p={3}
        bg="coolGray.200"
        m={3}
        space={4}
      >
        <Text className="text-black font-bold mb-2 text-[18px]">
          Monto Registrado
        </Text>

        <Tag variant="solid" rounded={7}>
          S/. {expense.cantidad || 100}.00
        </Tag>
      </VStack>
      <HStack mt={10} justifyContent="center" mx={3} space={3}>
        <Button
          onPress={() => handleDeleteExpense(expense.id)}
          width={350}
          rounded={7}
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
