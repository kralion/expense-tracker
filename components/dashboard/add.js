import {
  ArrowDownUp,
  ArrowLeft,
  ChevronDown,
  CheckIcon,
} from "lucide-react-native";
import { Button, Center, Input, Select, TextArea, VStack } from "native-base";
import React, { useState } from "react";
import { Text, View } from "react-native";

export default function AddExpense() {
  const [service, setService] = useState("transporte");
  return (
    <View className="bg-primary">
      <View className="flex justify-between flex-row">
        <ArrowLeft size={25} color="white" />
        <Text className="font-bold text-center text-xl text-white">Añadir</Text>
        <ArrowDownUp size={25} color="white" />
      </View>
      <View className="bg-mutedwhite space-y-5 rounded-3xl p-5 m-5">
        <Text className="font-semibold text-left text-xl ">
          Datos del Gasto
        </Text>
        {/* //TODO: Change the value and selected value of each select component */}
        <VStack space={4}>
          <Select
            id="categorias"
            variant="rounded"
            selectedValue={service}
            size="md"
            color="gray.400"
            minWidth="105"
            dropdownIcon={
              <ChevronDown size={20} className="mr-2 text-textmuted" />
            }
            _selectedItem={{
              bg: "teal.500",
              endIcon: <CheckIcon size={15} />,
            }}
            mt={1}
            onValueChange={(itemValue) => setService(itemValue)}
          >
            <Select.Item label="Transporte" value="transporte" />
            <Select.Item label="Alimentación" value="alimentacion" />
            <Select.Item label="Ropa" value="ropa" />
            <Select.Item label="Casuales" value="casuales" />
            <Select.Item label="Salud" value="salud" />
          </Select>
          <TextArea placeholder="Descripción del Gasto" minH={20} />
          <Select
            id="tipo"
            variant="rounded"
            selectedValue={service}
            size="md"
            color="gray.400"
            minWidth="105"
            dropdownIcon={
              <ChevronDown size={20} className="mr-2 text-textmuted" />
            }
            _selectedItem={{
              bg: "teal.500",
              endIcon: <CheckIcon size={15} />,
            }}
            mt={1}
            onValueChange={(itemValue) => setService(itemValue)}
          >
            <Select.Item label="Fijo" value="transporte" />
            <Select.Item label="Variable" value="variable" />
          </Select>
          <Input size="md" placeholder="Monto" type="text" variant="rounded" />
        </VStack>
        <Center>
          <Button
            colorScheme="teal"
            width="100"
            className="rounded-xl"
            marginTop={16}
          >
            Guardar
          </Button>
        </Center>
      </View>
    </View>
  );
}
