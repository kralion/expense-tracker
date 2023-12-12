import Card from "@/components/dashboard/card";
import { BudgetLimitExceededModal, Expense } from "@/components/shared";
import { ExpenseSkeleton } from "@/components/skeletons/expense";
import { expensesIdentifiers } from "@/constants/ExpensesIdentifiers";
import { useExpenseContext, useNotificationContext } from "@/context";
import { supabase } from "@/utils/supabase";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Session } from "@supabase/supabase-js";
import { Link } from "expo-router";
import { Button, HStack, Heading, Text, VStack } from "native-base";
import * as React from "react";
import { SafeAreaView, ScrollView, View } from "react-native";

export default function Index() {
  const { expenses } = useExpenseContext();
  const [showBudgetLimitNotification, setShowBudgetLimitNotification] =
    React.useState(false);
  const [nombres, setNombres] = React.useState("");
  const { showNotification } = useNotificationContext();

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
  return (
    <SafeAreaView className="bg-primary space-y-7 ">
      <ScrollView>
        <HStack justifyContent="space-between" mx={4}>
          <VStack>
            <Text className="text-mutedwhite text-[12px] ">
              {
                new Date()
                  .toLocaleDateString("es-ES", {
                    weekday: "long",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                  .split(",")[1]
              }
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
          <Card />
        </View>
        <VStack space={5} className="bg-background ">
          <BudgetLimitExceededModal
            setShowNotification={setShowBudgetLimitNotification}
            showNotification={showBudgetLimitNotification}
          />
          <HStack
            marginTop={100}
            className="items-center"
            mx={3}
            justifyContent="space-between"
          >
            <Heading size="md">Historial de Gastos</Heading>

            <Button
              onPress={() =>
                // {setShowBudgetLimitNotification(true)
                {
                  showNotification({
                    title: "Premium acquired",
                    alertStatus: "success",
                  });
                }
              }
              variant="ghost"
              className="rounded-lg"
              colorScheme="gray"
            >
              Ver Todo
            </Button>
          </HStack>
          <VStack space={4} className="mx-2">
            {expenses?.map((expense) => (
              <React.Suspense fallback={<ExpenseSkeleton />}>
                <Expense
                  key={expense.id}
                  id={expense.id}
                  assetIdentificador={
                    expensesIdentifiers.find(
                      (icon) => icon.label === expense.categoria
                    )?.iconHref ||
                    "https://img.icons8.com/?size=160&id=MjAYkOMsbYOO&format=png"
                  }
                  categoria={expense.categoria}
                  cantidad={expense.cantidad}
                  fecha={expense.fecha}
                />
              </React.Suspense>
            ))}
          </VStack>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
