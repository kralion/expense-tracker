import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link } from "expo-router";
import { Button, HStack, Heading, Spacer, Text, VStack } from "native-base";
import * as React from "react";
import { Pressable, SafeAreaView, View } from "react-native";
import Card from "../../components/dashboard/card";
import Expense from "../../components/dashboard/expense";
import { supabase } from "../../utils/supabase";
import { IGasto } from "../../interfaces";

export default function Index() {
  const [expenses, setExpenses] = React.useState<IGasto[]>();

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
        <HStack className="items-center" mx={3}>
          <Heading size="md">Historial de Gastos</Heading>

          <Spacer />
          <Button variant="subtle" className="rounded-lg" colorScheme="gray">
            Ver Todo
          </Button>
        </HStack>
        <VStack space={4} className="mx-4">
          <Expense />
          <Expense />
          <Expense />
          <Expense />
        </VStack>
      </VStack>
    </SafeAreaView>
  );
}
