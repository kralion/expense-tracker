import { Feather } from "@expo/vector-icons";

import { Icon, IconButton } from "native-base";
import { ImageBackground, Pressable, Text, View } from "react-native";

export default function Card() {
  return (
    <ImageBackground
      className="flex z-10 absolute  p-10 space-y-12 ml-0.5 w-96 shadow-lg flex-col  "
      source={require("../../assets/cover.png")}
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
        <IconButton
          className="rounded-full"
          icon={
            <Icon as={Feather} color="white" size={25} name="more-horizontal" />
          }
        />
      </View>
      <Pressable className="flex    flex-row justify-between">
        <View className="flex flex-col gap-1">
          <View className="flex items-center flex-row space-x-1">
            <Text className="text-mutedwhite text-center items-center space-x-2">
              Ingresos
            </Text>
          </View>
          <Text className="text-xl font-semibold text-center text-mutedwhite">
            S/. 5,400
          </Text>
        </View>
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
      </Pressable>
    </ImageBackground>
  );
}
