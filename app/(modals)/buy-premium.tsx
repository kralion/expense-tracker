import Stripe from "@/components/payment/stripe";
import Yape from "@/components/payment/yape";
import useAuth from "@/context/AuthContext";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Divider, HStack, ScrollView, VStack } from "native-base";
import * as React from "react";
import {
  Animated as AnimatedRN,
  Dimensions,
  Image,
  Platform,
  Pressable,
  Text,
  TouchableOpacity,
} from "react-native";
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
  const fadeAnimCard = React.useRef(new AnimatedRN.Value(1)).current;
  const fadeAnimYape = React.useRef(new AnimatedRN.Value(1)).current;
  React.useEffect(() => {
    AnimatedRN.timing(fadeAnimCard, {
      toValue: yapePaymentMethod ? 0 : 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [yapePaymentMethod]);

  React.useEffect(() => {
    AnimatedRN.timing(fadeAnimYape, {
      toValue: cardPaymentMethod ? 0 : 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [cardPaymentMethod]);

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
    <ScrollView>
      <SafeAreaView className=" h-screen pt-6 bg-primary">
        <VStack space={5} className="px-6">
          <HStack justifyContent="space-between" alignItems="center">
            <Text className=" text-xl font-bold text-white ">
              Información de Compra
            </Text>
            <TouchableOpacity onPress={() => router.back()}>
              <AntDesign name="close" size={20} color="white" />
            </TouchableOpacity>
          </HStack>
          <Divider color="gray.100" h={0.2} />

          <HStack justifyContent="space-between" alignItems="center">
            <HStack space={3} alignItems="center">
              <Image
                source={{
                  //TODO change to user avatar
                  // uri: userData?.perfil.uri,
                  uri: "https://img.icons8.com/?size=40&id=23454&format=png",
                }}
                alt="profile-pic"
                width={50}
                height={50}
                className="rounded-full "
              />
              <VStack>
                <Text className="font-bold text-white ">
                  {userData?.nombres}
                </Text>
                <Text className="text-white ">
                  {userData.rol === "premium"
                    ? "Plan Actual Premium"
                    : "Plan Actual Básico"}
                </Text>
              </VStack>
            </HStack>
            <TouchableOpacity
              onPress={() => router.push("/(modals)/personal-info")}
            >
              <AntDesign name="edit" size={20} color="#A3E062" />
            </TouchableOpacity>
          </HStack>
          <Divider h={0.3} />

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

            {cardPaymentMethod ? (
              <AnimatedRN.View style={{ opacity: fadeAnimCard }}>
                <Stripe />
              </AnimatedRN.View>
            ) : (
              <AnimatedRN.View style={{ opacity: fadeAnimYape }}>
                <Yape />
              </AnimatedRN.View>
            )}
          </VStack>
          <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
        </VStack>
      </SafeAreaView>
    </ScrollView>
  );
}
