import { FontAwesome5 as FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { View, useColorScheme } from "react-native";
import Colors from "../../constants/Colors";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -7 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerStyle: {
          backgroundColor: "#F5F3F3",
        },
        tabBarStyle: {
          height: 100,
        },
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />

      <Tabs.Screen
        name="statistics"
        options={{
          title: "",
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
              className="rotate-45"
              size={60}
              style={{ marginBottom: -15 }}
              name="times-circle"
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="wallet"
        options={{
          title: "",
          tabBarIcon: ({ color }) => <TabBarIcon name="wallet" color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerBackground: () => (
            <View className="bg-accent" style={{ flex: 1 }} />
          ),
          title: "",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="user-alt" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
