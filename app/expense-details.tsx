import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";

import { Badge } from "native-base";
import { Text, View } from "../components/Themed";

export default function ExpenseDetails() {
  return (
    <View style={styles.container}>
      <Text className="text-2xl font-semibold">Detalles del Gasto</Text>
      <View className="flex flex-row justify-between items-center mx-4">
        <Badge colorScheme="success">Comida</Badge>
        <Text className="text-2xl font-semibold">S/ 20.00</Text>
      </View>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
