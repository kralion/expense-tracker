import { FontAwesome5 } from "@expo/vector-icons";
import { Button, Center, Input, Select, TextArea, VStack } from "native-base";
import React, { useState } from "react";
import { Text, View } from "react-native";

export default function ExpenseEditModal() {
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  return (
    <View className="bg-primary rounded-b-xl">
      <View className="bg-background shadow-xl space-y-5 rounded-xl p-5 m-5">
        {/* //TODO: Change the value and selected value of each select component */}
        <VStack space={4}>
          <Select
            id="categorias"
            selectedValue={category}
            size="md"
            color="gray.800"
            minWidth="105"
            placeholder="Categoría"
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
            mt={1}
            onValueChange={(itemValue) => setCategory(itemValue)}
          >
            <Select.Item label="Transporte" value="transporte" />
            <Select.Item label="Alimentación" value="alimentacion" />
            <Select.Item label="Ropa" value="ropa" />
            <Select.Item label="Casuales" value="casuales" />
            <Select.Item label="Salud" value="salud" />
          </Select>
          <TextArea
            autoCompleteType
            placeholder="Descripción del Gasto"
            minH={20}
            borderRadius={7}
            size="md"
          />
          {/* //! Quiza despues se implemente esta feature */}
          {/* <Select
            id="tipo"
            borderRadius={7}
            selectedValue={type}
            size="md"
            color="gray.800"
            placeholder="Tipo"
            minWidth="105"
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
            mt={1}
            onValueChange={(itemValue) => setType(itemValue)}
          >
            <Select.Item label="Fijo" value="transporte" />
            <Select.Item label="Variable" value="variable" />
          </Select> */}
          <Input
            size="md"
            keyboardType="numeric"
            rightElement={
              <FontAwesome5
                name="dollar-sign"
                color="#6D6868"
                marginRight={10}
                size={10}
              />
            }
            placeholder="65.00"
            borderRadius={7}
          />
        </VStack>
        <Center>
          <Button width="100" className="rounded-full" marginTop={16}>
            Guardar
          </Button>
        </Center>
      </View>
      {/* //! Probar esto solo el los dispositivos, en los emuladores no funciona
      <PushNotification /> */}
    </View>
  );
}
