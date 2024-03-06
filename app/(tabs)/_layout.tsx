import { ExpenseContextProvider, NotificationContextProvider } from "@/context";
import { Entypo } from "@expo/vector-icons";
import { Tabs, router } from "expo-router";
import * as React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import Colors from "@/constants/Colors";
import NotAllowed from "@/components/popups/not-allowed";
import { Image } from "expo-image";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <ExpenseContextProvider>
      <NotificationContextProvider>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
            tabBarStyle: {
              height: 80,
              paddingTop: 10,
            },
            tabBarHideOnKeyboard: true,
            headerShown: false,
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Inicio",
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <Image
                  style={{ width: 28, height: 28, tintColor: color }}
                  source={{
                    uri: focused
                      ? "https://api.iconify.design/mingcute:home-4-fill.svg"
                      : "https://api.iconify.design/mingcute:home-4-line.svg",
                  }}
                  alt="google"
                />
              ),
            }}
          />

          <Tabs.Screen
            name="statistics"
            options={{
              title: "Reportes",
              tabBarIcon: ({ color, focused }) => (
                <Image
                  style={{ width: 28, height: 28, tintColor: color }}
                  source={{
                    uri: focused
                      ? "https://api.iconify.design/mingcute:chart-vertical-fill.svg"
                      : "https://api.iconify.design/mingcute:chart-vertical-line.svg",
                  }}
                  alt="google"
                />
              ),
              headerShown: false,
            }}
          />
          <Tabs.Screen
            name="add-expense"
            options={{
              title: "",
              headerShown: false,
              tabBarIcon: () => (
                <View>
                  <TouchableOpacity
                    style={styles.customTabStyle}
                    onPress={() => router.push("/(tabs)/add-expense")}
                    activeOpacity={0.8}
                  >
                    <Entypo name="plus" size={40} color="white" />
                  </TouchableOpacity>
                </View>
              ),
            }}
          />

          <Tabs.Screen
            name="wallet"
            options={{
              title: "Saldo",
              tabBarIcon: ({ color, focused }) => (
                <Image
                  style={{ width: 28, height: 28, tintColor: color }}
                  source={{
                    uri: focused
                      ? "https://api.iconify.design/mingcute:wallet-4-fill.svg"
                      : "https://api.iconify.design/mingcute:wallet-4-line.svg",
                  }}
                  alt="google"
                />
              ),
              headerShown: false,
            }}
          />

          <Tabs.Screen
            name="profile"
            options={{
              headerBackground: () => (
                <View className="bg-accent" style={{ flex: 1 }} />
              ),
              title: "Perfil",
              tabBarIcon: ({ color, focused }) => (
                <Image
                  style={{ width: 28, height: 28, tintColor: color }}
                  source={{
                    uri: focused
                      ? "https://api.iconify.design/mingcute:user-3-fill.svg"
                      : "https://api.iconify.design/mingcute:user-3-line.svg",
                  }}
                  alt="google"
                />
              ),
            }}
          />
        </Tabs>
      </NotificationContextProvider>
    </ExpenseContextProvider>
  );
}
const styles = StyleSheet.create({
  customTabStyle: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    position: "absolute",
    marginBottom: -25,
    left: -35,
    bottom: 10,
    borderRadius: 50,
    padding: 10,
    backgroundColor: "#6366F1",
    shadowOpacity: 0.3,
    borderWidth: 1.5,
    borderColor: "#979AEE",
    shadowRadius: 3.84,
    elevation: 5,
  },
});
