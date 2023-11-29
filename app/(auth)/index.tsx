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
            <Button className="px-10 py-4 rounded-full" size="lg">
              Empezar a usarlo
            </Button>
          </Link>
        </Center>
      </View>
    </SafeAreaView>
  );
}
