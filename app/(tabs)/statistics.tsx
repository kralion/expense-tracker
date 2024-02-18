import { Expense } from "@/components/shared";
import { useExpenseContext } from "@/context";
import {
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Link } from "expo-router";
import { Button, FlatList, HStack, Select } from "native-base";
import * as React from "react";
import { useState } from "react";
import { Text, TouchableOpacity, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Chart from "../../components/estadisticas/chart";
import { IGasto } from "@/interfaces";

export default function Statistics() {
  const [service, setService] = useState("gastos");
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
              className="py-2.5 w-[90px]"
              borderRadius={5}
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
              className="py-2.5 w-[90px] "
              onPress={() => alert("Mensual")}
              borderRadius={5}
            >
              Mensual
            </Button>
            <Button
              disabled
              variant="ghost"
              className="py-2.5 w-[90px] "
              onPress={() => alert("Anual")}
              borderRadius={5}
            >
              Anual
            </Button>
          </HStack>

          <Chart />
          <HStack
            alignItems="center"
            justifyContent="space-between"
            paddingX={4}
          >
            <Link asChild href="/(modals)/export-data">
              <Button
                startIcon={
                  <FontAwesome
                    name="file-pdf-o"
                    color="white"
                    marginRight={2}
                  />
                }
                borderRadius={5}
              >
                Exportar
              </Button>
            </Link>
            <Select
              selectedValue={service}
              minWidth="150"
              size="lg"
              borderRadius={5}
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
        </SafeAreaView>
      )}
    </>
  );
}
