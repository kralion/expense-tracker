import { FontAwesome5 as FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { View, useColorScheme } from "react-native";
import Colors from "../../constants/Colors";
import { ExpenseContextProvider } from "@/context";
import { NotificationContextProvider } from "@/context";

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
              tabBarIcon: ({ color }) => (
                <TabBarIcon
                  className="rotate-45 text-accent"
                  size={55}
                  style={{ marginBottom: -25 }}
                  name="times-circle"
                  color={color}
                />
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
