import FontAwesome5 from "@expo/vector-icons/build/FontAwesome5";
import { Button, HStack, Select, VStack } from "native-base";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Chart from "../../components/estadisticas/chart";
export default function Statistics() {
  const [service, setService] = useState("gastos");
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
          colorScheme="teal"
          className="py-2.5 w-[90px]  rounded-lg"
          onPress={() => alert("Diario")}
        >
          Diario
        </Button>
        <Button
          variant="ghost"
          isPressed
          colorScheme="teal"
          className="py-2.5 w-[90px]  rounded-lg"
          onPress={() => alert("Semanal")}
        >
          Semanal
        </Button>
        <Button
          variant="ghost"
          colorScheme="teal"
          className="py-2.5 w-[90px]  rounded-lg"
          onPress={() => alert("Mensual")}
        >
          Mensual
        </Button>
        <Button
          variant="ghost"
          colorScheme="teal"
          className="py-2.5 w-[90px]  rounded-lg"
          onPress={() => alert("Anual")}
        >
          Anual
        </Button>
      </HStack>

      <Chart />
      <HStack alignItems="center" justifyContent="space-between" paddingX={4}>
        <Button
          size="sm"
          colorScheme="teal"
          variant="outline"
          onPress={() => alert("Exportar")}
          borderRadius={7}
        >
          Exportar
        </Button>
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
      <VStack space={4} className="mx-4"></VStack>
    </SafeAreaView>
  );
}
