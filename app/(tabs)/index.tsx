import LockIcon from "@/assets/svgs/lock.svg";
import NoDataAsset from "@/assets/svgs/no-data.svg";
import Card from "@/components/dashboard/card";
import BuyPremiumModal from "@/components/popups/buy-premium";
import { Expense } from "@/components/shared";
import { useExpenseContext } from "@/context/ExpenseContext";
import useAuth from "@/context/AuthContext";
import { supabase } from "@/utils/supabase";
import {
  Box,
  Button,
  HStack,
  Heading,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import * as React from "react";
import { Animated, FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const fadeAnim = React.useRef(new Animated.Value(1)).current;
  const { getExpensesByUser, expenses } = useExpenseContext();
  const { userData } = useAuth();

  const [showAll, setShowAll] = React.useState(false);
  const [showBuyPremiumModal, setShowBuyPremiumModal] = React.useState(false);

  if (!userData) {
    return null;
  }
  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: showAll ? 1 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [showAll]);

  async function welcomeNotification() {
    const notification = {
      titulo: "Bienvenido !!!",
      descripcion:
        "Registrado exitosamente en la app, ahora puedes comenzar a usarla con el plan gratuito.",
      fecha: new Date().toISOString(),
      usuario_id: userData.id,
      tipo: "INFO",
    };

    const { data } = await supabase
      .from("notificaciones")
      .select("*")
      .eq("usuario_id", userData.id);

    if (data?.length === 0) {
      await supabase.from("notificaciones").insert(notification);
    }
  }
  React.useEffect(() => {
    if (userData) {
      welcomeNotification();
    }
  }, [userData]);

  React.useEffect(() => {
    if (userData) {
      getExpensesByUser(userData.id);
    }
  }, [userData, getExpensesByUser]);

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  return (
    <>
      {showAll ? (
        <Animated.View style={{ opacity: fadeAnim }}>
          <ScrollView className=" rounded-t-3xl ">
            <SafeAreaView>
              <VStack space={5} className="bg-background rounded-t-3xl ">
                <HStack
                  px={4}
                  mt={4}
                  className="items-center"
                  justifyContent="space-between"
                >
                  <Heading size="md">Historial de Gastos</Heading>

                  <Button
                    onPress={() => {
                      setShowAll(false);
                    }}
                    variant="ghost"
                    className="rounded-lg "
                    colorScheme="gray"
                  >
                    Ver Menos
                  </Button>
                </HStack>
                <FlatList
                  data={expenses}
                  keyExtractor={(expense) => String(expense.id)}
                  renderItem={({ item: expense }) => (
                    <Expense expense={expense} />
                  )}
                />
              </VStack>
            </SafeAreaView>
          </ScrollView>
        </Animated.View>
      ) : (
        <SafeAreaView className="bg-primary  ">
          <View className="space-y-7 ">
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
                  Hola, {userData.nombres} 👋
                </Text>
              </VStack>
              <BuyPremiumModal
                setOpenModal={setShowBuyPremiumModal}
                openModal={showBuyPremiumModal}
              />
              <View>
                <LockIcon
                  onPress={() => {
                    setShowBuyPremiumModal(true);
                  }}
                  className="text-white drop-shadow-lg "
                  width={36}
                  height={36}
                />
              </View>
            </HStack>

            <View className="z-10 h-20">
              <Card />
            </View>
            <ScrollView className=" rounded-t-3xl  ">
              <VStack space={2} className="bg-white h-screen rounded-t-3xl ">
                <HStack
                  px={4}
                  marginTop={110}
                  className="items-center"
                  justifyContent="space-between"
                >
                  <Heading size="md">Historial de Gastos</Heading>

                  <Button
                    onPress={() => {
                      setShowAll(true);
                    }}
                    variant="ghost"
                    className="rounded-lg"
                    colorScheme="gray"
                  >
                    Ver Todo
                  </Button>
                </HStack>
                {expenses && expenses.length === 0 && (
                  <Box
                    my={10}
                    className="flex flex-col items-center justify-center"
                  >
                    <NoDataAsset width={200} height={200} />
                    <Text className="text-zinc-400 mt-5 text-center text-sm px-10">
                      Parece que no tienes gastos registrados, haz click en el
                      icono + para agregar uno.
                    </Text>
                  </Box>
                )}

                <FlatList
                  data={expenses}
                  keyExtractor={(expense) => String(expense.id)}
                  renderItem={({ item: expense }) => (
                    <Expense expense={expense} />
                  )}
                />
              </VStack>
            </ScrollView>
          </View>
        </SafeAreaView>
      )}
    </>
  );
}
function uuid() {
  throw new Error("Function not implemented.");
}
