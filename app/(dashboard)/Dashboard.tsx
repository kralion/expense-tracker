import { Button, HStack, Heading, Spacer, Text, VStack } from "native-base";
import { SafeAreaView, View } from "react-native";
import Card from "../../components/dashboard/card";
import Expense from "../../components/dashboard/expense";
import AppLayout from "../../components/layout";
export default function Dashboard() {
  return (
    <AppLayout>
      <SafeAreaView className="bg-primary space-y-7">
        <View className="bg-primary space-y-7">
          <View className="flex flex-row justify-between items-center mx-4">
            <View>
              <Text className="text-mutedwhite text-[12px] ">
                20 Oct, Martes
              </Text>
              <Text className="font-bold text-[16px] text-white  tracking-tight">
                Hola, Brayan !
              </Text>
            </View>
            <Button
              colorScheme="lime"
              className="rounded-lg "
              // endIcon={<Gem size={15} color="#fff" />}
            >
              Actualiza a Premium
            </Button>
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
    </AppLayout>
  );
}
