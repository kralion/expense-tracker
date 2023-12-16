import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Icon, IconButton } from "native-base";
import * as React from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";

export default function Card({ isPremiumUser }: { isPremiumUser: boolean }) {
  return (
    <LinearGradient
      className={`flex flex-col justify-between border-2 rounded-3xl p-5 shadow-2xl space-y-10 ${
        isPremiumUser ? " border-yellow-500 " : "border-indigo-500"
      } `}
      colors={
        isPremiumUser
          ? ["#D4AF37", "#FFD700", "#A79647"]
          : ["#6366F1", "#6D28D9"]
      }
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.cardStyle}
    >
      <View className="flex flex-row items-start justify-between">
        <View>
          <Text className="text-mutedwhite text-[18px]  font-semibold items-center space-x-2">
            Balance
          </Text>
          <Text className="text-3xl font-bold tracking-tighter  text-mutedwhite">
            S/. 4,651.0
          </Text>
        </View>
        <IconButton
          className="rounded-full"
          icon={
            <Icon as={Feather} color="white" size={25} name="more-horizontal" />
          }
        />
      </View>
      <Pressable className="flex    flex-row justify-between">
        <View className="flex flex-col gap-1">
          <View className="flex items-center flex-row space-x-1">
            <Text className="text-mutedwhite text-center items-center space-x-2">
              Ingresos
            </Text>
          </View>
          <Text className="text-xl font-semibold text-center text-mutedwhite">
            S/. 5,400
          </Text>
        </View>
        <View className="flex flex-col gap-1">
          <View className="flex items-center flex-row space-x-1">
            <Text className="text-mutedwhite text-center items-center space-x-2">
              Gastos
            </Text>
          </View>
          <Text className="text-xl font-semibold text-center text-mutedwhite">
            S/. 749.50
          </Text>
        </View>
      </Pressable>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  cardStyle: {
    width: "90%",
    height: 200,
    left: 21,
    position: "absolute",
    zIndex: 1,
  },
});
