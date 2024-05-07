import { Expense } from "@/components/shared";
import { useExpenseContext } from "@/context/ExpenseContext";
import { IGasto } from "@/interfaces";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { Button, FlatList, HStack, Select, VStack } from "native-base";
import * as React from "react";
import { useState } from "react";
import { Animated, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Chart from "@/components/estadisticas/chart";

export default function Statistics() {
  const [queryType, setQueryType] = useState("recientes");
  const [timelineQuery, setTimelineQuery] = useState("semanal");
  const [expenses, setExpenses] = useState<IGasto[]>([]);
  const { getTopExpenses, getRecentExpenses, getExpensesByPeriodicity } =
    useExpenseContext();
  const [showAll, setShowAll] = React.useState(false);
  const fadeAnim = React.useRef(new Animated.Value(1)).current;
  const fetchRecentExpenses = async () => {
    const expenses = await getRecentExpenses();
    setExpenses(expenses);
  };
  const fetchTopExpenses = async () => {
    const expenses = await getTopExpenses();
    setExpenses(expenses);
  };
  const fetchExpensesByPeriodicity = async () => {
    const expenses = await getExpensesByPeriodicity();
    setExpenses(expenses);
  };
  React.useEffect(() => {
    if (queryType === "recientes") {
      fetchRecentExpenses();
    } else if (queryType === "top-gastos") {
      fetchTopExpenses();
    } else if (queryType === "periódicos") {
      fetchExpensesByPeriodicity();
    }
  }, [queryType]);
  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: showAll ? 1 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [showAll]);

  return (
    <>
      {showAll ? (
        <Animated.View style={{ opacity: fadeAnim, backgroundColor: "white" }}>
          <SafeAreaView>
            <HStack space={4} justifyContent="space-between" px={4} my={7}>
              <Text className="text-xl text-muted font-semibold">
                {queryType === "recientes"
                  ? "Recientes"
                  : queryType === "top-gastos"
                  ? "Top Gastos"
                  : "Periódicos"}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setShowAll(false);
                }}
              >
                <MaterialCommunityIcons
                  name="arrow-collapse"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </HStack>
            <FlatList
              data={expenses}
              renderItem={({ item }) => <Expense expense={item} />}
              keyExtractor={(item) => String(item.id)}
            />
          </SafeAreaView>
        </Animated.View>
      ) : (
        <SafeAreaView style={{ backgroundColor: "white" }}>
          <VStack space={4}>
            <Text className="font-bold text-center text-2xl">Estadísticas</Text>
            <HStack space={1.5} mx={1.5}>
              <Button
                variant="ghost"
                className="py-2.5 w-[90px]"
                borderRadius={10}
                isPressed={timelineQuery === "hoy"}
                onPress={() => setTimelineQuery("hoy")}
              >
                Hoy
              </Button>
              <Button
                variant="ghost"
                isPressed={timelineQuery === "diario"}
                className="py-2.5 w-[90px]  rounded-lg"
                onPress={() => setTimelineQuery("diario")}
              >
                Diario
              </Button>
              <Button
                variant="ghost"
                className="py-2.5 w-[90px] "
                isPressed={timelineQuery === "semanal"}
                onPress={() => setTimelineQuery("semanal")}
                borderRadius={10}
              >
                Semanal
              </Button>
              <Button
                variant="ghost"
                isPressed={timelineQuery === "mensual"}
                className="py-2.5 w-[90px] "
                onPress={() => setTimelineQuery("mensual")}
                borderRadius={10}
              >
                Mensual
              </Button>
            </HStack>
            <Chart timelineQuery={timelineQuery} />
            <HStack
              alignItems="center"
              justifyContent="space-between"
              paddingX={4}
            >
              <Link asChild href="/(modals)/export-data">
                <Button
                  startIcon={
                    <Image
                      style={{ width: 16, height: 16, tintColor: "#ffff" }}
                      source={{
                        uri: "https://api.iconify.design/mingcute:file-export-line.svg",
                      }}
                      alt="exportar"
                    />
                  }
                  borderRadius={10}
                >
                  Exportar
                </Button>
              </Link>
              <Select
                selectedValue={queryType}
                minWidth={150}
                size="lg"
                borderRadius={10}
                onValueChange={(value) => setQueryType(value)}
              >
                <Select.Item label="Recientes" value="recientes" />
                <Select.Item label="Top Gastos" value="top-gastos" />
                <Select.Item label="Periódicos" value="periódicos" />
              </Select>
            </HStack>
            <HStack space={4} justifyContent="space-between" px={4}>
              <Text className="text-xl text-muted font-semibold">
                {queryType === "recientes"
                  ? "Recientes"
                  : queryType === "top-gastos"
                  ? "Top Gastos"
                  : "Periódicos"}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setShowAll(true);
                }}
              >
                <MaterialCommunityIcons
                  name="arrow-expand"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </HStack>
            <FlatList
              mx={2}
              data={expenses}
              keyExtractor={(expense) => String(expense.id)}
              renderItem={({ item: expense }) => <Expense expense={expense} />}
            />
          </VStack>
        </SafeAreaView>
      )}
    </>
  );
}
