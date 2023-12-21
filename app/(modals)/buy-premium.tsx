import Stripe from "@/components/payment/stripe";
import Yape from "@/components/payment/yape";
import useAuth from "@/context/AuthContext";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Button, Divider, HStack, ScrollView, VStack } from "native-base";
import * as React from "react";
import { Dimensions, Image, Platform, Pressable, Text } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BuyPremiumModal() {
  const [yapePaymentMethod, setYapePaymentMethod] = React.useState(false);
  const [cardPaymentMethod, setCardPaymentMethod] = React.useState(true);
  const screenWidth = Dimensions.get("window").width;
  const { userData } = useAuth();
  const animation = useSharedValue(0);
  const handlePress = (index: number) => {
    animation.value = withTiming((index * screenWidth) / 2.4, {
      duration: 300,
    });
  };

  const handleYapePayment = () => {
    setYapePaymentMethod(true);
    setCardPaymentMethod(false);
    handlePress(1);
  };
  const handleCardPayment = () => {
    setYapePaymentMethod(false);
    setCardPaymentMethod(true);
    handlePress(0);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <VStack space={5} className="p-7  bg-primary">
          <Text className=" text-xl font-bold text-white ">
            Confirma tus datos de pago
          </Text>
          <Divider color="gray.100" h={0.2} />
          <Text className=" font-semibold text-white ">
            Información de Facturación
          </Text>
          <HStack justifyContent="space-between">
            <HStack space={3} alignItems="center">
              <Image
                source={{
                  uri: "https://userstock.io/data/wp-content/uploads/2017/09/bewakoof-com-official-219589-300x300.jpg",
                }}
                alt="profile-pic"
                width={50}
                height={50}
                className="rounded-full "
              />
              <VStack>
                <Text className="font-bold text-white ">
                  {"Brayan Joan" || userData?.nombres}
                </Text>
                <Text className="text-white ">
                  {"Usuario General" || userData.rol === "premium"
                    ? "Plan Actual Premium"
                    : "Plan Actual Básico"}
                </Text>
              </VStack>
            </HStack>
            <Link href="/(modals)/personal-info">
              <Button size="sm" variant="solid" bg={"white"}>
                <Text className=" ">Editar</Text>
              </Button>
            </Link>
          </HStack>
          <Divider color="gray.100" h={0.3} />

          <Text className=" font-semibold text-white ">Método de Pago</Text>
          <VStack space={4}>
            <HStack bg="white" justifyContent="center" p={1} rounded={7}>
              <Animated.View
                style={[
                  {
                    position: "absolute",
                    top: 4,
                    left: 4,
                    width: "50%",
                    borderRadius: 7,
                    height: "100%",
                    backgroundColor: "#d1d5db",
                  },
                  useAnimatedStyle(() => {
                    return {
                      transform: [{ translateX: animation.value }],
                    };
                  }),
                ]}
              />
              <Pressable className="p-2 w-1/2  " onPress={handleCardPayment}>
                <Text className="font-semibold text-center">
                  Tarjeta Bancaria
                </Text>
              </Pressable>
              <Pressable className=" p-2 w-1/2 " onPress={handleYapePayment}>
                <Text className="font-semibold text-center">Yape</Text>
              </Pressable>
            </HStack>

            {cardPaymentMethod ? <Stripe /> : <Yape />}
          </VStack>
          <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
