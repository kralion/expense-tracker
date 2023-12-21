import { BudgetLimitExceededModal } from "@/components/popups";
import Card from "@/components/dashboard/card";
import { Expense } from "@/components/shared";
import { useExpenseContext } from "@/context";
import useAuth from "@/context/AuthContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link } from "expo-router";
import { Button, HStack, Heading, Text, VStack } from "native-base";
import * as React from "react";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { expenses } = useExpenseContext();
  const [showBudgetLimitNotification, setShowBudgetLimitNotification] =
    React.useState(false);
  const [isPremiumUser, setIsPremiumUser] = React.useState(false);
  const { userData } = useAuth();

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  return (
    <SafeAreaView className="bg-primary space-y-7  ">
      {userData ? (
        <HStack justifyContent="space-between" mx={4}>
          <VStack>
            <Text className="text-mutedwhite text-[12px] ">
              {capitalizeFirstLetter(
                new Date().toLocaleDateString("es-ES", {
                  weekday: "long",
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })
              )}
            </Text>
          </VStack>

          <Text className="font-bold text-[16px] text-white  tracking-tight">
            Hola, {userData.nombres} 👋
          </Text>
          <View>
            <Link href="/(modals)/buy-premium" asChild>
              <Button
                isPressed={true}
                colorScheme="A3E062"
                className="rounded-full active:opacity-70"
                variant="ghost"
              >
                <FontAwesome
                  color="#A3E062"
                  name={userData.rol === "premium" ? "unlock" : "lock"}
                  size={20}
                />
              </Button>
            </Link>
          </View>
        </HStack>
      ) : null}
      <View className="z-10 h-20">
        <Card isPremiumUser={isPremiumUser} />
      </View>
      <VStack space={5} className="bg-background rounded-t-3xl ">
        <BudgetLimitExceededModal
          setShowNotification={setShowBudgetLimitNotification}
          showNotification={showBudgetLimitNotification}
        />
        <HStack
          px={4}
          marginTop={100}
          className="items-center"
          justifyContent="space-between"
        >
          <Heading size="md">Historial de Gastos</Heading>

          <Button
            onPress={() => {
              setShowBudgetLimitNotification(true);
              // {
              //   showNotification({
              //     title: "Premium acquired",
              //     alertStatus: "success",
              //   });
            }}
            variant="ghost"
            className="rounded-lg"
            colorScheme="gray"
          >
            Ver Todo
          </Button>
        </HStack>
        <FlatList
          data={expenses}
          keyExtractor={(expense) => String(expense.id)}
          renderItem={({ item: expense }) => <Expense expense={expense} />}
        />
      </VStack>
    </SafeAreaView>
  );
}
