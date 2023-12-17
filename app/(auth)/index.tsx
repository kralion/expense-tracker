import { Link } from "expo-router";
import { Button, Center } from "native-base";
import { Text, View, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import WelcomeAsset from "@/assets/svgs/welcome.svg";
import WelcomeAndroidAsset from "@/assets/svgs/welcome-android.svg";

export default function Welcome() {
  return (
    <SafeAreaView>
      <Center className="space-y-10 mt-20">
        {Platform.OS === "ios" ? (
          <WelcomeAsset width={300} height={300} />
        ) : (
          <WelcomeAndroidAsset width={300} height={300} />
        )}
        <View className="items-center space-y-5">
          <Text className="font-bold text-2xl">Controla tus gastos</Text>
          <Text className="text-textmuted px-10 text-center">
            La mejor solución para controlar los gastos que realizas en tu dia a
            dia, sin pederte de nada.
          </Text>
        </View>
        <Link asChild href="/(auth)/sign-up">
          <Button className="px-10 py-4 mt-10 rounded-full" size="lg">
            Empezar a usarlo
          </Button>
        </Link>
      </Center>
    </SafeAreaView>
  );
}
