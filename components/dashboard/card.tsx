import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Badge, Icon, IconButton } from "native-base";
import * as React from "react";
import { Pressable, Text, View, StyleSheet, Alert } from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import BuyPremiumModal from "../popups/buy-premium";
import useAuth from "@/context/AuthContext";
import { supabase } from "@/utils/supabase";

export default function Card({ isPremiumUser }: { isPremiumUser: boolean }) {
  const flip = useSharedValue(0);
  const { userData } = useAuth();

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
    const { data, error } = await supabase
      .from("presupuestos")
      .select("*")
      //TODO : Change this to the user id
      .eq("usuario_id", "61c2c871-855e-41e5-8fe4-3c8059ed8ae2")
      .single();

    if (error) {
      console.log(error);
    }
    if (data) {
      setPresupuesto(data.monto);
    }
    console.log(userData.id);
  }

  React.useEffect(() => {
    getPremiumStatus();
  }, []);

  const [openModal, setOpenModal] = React.useState(false);

  //TODO : Add animation to card when user first logs in (only once)
  // React.useEffect(() => {
  //   const runAnimation = async () => {
  //     const hasAnimated = await AsyncStorage.getItem("hasAnimated");

  //     if (!hasAnimated) {
  //       flip.value = withTiming(1, { duration: 5000 });
  //       await AsyncStorage.setItem("hasAnimated", "true");
  //     }
  //   };

  //   runAnimation();
  // }, []);
  React.useEffect(() => {
    flip.value = withTiming(1, { duration: 2000 });
  }, []);

  return (
    <Animated.View style={[styles.cardStyle, animatedStyles]}>
      <BuyPremiumModal setOpenModal={setOpenModal} openModal={openModal} />
      <Pressable
        onPress={() => {
          if (isPremiumUser) {
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
          className={`flex flex-col justify-between border-2 rounded-3xl p-5 shadow-2xl space-y-10 ${
            isPremiumUser ? " border-yellow-500 " : "border-indigo-500"
          } `}
          colors={
            isPremiumUser
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
                S/. 4,651.0
              </Text>
            </View>

            <Badge
              variant="solid"
              rounded={10}
              colorScheme={isPremiumUser ? "yellow" : "orange"}
            >
              <Text className="text-white text-xs font-bold">
                {isPremiumUser ? "Premium" : "Plan Free"}
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
                S/. 749.50
              </Text>
            </View>
            <View className="flex flex-col gap-1">
              <View className="flex items-center flex-row space-x-1">
                <Text className="text-mutedwhite text-center items-center space-x-2">
                  Presupuesto
                </Text>
              </View>
              <Text className="text-xl font-semibold text-center text-mutedwhite">
                S/. {presupuesto}
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
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 5,
    backgroundColor: "rgba(255, 255, 255, 0.001)",
  },
});
