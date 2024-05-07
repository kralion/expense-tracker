import WelcomeAsset from "@/assets/svgs/welcome.svg";
import { Link } from "expo-router";
import { Button, Center, VStack } from "native-base";
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
        <Center className="flex flex-col justify-center h-screen items-center">
          {Platform.OS === "ios" ? (
            <WelcomeAsset width={300} height={300} />
          ) : (
            <WelcomeAndroidAsset width={300} height={300} />
          )}
          <VStack space={4} alignItems="center">
            <Text className="font-bold text-2xl">Controla tus gastos</Text>
            <Text className=" px-8 text-center">
              La mejor solución para controlar los gastos que realizas en tu día
              a día, sin pederte de nada.
            </Text>
          </VStack>
          <Link asChild href="/(auth)/sign-in">
            <Button
              px={6}
              className="shadow-md border border-b-teal-600 border-t-transparent border-l-transparent border-r-transparent"
              py={3}
              mt={10}
              rounded={10}
            >
              <Text className="font-semibold text-white  text-lg">Empezar</Text>
            </Button>
          </Link>
        </Center>
      </SafeAreaView>
    </ImageBackground>
  );
}
