import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, Text, View, useColorScheme } from "react-native";
import Colors from "../../constants/Colors";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
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
            <TabBarIcon name="bar-chart" color={color} />
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
            <TabBarIcon size={60} name="plus-circle" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="wallet"
        options={{
          headerBackground: () => (
            <View className="bg-mutedwhite" style={{ flex: 1 }} />
          ),
          title: "",
          tabBarIcon: ({ color }) => <TabBarIcon name="money" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerBackground: () => (
            <View className="bg-accent" style={{ flex: 1 }} />
          ),
          title: "",
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}
