import { ExpenseContextProvider, NotificationContextProvider } from "@/context";
import { Entypo, FontAwesome5 as FontAwesome } from "@expo/vector-icons";
import { Tabs, router } from "expo-router";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import Colors from "../../constants/Colors";
import * as React from "react";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={25} style={{ marginBottom: -7 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <ExpenseContextProvider>
      <NotificationContextProvider>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
            tabBarStyle: {
              height: 90,
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
              tabBarIcon: ({ color }) => (
                <TabBarIcon name="tachometer-alt" color={color} />
              ),
            }}
          />

          <Tabs.Screen
            name="statistics"
            options={{
              title: "Historial",
              tabBarIcon: ({ color }) => (
                <TabBarIcon name="chart-bar" color={color} />
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
                    activeOpacity={0.6}
                  >
                    <Entypo name="plus" size={50} color="white" />
                  </TouchableOpacity>
                </View>
              ),
            }}
          />

          <Tabs.Screen
            name="wallet"
            options={{
              title: "Saldo",
              tabBarIcon: ({ color }) => (
                <TabBarIcon name="wallet" color={color} />
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
              tabBarIcon: ({ color }) => (
                <TabBarIcon name="user-alt" color={color} />
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
    left: -40,
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
