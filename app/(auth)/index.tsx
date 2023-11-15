import { Link } from "expo-router";
import { Button, Center } from "native-base";
import { Image, SafeAreaView, Text, View } from "react-native";
export default function Welcome() {
  return (
    <SafeAreaView>
      <View className="items-center space-y-12">
        <Image
          className="w-72  h-72 mt-10"
          source={require("../../assets/images/hero.png")}
        />
        <View className="items-center space-y-3.5">
          <Text className="font-bold text-2xl">Controla tus gastos</Text>
          <Text className="text-textmuted px-20 text-center">
            La mejor solución para controlar los gastos que realizas en tu dia a
            dia, sin pederte de nada
          </Text>
        </View>
        <Center>
          <Link asChild href="/(auth)/sign-up">
            <Button className="px-10 rounded-full" colorScheme="teal" size="lg">
              Iniciar sesión
            </Button>
          </Link>
        </Center>
      </View>
      <View className="items-center gap-1 text-center justify-center mt-32 flex  flex-row">
        <Text className="  text-textmuted text-center">
          No tienes una cuenta?
        </Text>
        <Link asChild href="/(auth)/sign-up">
          <Button className="px-0" variant="link" colorScheme="teal">
            Regístrate
          </Button>
        </Link>
      </View>
    </SafeAreaView>
  );
}