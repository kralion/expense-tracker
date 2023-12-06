import SingleNotification from "@/components/app_notifications/notification";
import { VStack } from "native-base";
import * as React from "react";
import { ScrollView } from "react-native";

export default function PersonalInfo() {
  return (
    <ScrollView>
      <VStack space={3} marginTop={3}>
        <SingleNotification />
        <SingleNotification />
        <SingleNotification />
        <SingleNotification />
      </VStack>
    </ScrollView>
  );
}
