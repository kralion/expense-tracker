import Card from "@/components/dashboard/card";
import BuyPremiumModal from "@/components/popups/buy-premium";
import { Expense } from "@/components/shared";
import { useExpenseContext, useNotificationContext } from "@/context";
import useAuth from "@/context/AuthContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  Box,
  Button,
  Center,
  HStack,
  Heading,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import NoDataAsset from "@/assets/svgs/no-data.svg";
import * as React from "react";
import { Animated, FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "@/utils/supabase";

export default function Index() {
  const fadeAnim = React.useRef(new Animated.Value(1)).current;
  const { expenses, fetchData } = useExpenseContext();
  const { userData, session } = useAuth();

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
      session_id: session?.user.id,
    };

    try {
      // Check if a notification already exists for the user
      const { data: existingNotifications, error: fetchError } = await supabase
        .from("notificaciones")
        .select("*")
        .eq("session_id", session?.user.id);

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
    if (session) {
      welcomeNotification();
      fetchData(session.user.id);
    }
  }, [session, isPremiumUser]);

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
                <Button
                  isPressed={true}
                  onPress={() => {
                    setShowBuyPremiumModal(true);
                  }}
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
                    my={16}
                    className="flex flex-col items-center justify-center"
                  >
                    <NoDataAsset width={200} height={200} />
                    <Text className="text-textmuted text-[18px] ">
                      No hay gastos registrados
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
