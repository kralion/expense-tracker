import NoDataAsset from "@/assets/svgs/no-data.svg";
import { IGasto } from "@/interfaces";
import { supabase } from "@/utils/supabase";
import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  endOfYear,
  format,
  parseISO,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from "date-fns";
import { Alert, Box, HStack, useToast } from "native-base";
import React from "react";
import { Dimensions, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";

async function getExpensesDataByTimelineQuery(timelineQuery: string) {
  let startDate, endDate;
  switch (timelineQuery) {
    case "hoy":
      startDate = startOfDay(new Date()).toISOString();
      endDate = endOfDay(new Date()).toISOString();
      break;
    case "diario":
      startDate = startOfWeek(new Date(), { weekStartsOn: 1 }).toISOString();
      endDate = endOfWeek(new Date(), { weekStartsOn: 1 }).toISOString();
      break;
    case "semanal":
      startDate = startOfMonth(new Date()).toISOString();
      endDate = endOfMonth(new Date()).toISOString();
      break;
    case "mensual":
      startDate = startOfYear(new Date()).toISOString();
      endDate = endOfYear(new Date()).toISOString();
      break;
    default:
      throw new Error(`Invalid timelineQuery: ${timelineQuery}`);
  }
  const { data, error } = await supabase
    .from("expenses")
    .select("*")
    .gte("fecha", startDate)
    .lt("fecha", endDate);
  if (error) {
    console.log("Error al obtener los datos de la base de datos", error);
    return [];
  }

  return data;
}

export default function Chart({ timelineQuery }: { timelineQuery: string }) {
  const screenWidth = Dimensions.get("window").width;
  const [expensesData, setExpensesData] = React.useState<IGasto[]>([]);
  const toast = useToast();
  const fetchExpensesData = async () => {
    try {
      const data = await getExpensesDataByTimelineQuery(timelineQuery);
      setExpensesData(data);
    } catch (error) {
      toast.show({
        render: () => (
          <Alert variant="solid" rounded={10} px={5} status="error">
            <HStack space={2} alignItems="center">
              <Alert.Icon mt="1" />
              <Text className="text-white">
                Error al obtener los datos de la base de datos
              </Text>
            </HStack>
          </Alert>
        ),
        description: "",
        duration: 1000,
        placement: "top",
        variant: "solid",
      });
    }
  };
  React.useEffect(() => {
    fetchExpensesData();
  }, [getExpensesDataByTimelineQuery, timelineQuery, toast]);
  let labels;
  switch (timelineQuery) {
    case "hoy":
      labels = ["08:00", "11:00", "13:00", "17:00", "20:00", "24:00"];
      break;
    case "diario":
      labels = ["L", "M", "X", "J", "V", "S", "D"];
      break;
    case "semanal":
      labels = ["S1", "S2", "S3", "S4"];
      break;
    case "mensual":
      labels = ["E", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
      break;

    default:
      labels = expensesData.map((expense) => {
        const date = parseISO(expense.fecha);
        return format(date, "MMMM"); // e.g., May
      });
      break;
  }

  const data = expensesData.map((expense) => {
    const monto = isFinite(expense.monto) ? expense.monto : 0;
    return monto;
  });
  if (data.length === 0) {
    return (
      <Box my={10} className="flex flex-col items-center justify-center">
        <NoDataAsset width={200} height={200} />
        <Text className="text-zinc-400 mt-5 text-center text-sm px-10">
          Aún no tienes gastos registrados para este nivel de periodicidad
        </Text>
      </Box>
    );
  }

  return (
    <View>
      <LineChart
        data={{
          labels: labels,
          datasets: [
            {
              data: data,
            },
          ],
        }}
        width={screenWidth}
        height={300}
        yAxisInterval={1}
        chartConfig={{
          backgroundGradientFrom: "#FFFFFF",
          backgroundGradientTo: "#FFFFFF",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(54, 137, 131, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(109, 104, 104, ${opacity})`,
          strokeWidth: 4,
          propsForBackgroundLines: {
            opacity: 0.1,
          },

          propsForDots: {
            r: "4",
            strokeWidth: 0,
            stroke: "#FEFED5",
            fill: "#368983",
          },
        }}
        bezier
      />
    </View>
  );
}
