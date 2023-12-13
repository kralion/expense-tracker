import { StatusBar } from "expo-status-bar";
import * as React from "react";
import {
  Platform,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Pressable,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Stripe from "@/components/payment/stripe";
import { HStack, VStack, Button } from "native-base";
import { Image } from "react-native";
import { supabase } from "@/utils/supabase";
import { Session } from "@supabase/supabase-js";
import { Link, router } from "expo-router";
import { useFonts } from "expo-font";
import Animated, {
  useAnimatedStyle,
  withTiming,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import Yape from "@/components/payment/yape";

export default function BuyPremiumModal() {
  const [loaded, error] = useFonts({
    Miniver: require("@/assets/fonts/Miniver-Regular.ttf"),
    ...FontAwesome.font,
  });
  const [session, setSession] = React.useState<Session | null>(null);
  const [name, setName] = React.useState("");
  const [yapePaymentMethod, setYapePaymentMethod] = React.useState(false);
  const [cardPaymentMethod, setCardPaymentMethod] = React.useState(true);
  async function signOut() {
    await supabase.auth.signOut();
    router.push("/(auth)/sign-in");
  }
  const animation = useSharedValue(0);
  const handlePress = (index) => {
    animation.value = withTiming(index * 170, { duration: 300 });
  };

  async function fetchUserName(userId: string) {
    const { data, error } = await supabase
      .from("app_users")
      .select("nombres")
      .eq("id", userId)
      .single();

    if (error) {
      console.error(error);
    } else if (data) {
      setName(data.nombres);
    }
  }
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
  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    if (session?.user?.id) {
      fetchUserName(session.user.id);
    }
  }, [session?.user?.id]);

  return (
    <SafeAreaView>
      <VStack space={5} className="p-7 h-screen bg-primary">
        <Text className=" text-xl font-bold text-white ">
          Confirma tus datos de pago
        </Text>
        <View className=" border-[0.5px]  border-gray-300"></View>
        <Text className=" font-semibold text-white ">
          Informacion de Facturacion
        </Text>
        <HStack justifyContent="space-between">
          <HStack space={3} alignItems="center">
            <Image
              source={{
                uri:
                  "https://userstock.io/data/wp-content/uploads/2017/09/bewakoof-com-official-219589-300x300.jpg" ||
                  session?.user?.user_metadata?.avatar_url,
              }}
              alt="profile-pic"
              width={50}
              height={50}
              className="rounded-full "
            />
            <VStack>
              <Text className="font-bold text-white ">
                {"Brayan Joan" || session?.user?.user_metadata?.full_name}
              </Text>
              <Text className="text-white ">
                {"Usuario General" || session?.user?.role === "guest"
                  ? "Usuario General"
                  : "Usuario Premium"}
              </Text>
            </VStack>
          </HStack>
          <Link href="/(modals)/edit-payment-info">
            <Button size="sm" variant="solid" bg={"white"}>
              <Text className=" ">Editar</Text>
            </Button>
          </Link>
        </HStack>
        <View className=" border-[0.5px]  border-gray-300"></View>
        <Text className=" font-semibold text-white ">Método de Pago</Text>
        <VStack space={4}>
          <HStack
            position="relative"
            justifyContent="space-between"
            bg="white"
            p={1}
            rounded={7}
          >
            <Animated.View
              style={[
                {
                  position: "absolute",
                  top: 4,
                  left: 4,
                  width: 158,
                  borderRadius: 5,
                  height: "100%",
                  backgroundColor: "#A3E062",
                },
                useAnimatedStyle(() => {
                  return {
                    transform: [{ translateX: animation.value }],
                  };
                }),
              ]}
            />
            <Pressable
              className="p-2 pr-14 text-center"
              onPress={handleCardPayment}
            >
              <Text className="font-semibold">Tarjeta Bancaria</Text>
            </Pressable>
            <Pressable className=" p-2 pr-14" onPress={handleYapePayment}>
              <Text
               className="font-semibold"
              >
                Yape
              </Text>
            </Pressable>
          </HStack>

          {cardPaymentMethod ? <Stripe /> : <Yape />}
        </VStack>
        <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      </VStack>
    </SafeAreaView>
  );




  
}
