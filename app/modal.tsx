import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Platform, StyleSheet } from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import { Text, View } from "../components/Themed";

type TUsuario = {
  id: number;
  nombre: string;
  correo: string;
  password: string;
};

export default function ModalScreen() {
  return (
    <View className="p-2 bg-primary">
      <View className="bg-accent rounded-md p-2 active:opacity-70 flex justify-between flex-row items-center">
        <Text className="font-semibold text-xm mr-2">
          Adquisicion de la Version premium
        </Text>
        <FontAwesome name="diamond" size={20} />
      </View>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

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
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
