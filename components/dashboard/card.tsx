import { useExpenseContext } from "@/context";
import useAuth from "@/context/AuthContext";
import { supabase } from "@/utils/supabase";
import { LinearGradient } from "expo-linear-gradient";
import { Badge } from "native-base";
import * as React from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { BudgetLimitExceededModal } from "../popups";
import BuyPremiumModal from "../popups/buy-premium";

export default function Card() {
  const flip = useSharedValue(0);
  const [totalMonthExpenses, setTotalMonthExpenses] = React.useState(0);
  const { userData } = useAuth();
  const { sumOfAllOfExpensesMonthly } = useExpenseContext();
  const [showModal, setShowModal] = React.useState(false);

  const animatedStyles = useAnimatedStyle(() => {
    const rotateY = interpolate(
      flip.value,
      [0, 1],
      [0, 360],
      Extrapolate.CLAMP
    );
    const rotateX = interpolate(
      flip.value,
      [0, 0.5, 1],
      [30, 0, 0],
      Extrapolate.CLAMP
    );

    return {
      transform: [
        { perspective: 1000 }, // Add perspective to enhance 3D effect
        { rotateY: `${rotateY}deg` },
        { rotateX: `${rotateX}deg` },
      ],
      backfaceVisibility: "hidden",
    };
  });
  const [presupuesto, setPresupuesto] = React.useState<number>();

  async function getPremiumStatus() {
    const now = new Date();
    const oneMonthFromNow = new Date();
    oneMonthFromNow.setMonth(now.getMonth() + 1);

    const { data } = await supabase
      .from("presupuestos")
      .select("*")
      .eq("usuario_id", userData.id)
      .lte("fecha_registro", now.toISOString().split("T")[0])
      .gte("fecha_final", now.toISOString().split("T")[0])
      .single();
    if (data) {
      setPresupuesto(data.monto);
    }
  }

  React.useEffect(() => {
    async function fetchExpenses() {
      const totalExpenses = await sumOfAllOfExpensesMonthly();
      setTotalMonthExpenses(totalExpenses);
    }

    getPremiumStatus();
    fetchExpenses();
  }, [userData]);

  const [openModal, setOpenModal] = React.useState(false);

  React.useEffect(() => {
    flip.value = withTiming(1, { duration: 2000 });
  }, []);

  const balance = presupuesto ? presupuesto - totalMonthExpenses : 0;

  React.useEffect(() => {
    if (
      presupuesto &&
      totalMonthExpenses &&
      presupuesto - totalMonthExpenses <= 0
    ) {
      setShowModal(true);
    }
  }, [balance]);
  return (
    <Animated.View style={[styles.cardStyle, animatedStyles]}>
      <BuyPremiumModal setOpenModal={setOpenModal} openModal={openModal} />
      <Pressable
        onPress={() => {
          if (userData.rol === "premium") {
            Alert.alert(
              "Premium",
              "Ya eres usuario premium, tienes acceso a todas las funcionalidades."
            );
          } else {
            setOpenModal(true);
          }
        }}
        style={styles.shadowContainer}
      >
        <LinearGradient
          className="flex flex-col justify-between rounded-2xl p-5 shadow-2xl space-y-10 "
          colors={
            userData.rol === "premium"
              ? ["#D4AF37", "#FFD700", "#A79647"]
              : ["#6366F1", "#6D28D9"]
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.cardStyle}
        >
          <View className="flex flex-row items-start justify-between">
            <View>
              <Text className="text-mutedwhite text-[18px]  font-semibold items-center space-x-2">
                Balance
              </Text>
              <Text className="text-3xl font-bold tracking-tighter  text-mutedwhite">
                S/. {balance}
              </Text>
            </View>
            <BudgetLimitExceededModal
              setShowModal={setShowModal}
              showModal={showModal}
            />
            <Badge
              variant="solid"
              rounded={10}
              colorScheme={userData.rol === "premium" ? "yellow" : "orange"}
            >
              <Text className="text-white text-xs font-bold">
                {userData.rol === "premium" ? "Premium" : "Plan Free"}
              </Text>
            </Badge>
          </View>
          <Pressable className="flex    flex-row justify-between">
            <View className="flex flex-col gap-1">
              <View className="flex items-center flex-row space-x-1">
                <Text className="text-mutedwhite text-center items-center space-x-2">
                  Gastos
                </Text>
              </View>
              <Text className="text-xl font-semibold text-center text-mutedwhite">
                S/. {totalMonthExpenses}
              </Text>
            </View>
            <View className="flex flex-col gap-1">
              <View className="flex items-center flex-row space-x-1">
                <Text className="text-mutedwhite text-center items-center space-x-2">
                  Presupuesto
                </Text>
              </View>
              <Text className="text-xl font-semibold text-center text-mutedwhite">
                S/. {presupuesto ? presupuesto : "0.00"}
              </Text>
            </View>
          </Pressable>
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  cardStyle: {
    width: "90%",
    height: 200,
    left: 21,
    position: "absolute",
    zIndex: 1,
  },
  shadowContainer: {
    flex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 30,
    backgroundColor: "rgba(255, 255, 255, 0.001)",
  },
});
