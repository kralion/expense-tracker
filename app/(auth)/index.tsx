import { Link } from "expo-router";
import { Button, Center } from "native-base";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function Welcome() {
  return (
    <SafeAreaView>
      <View className="items-center">
        <Image
          alt="Hero"
          style={{
            height: 400,
            width: 400,
          }}
          source={require("../../assets/hero.png")}
          placeholder={blurhash}
          transition={1000}
          priority="high"
        />
        <View className="items-center space-y-5">
          <Text className="font-bold text-2xl">Controla tus gastos</Text>
          <Text className="text-textmuted px-10 text-center">
            La mejor solución para controlar los gastos que realizas en tu dia a
            dia, sin pederte de nada.
          </Text>
        </View>
        <Center>
          <Link asChild href="/(auth)/sign-up">
            <Button className="px-10 py-4 mt-10 rounded-full" size="lg">
              Empezar a usarlo
            </Button>
          </Link>
        </Center>
      </View>
    </SafeAreaView>
  );
}
