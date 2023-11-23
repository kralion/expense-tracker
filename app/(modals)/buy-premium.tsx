import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Platform, StyleSheet, View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function BuyPremiumModal() {
  return (
    <View className="p-2 bg-primary">
      <View className="bg-accent rounded-md p-2 active:opacity-70 flex justify-between flex-row items-center">
        <FontAwesome name="diamond" size={20} />
      </View>
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
