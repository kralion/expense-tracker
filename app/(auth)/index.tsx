import WelcomeAsset from "@/assets/svgs/welcome.svg";
import { Link } from "expo-router";
import { Button, Center } from "native-base";
import { Platform, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import WelcomeAndroidAsset from "@/assets/svgs/welcome-android.svg";
import { ImageBackground } from "expo-image";

export default function Welcome() {
  return (
    <ImageBackground
      source={{
        uri: "https://img.freepik.com/free-vector/pink-green-gradient-blur-vector-background_53876-171598.jpg?size=626&ext=jpg&ga=GA1.1.1405311743.1707842042&semt=ais",
      }}
      className="z-10 h-screen"
    >
      <SafeAreaView>
        <Center className="space-y-10 mt-20">
          {Platform.OS === "ios" ? (
            <WelcomeAsset width={300} height={300} />
          ) : (
            <WelcomeAndroidAsset width={300} height={300} />
          )}
          <View className="items-center space-y-5">
            <Text className="font-bold text-2xl">Controla tus gastos</Text>
            <Text className=" px-10 text-center">
              La mejor solución para controlar los gastos que realizas en tu día
              a día, sin pederte de nada.
            </Text>
          </View>
          <Link asChild href="/(auth)/sign-up">
            <Button className="px-10  py-5 mt-10" rounded={10}>
              <Text className="font-semibold text-white ">Empezar</Text>
            </Button>
          </Link>
        </Center>
      </SafeAreaView>
    </ImageBackground>
  );
}
