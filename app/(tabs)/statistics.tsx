import { FontAwesome5, FontAwesome } from "@expo/vector-icons";
import { Button, HStack, Select, VStack, FlatList } from "native-base";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  View,
  SectionList,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Chart from "../../components/estadisticas/chart";
import { useExpenseContext } from "@/context";
import { ExpenseSkeleton } from "@/components/skeletons/expense";
import * as React from "react";
import { Expense } from "@/components/shared";
import { expensesIdentifiers } from "@/constants/ExpensesIdentifiers";
import { Link } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { IGasto } from "@/interfaces";

export default function Statistics() {
  const [service, setService] = useState("gastos");
  const { expenses } = useExpenseContext();
  return (
    <SafeAreaView>
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
          isPressed
          onPress={() => alert("Diario")}
        >
          Diario
        </Button>
        <Button
          variant="ghost"
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
          disabled
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
            startIcon={
              <FontAwesome name="file-pdf-o" color="white" marginRight={3} />
            }
            borderRadius={7}
          >
            Exportar
          </Button>
        </Link>
        <Select
          selectedValue={service}
          minWidth="150"
          size="lg"
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
      <HStack space={4} justifyContent="space-between" px={4} my={7}>
        <Text className="text-xl text-muted font-semibold">Top Gastos</Text>
        <TouchableOpacity>
          <MaterialCommunityIcons name="arrow-expand" size={24} color="black" />
        </TouchableOpacity>
      </HStack>
      <FlatList
        mx={2}
        data={expenses}
        keyExtractor={(expense) => String(expense.id)}
        renderItem={({ item: expense }) => <Expense expense={expense} />}
      />
    </SafeAreaView>
  );
}
