import { Button, Select, Stack } from "native-base";
import { useState } from "react";
import { Text, View, Pressable } from "react-native";
import Expenses from "../../components/dashboard/expenses";
import Chart from "../../components/estadisticas/chart";
import AppLayout from "../../components/layout";
export default function Statistics() {
  const [service, setService] = useState("gastos");
  return (
    <AppLayout>
      <Text className="font-bold text-center text-2xl">Estadísticas</Text>
      <Stack
        direction={{
          base: "row",
          md: "row",
        }}
        space={1.5}
        alignItems={{
          base: "center",
          md: "flex-start",
        }}
        className="my-5"
      >
        <Button
          variant="ghost"
          colorScheme="teal"
          className="py-2.5 w-[90px]  rounded-lg"
          onPress={() => console.log("hello world")}
        >
          Diario
        </Button>
        <Button
          variant="ghost"
          isPressed
          colorScheme="teal"
          className="py-2.5 w-[90px]  rounded-lg"
          onPress={() => console.log("hello world")}
        >
          Semanal
        </Button>
        <Button
          variant="ghost"
          colorScheme="teal"
          className="py-2.5 w-[90px]  rounded-lg"
          onPress={() => console.log("hello world")}
        >
          Mensual
        </Button>
        <Button
          variant="ghost"
          colorScheme="teal"
          className="py-2.5 w-[90px]  rounded-lg"
          onPress={() => console.log("hello world")}
        >
          Anual
        </Button>
      </Stack>

      <Stack className="flex justify-between flex-row mb-6">
        <Button
          size="sm"
          colorScheme="teal"
          className="py-2.5 w-[90px]  rounded-lg"
          variant="outline"
        >
          Exportar
        </Button>
        <Select
          selectedValue={service}
          minWidth="105"
          // dropdownIcon={<ChevronDown size={20} className="mr-1.5" />}
          _selectedItem={{
            bg: "teal.500",
            // endIcon: <CheckIcon size={15} />,
          }}
          mt={1}
          onValueChange={(itemValue) => setService(itemValue)}
        >
          <Select.Item label="Gastos" value="gastos" />
          <Select.Item label="Ingresos" value="ingresos" />
        </Select>
      </Stack>
      <Chart />
      <View className=" flex-row m-4 items-center  justify-between ">
        <Text className="text-xl text-muted font-semibold">Gastos Altos</Text>
        <Pressable>{/* <ArrowUpDown color="gray" size={20} /> */}</Pressable>
      </View>
      <Expenses />
      <Expenses />
    </AppLayout>
  );
}
