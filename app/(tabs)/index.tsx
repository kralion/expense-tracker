import { BudgetLimitExceededModal } from "@/components/app_notifications/budget-limit-exceeded";
import Card from "@/components/dashboard/card";
import { Expense } from "@/components/shared";
import { useExpenseContext } from "@/context";
import { supabase } from "@/utils/supabase";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Session } from "@supabase/supabase-js";
import { Link } from "expo-router";
import { Button, HStack, Heading, Text, VStack } from "native-base";
import * as React from "react";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { expenses } = useExpenseContext();
  const [showBudgetLimitNotification, setShowBudgetLimitNotification] =
    React.useState(false);
  const [nombres, setNombres] = React.useState("");
  const [isPremiumUser, setIsPremiumUser] = React.useState(false);
  const [session, setSession] = React.useState<Session | null>(null);
  async function fetchUserName(userId: string) {
    const { data, error } = await supabase
      .from("usuarios_expense")
      .select("nombres")
      .eq("id", userId)
      .single();

    if (error) {
      console.error(error.code);
    } else if (data) {
      setNombres(data.nombres);
    }
  }
  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    if (session?.user?.id) {
      fetchUserName(session.user.id);
    }
  }, [session?.user?.id]);
  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  return (
    <SafeAreaView className="bg-primary space-y-7 ">
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
          <Text className="font-bold text-[16px] text-white  tracking-tight">
            Hola, {nombres} 👋
          </Text>
        </VStack>

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
                name={session?.user.role === "premium" ? "unlock" : "lock"}
                size={20}
              />
            </Button>
          </Link>
        </View>
      </HStack>
      <View className="z-10 h-20">
        <Card isPremiumUser={isPremiumUser} />
      </View>
      <VStack space={5} className="bg-background ">
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
