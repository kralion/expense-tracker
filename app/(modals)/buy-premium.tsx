import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Platform, StyleSheet, View, Text, SafeAreaView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function BuyPremiumModal() {
  return (
    <SafeAreaView>
      <View className="p-2 bg-primary">
        <View className="bg-accent rounded-md p-2 active:opacity-70 flex justify-between flex-row items-center">
          <FontAwesome name="diamond" size={20} />
        </View>
        <Text>hola</Text>
        <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      </View>
    </SafeAreaView>
  );
}
