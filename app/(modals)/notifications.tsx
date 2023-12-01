import { FontAwesome } from "@expo/vector-icons";
import { useForm, Controller } from 'react-hook-form';
import { 
    Button, 
    HStack, 
    VStack, 
    Input, 
    Box, 
    FormControl, 
    WarningOutlineIcon 
} from "native-base";
import * as React from "react";
import { Image, Pressable, Text, View } from "react-native";

export default function PersonalInfo() {
  const [show, setShow] = React.useState(false);
  const [bgColor, setBgColor] = React.useState("bg-white");

  const handleClick = () => {
    setBgColor("bg-[#d9f6f1]");

    setTimeout(() => {
        setBgColor("bg-white");
    }, 500);
  };

  return (
    <View className="flex flex-col space-y-3 justify-between p-3">
        <HStack>
          <View className="bg-accent w-2 h-8 rounded-full my-3 " />
          <Text className="text-[#464444] p-3 font-bold text-lg">
            Notificaciones
          </Text>
        </HStack>
        <Pressable onPress={handleClick}>
            <HStack className={`${bgColor} rounded-lg p-3`}>
                <Image
                    className="w-10 h-10 mr-4"
                    source={{
                    uri: "https://img.icons8.com/?size=48&id=0huTZP3odhVv&format=png",
                    }}
                />
                <VStack>
                    <Text className="text-[#464444] font-bold">30/06/21 - 6:30 am</Text>
                    <Text className="text-[#464444] font-bold text-[16px]">Recibe notificaciones de tus gastos</Text>
                </VStack>
            </HStack>
        </Pressable>
    </View>
  );
}
