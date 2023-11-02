import React from "react";
import { Button } from "native-base";
import { Text, View } from "react-native";

export default function Notifications2() {
  return (
    <View>
      <Text>Notifications</Text>
      <Button onPress={() => alert("clicked")}>Click me</Button>
    </View>
  );
}
