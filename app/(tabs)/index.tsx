import NoDataAsset from "@/assets/svgs/no-data.svg";
import Card from "@/components/dashboard/card";
import BuyPremiumModal from "@/components/popups/buy-premium";
import { Expense } from "@/components/shared";
import { useExpenseContext, useNotificationContext } from "@/context";
import useAuth from "@/context/AuthContext";
import { supabase } from "@/utils/supabase";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Image } from "expo-image";
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
import LockIcon from "@/assets/svgs/lock.svg";
import { IGasto } from "@/interfaces";

export default function Index() {
  const fadeAnim = React.useRef(new Animated.Value(1)).current;
  const { getExpensesByUser, expenses } = useExpenseContext();
  const { userData } = useAuth();

  const [showAll, setShowAll] = React.useState(false);
  const [showBuyPremiumModal, setShowBuyPremiumModal] = React.useState(false);

  const { showNotification } = useNotificationContext();
  const [isPremiumUser, setIsPremiumUser] = React.useState(userData.rol);
  if (!userData) {
    return null;
  }
  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: showAll ? 1 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [showAll, isPremiumUser]);

  async function welcomeNotification() {
    const notification = {
      titulo: "Bienvenido !!!",
      descripcion:
        "Registrado exitosamente en la app, ahora puedes comenzar a usarla con el plan gratuito.",
      fecha: new Date().toISOString(),
      icono: {
        uri: "https://img.icons8.com/color/96/000000/checked--v1.png",
      },
      usuario_id: userData.id,
    };

    try {
      // Check if a notification already exists for the user
      const { data: existingNotifications, error: fetchError } = await supabase
        .from("notificaciones")
        .select("*")
        .eq("usuario_id", userData.id);

      if (fetchError) {
        console.error("Error fetching notifications:", fetchError);
        return;
      }

      // If no notification exists for the user, create a new one
      if (existingNotifications.length === 0) {
        const { data, error } = await supabase
          .from("notificaciones")
          .insert([notification]);

        if (error) {
          console.error("Error inserting notification:", error);
        } else {
          console.log("Notification inserted:", data);
        }
      }
    } catch (error) {
      console.error("Unexpected error:", error);
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
  }, [userData, isPremiumUser]);

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
              <Card isPremiumUser={isPremiumUser} />
            </View>
            <ScrollView className=" rounded-t-3xl  ">
              <VStack
                space={5}
                className="bg-background h-screen rounded-t-3xl "
              >
                <HStack
                  px={4}
                  marginTop={120}
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
