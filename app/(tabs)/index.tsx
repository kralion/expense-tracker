import { BudgetLimitExceededModal } from "@/components/popups";
import Card from "@/components/dashboard/card";
import { Expense } from "@/components/shared";
import { useExpenseContext, useNotificationContext } from "@/context";
import useAuth from "@/context/AuthContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link } from "expo-router";
import { Button, HStack, Heading, ScrollView, Text, VStack } from "native-base";
import * as React from "react";
import { FlatList, View, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BuyPremiumModal from "@/components/popups/buy-premium";

export default function Index() {
  const fadeAnim = React.useRef(new Animated.Value(1)).current;
  const { expenses } = useExpenseContext();
  const [showBudgetLimitNotification, setShowBudgetLimitNotification] =
    React.useState(false);
  const [showAll, setShowAll] = React.useState(false);
  const [showBuyPremiumModal, setShowBuyPremiumModal] = React.useState(false);

  const { showNotification } = useNotificationContext();
  const [isPremiumUser, setIsPremiumUser] = React.useState(false);
  const { userData } = useAuth();
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

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  return (
    <>
      {showAll ? (
        <Animated.View style={{ opacity: fadeAnim }}>
          <SafeAreaView>
            <ScrollView className=" rounded-t-3xl ">
              <VStack space={5} className="bg-background rounded-t-3xl ">
                {/* <BudgetLimitExceededModal
            setShowNotification={setShowBudgetLimitNotification}
            showNotification={showBudgetLimitNotification}
          /> */}
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
            </ScrollView>
          </SafeAreaView>
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
            <ScrollView className=" rounded-t-3xl ">
              <VStack space={5} className="bg-background rounded-t-3xl ">
                {/* <BudgetLimitExceededModal
            setShowNotification={setShowBudgetLimitNotification}
            showNotification={showBudgetLimitNotification}
          /> */}
                <HStack
                  px={4}
                  marginTop={100}
                  className="items-center"
                  justifyContent="space-between"
                >
                  <Heading size="md">Historial de Gastos</Heading>

                  <Button
                    onPress={() => {
                      // setShowBudgetLimitNotification(true);
                      // {
                      setShowAll(true);
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
