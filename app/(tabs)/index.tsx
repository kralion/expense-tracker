import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link } from "expo-router";
import { Button, HStack, Heading, Spacer, Text, VStack } from "native-base";
import * as React from "react";
import { Pressable, SafeAreaView, View } from "react-native";
import Card from "@/components/dashboard/card";
import { Expense } from "@/components/shared";
import { ExpenseSkeleton } from "@/components/skeletons/expense";
import { BudgetLimitExceededModal } from "@/components/shared";
import { expensesIdentifiers } from "@/constants/ExpensesIdentifiers";
import { useExpenseContext } from "@/context";
import { useNotificationContext } from "@/context";
import { supabase } from "@/utils/supabase";
import { Session } from "@supabase/supabase-js";

export default function Index() {
  const { expenses } = useExpenseContext();
  const { showNotification: show } = useNotificationContext();
  const [showNotification, setShowNotification] = React.useState(false);
  React.useEffect(() => {
    show({
      title: "Gasto Realizado",
      alertStatus: "success",
    });
  }, []);
  const [session, setSession] = React.useState<Session | null>(null);

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  return (
    <SafeAreaView className="bg-primary space-y-7">
      <View className="bg-primary space-y-7">
        <View className="flex flex-row justify-between items-center mx-4">
          <View>
            <Text className="text-mutedwhite text-[12px] ">20 Oct, Martes</Text>
            <Text className="font-bold text-[16px] text-white  tracking-tight">
              {session &&
                session.user &&
                `Hola, ${session.user.role} 👋
                `}
            </Text>
          </View>
          <Link href="/modal" asChild>
            <Pressable className="bg-accent rounded-md p-2 mr-3 active:opacity-70">
              {({ pressed }) => (
                <View className="flex flex-row items-center">
                  <Text className="font-semibold text-xm mr-2">
                    Prueba Premium
                  </Text>
                  <FontAwesome
                    name="diamond"
                    size={20}
                    style={{ opacity: pressed ? 0.5 : 1 }}
                  />
                </View>
              )}
            </Pressable>
          </Link>
        </View>
        <View className="flex flex-row justify-center items-center ">
          <Card />
        </View>
      </View>
      <VStack space={5} className="bg-slate-100">
        <BudgetLimitExceededModal
          setShowNotification={setShowNotification}
          showNotification={showNotification}
        />
        <HStack className="items-center" mx={3}>
          <Heading size="md">Historial de Gastos</Heading>

          <Spacer />
          <Button
            onPress={() => setShowNotification(true)}
            variant="subtle"
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
    </SafeAreaView>
  );
}
