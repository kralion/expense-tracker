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
import Chart from "../../components/estadisticas/chart";

export default function Statistics() {
  const [queryType, setQueryType] = useState("recientes");
  const [timelineQuery, setTimelineQuery] = useState("mensual");
  const [topExpenses, setTopExpenses] = useState<IGasto[]>([]);
  const { getTopExpenses } = useExpenseContext();
  const [showAll, setShowAll] = React.useState(false);
  const fadeAnim = React.useRef(new Animated.Value(1)).current;
  React.useEffect(() => {
    const fetchTopExpenses = async () => {
      const expenses = await getTopExpenses();
      setTopExpenses(expenses);
    };
    fetchTopExpenses();
  }, []);
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
        <Animated.View style={{ opacity: fadeAnim }}>
          <SafeAreaView>
            <HStack space={4} justifyContent="space-between" px={4} my={7}>
              <Text className="text-xl text-muted font-semibold">
                Top Gastos
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
              data={topExpenses}
              renderItem={({ item }) => <Expense expense={item} />}
              keyExtractor={(item) => String(item.id)}
            />
          </SafeAreaView>
        </Animated.View>
      ) : (
        <SafeAreaView>
          <VStack space={4}>
            <Text className="font-bold text-center text-2xl">Estadísticas</Text>
            <HStack space={1.5} mx={1.5}>
              <Button
                variant="ghost"
                className="py-2.5 w-[90px]"
                borderRadius={5}
                isPressed={timelineQuery === "diario"}
                onPress={() => setTimelineQuery("diario")}
              >
                Diario
              </Button>
              <Button
                variant="ghost"
                isPressed={timelineQuery === "semanal"}
                className="py-2.5 w-[90px]  rounded-lg"
                onPress={() => setTimelineQuery("semanal")}
              >
                Semanal
              </Button>
              <Button
                variant="ghost"
                className="py-2.5 w-[90px] "
                isPressed={timelineQuery === "mensual"}
                onPress={() => setTimelineQuery("mensual")}
                borderRadius={5}
              >
                Mensual
              </Button>
              <Button
                variant="ghost"
                isPressed={timelineQuery === "anual"}
                className="py-2.5 w-[90px] "
                onPress={() => setTimelineQuery("anual")}
                borderRadius={5}
              >
                Anual
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
                Top Gastos
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
              data={topExpenses}
              keyExtractor={(expense) => String(expense.id)}
              renderItem={({ item: expense }) => <Expense expense={expense} />}
            />
          </VStack>
        </SafeAreaView>
      )}
    </>
  );
}
