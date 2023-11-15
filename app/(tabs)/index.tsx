import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link } from "expo-router";
import { Button, HStack, Heading, Spacer, Text, VStack } from "native-base";
import * as React from "react";
import { Pressable, SafeAreaView, View } from "react-native";
import Card from "../../components/dashboard/card";
import Expense from "../../components/dashboard/expense";
import { supabase } from "../../utils/supabase";
import { IGasto } from "../../interfaces";
import { ExpenseSkeleton } from "../../components/skeletons/expense";
import { Notification } from "../../components/notification";
type expenseIcon = {
  label: string;
  iconHref: string;
};

export default function Index() {
  const [expenses, setExpenses] = React.useState<IGasto[]>();
  const icons: expenseIcon[] = [
    {
      label: "Hogar",
      iconHref: "https://img.icons8.com/?size=160&id=iJzm3AFQCS4W&format=png",
    },
    {
      label: "Transporte",
      iconHref: "https://img.icons8.com/?size=160&id=Q2m4bLp5g5kF&format=png",
    },
    {
      label: "Salud",
      iconHref: "https://img.icons8.com/?size=160&id=9shlfoGKqCS7&format=png",
    },
    {
      label: "Entretenimiento",
      iconHref: "https://img.icons8.com/?size=160&id=nMSSSpYre8pz&format=png",
    },
    {
      label: "Comida",
      iconHref: "https://img.icons8.com/?size=160&id=dkL9eYC61t89&format=png",
    },
    {
      label: "Finanzas",
      iconHref: "https://img.icons8.com/?size=160&id=yUTNKgUuTlsA&format=png",
    },
    {
      label: "Educación",
      iconHref: "https://img.icons8.com/?size=160&id=XAg8ooTyo7Dl&format=png",
    },
    {
      label: "Personal",
      iconHref: "https://img.icons8.com/?size=160&id=7Ego1HgHexLw&format=png",
    },
    {
      label: "Otros",
      iconHref: "https://img.icons8.com/?size=160&id=MjAYkOMsbYOO&format=png",
    },
  ];
  const [showNotification, setShowNotification] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from("gastos").select("*");
      setExpenses(JSON.parse(JSON.stringify(data)));
    };
    fetchData();
  }, [expenses]);
  return (
    <SafeAreaView className="bg-primary space-y-7">
      <View className="bg-primary space-y-7">
        <View className="flex flex-row justify-between items-center mx-4">
          <View>
            <Text className="text-mutedwhite text-[12px] ">20 Oct, Martes</Text>
            <Text className="font-bold text-[16px] text-white  tracking-tight">
              Hola, Brayan !
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
        <Notification
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
                  icons.find((icon) => icon.label === expense.categoría)
                    ?.iconHref ||
                  "https://img.icons8.com/?size=160&id=MjAYkOMsbYOO&format=png"
                }
                categoría={expense.categoría}
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
