import { FontAwesome5, FontAwesome } from "@expo/vector-icons";
import { Button, HStack, Select, VStack } from "native-base";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Chart from "../../components/estadisticas/chart";
import { useExpenseContext } from "@/context";
import { ExpenseSkeleton } from "@/components/skeletons/expense";
import * as React from "react";
import { Expense } from "@/components/shared";
import { expensesIdentifiers } from "@/constants/ExpensesIdentifiers";
import { Link } from "expo-router";
export default function Statistics() {
  const [service, setService] = useState("gastos");
  const { expenses } = useExpenseContext();
  return (
    <SafeAreaView>
      <ScrollView>
        <Text className="font-bold text-center text-2xl">Estadísticas</Text>
        <HStack
          space={1.5}
          alignItems={{
            base: "center",
            md: "flex-start",
          }}
          className="my-5 px-3"
        >
          <Button
            variant="ghost"
            className="py-2.5 w-[90px]  rounded-lg"
            onPress={() => alert("Diario")}
          >
            Diario
          </Button>
          <Button
            variant="ghost"
            isPressed
            className="py-2.5 w-[90px]  rounded-lg"
            onPress={() => alert("Semanal")}
          >
            Semanal
          </Button>
          <Button
            variant="ghost"
            className="py-2.5 w-[90px]  rounded-lg"
            onPress={() => alert("Mensual")}
          >
            Mensual
          </Button>
          <Button
            variant="ghost"
            className="py-2.5 w-[90px]  rounded-lg"
            onPress={() => alert("Anual")}
          >
            Anual
          </Button>
        </HStack>

        <Chart />
        <HStack alignItems="center" justifyContent="space-between" paddingX={4}>
          <Link asChild href="/(modals)/export-data">
            <Button
              size="sm"
              startIcon={
                <FontAwesome name="file-pdf-o" color="white" marginRight={3} />
              }
              borderRadius={7}
            >
              Exportar Historial
            </Button>
          </Link>
          <Select
            selectedValue={service}
            minWidth="150"
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
              bg: "teal.500",
            }}
            onValueChange={(itemValue) => setService(itemValue)}
          >
            <Select.Item label="Gastos" value="gastos" />
            <Select.Item label="Ingresos" value="ingresos" />
          </Select>
        </HStack>
        <View className=" flex-row m-4 items-center  justify-between ">
          <Text className="text-xl text-muted font-semibold">Top Gastos</Text>
          <Pressable>{/* <ArrowUpDown color="gray" size={20} /> */}</Pressable>
        </View>
        <VStack space={4} className="mx-2">
          {expenses?.map((expense) => (
            <React.Suspense fallback={<ExpenseSkeleton />}>
              <Expense
                key={expense.id}
                id={expense.id}
                assetIdentificador={
                  expensesIdentifiers.find(
                    (icon) => icon.label === expense.categoria
                  )?.iconHref ||
                  "https://img.icons8.com/?size=160&id=MjAYkOMsbYOO&format=png"
                }
                categoria={expense.categoria}
                cantidad={expense.cantidad}
                fecha={expense.fecha}
              />
            </React.Suspense>
          ))}
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
