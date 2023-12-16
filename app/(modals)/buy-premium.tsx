import Stripe from "@/components/payment/stripe";
import Yape from "@/components/payment/yape";
import { supabase } from "@/utils/supabase";
import { Session } from "@supabase/supabase-js";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Button, Divider, HStack, ScrollView, VStack } from "native-base";
import * as React from "react";
import {
  Dimensions,
  Image,
  Platform,
  Pressable,
  Text,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BuyPremiumModal() {
  const [session, setSession] = React.useState<Session | null>(null);
  const [yapePaymentMethod, setYapePaymentMethod] = React.useState(false);
  const [name, setName] = React.useState("");
  const [cardPaymentMethod, setCardPaymentMethod] = React.useState(true);
  const screenWidth = Dimensions.get("window").width;

  const animation = useSharedValue(0);
  const handlePress = (index: number) => {
    animation.value = withTiming((index * screenWidth) / 2.4, {
      duration: 300,
    });
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
      <ScrollView>
        <VStack space={5} className="p-7 h-screen bg-primary">
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
