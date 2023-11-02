import { View, Text, Image } from "react-native";
import { Pressable } from "native-base";

export default function Expenses() {
  return (
    <Pressable
      onPress={() => console.log("I'm Pressed")}
      overflow="hidden"
      borderColor="coolGray.300"
      maxW="96"
      shadow="1"
    >
      <View className="flex flex-row justify-between m-4 items-center">
        <View className="flex-row gap-2  items-center">
          <Image
            width={50}
            height={50}
            source={{
              uri: "https://img.icons8.com/?size=160&id=Q2m4bLp5g5kF&format=png",
            }}
          />
          <View className="space-y-1">
            <Text className=" text-[18px]   font-bold">taxi</Text>
            <Text className="text-muted text-[14px] ">en la mañana</Text>
          </View>
        </View>
        <Text className=" text-xl text-red-500   font-bold">S/. 15</Text>
      </View>
    </Pressable>
  );
}
