import { View, Text } from "react-native";
import React from "react";
import { Button, HStack, VStack } from "native-base";
import { Image } from "expo-image";
import { router } from "expo-router";
import { supabase } from "@/utils/supabase";
import { useNotificationContext } from "@/context";

const Membership = () => {
  const { showNotification } = useNotificationContext();
  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      showNotification({
        title: "Error al cerrar sesión",
        alertStatus: "error",
      });
    } else {
      router.push("/(auth)/sign-in");
    }
  }
  return (
    <VStack m={5} space={10} className="bg-white p-5 rounded-lg">
      <HStack space={3} alignItems="center">
        <View className="p-5 bg-primary rounded-xl">
          <Image
            source={require("../../assets/icon.png")}
            style={{
              width: 40,
              height: 40,
            }}
          />
        </View>
        <VStack space={1}>
          <Text className="font-bold text-xl">Premium</Text>
          <HStack>
            <Text className="text-textmuted">Membresia Premium - </Text>
            <Text className="text-indigo-600 font-bold">Activa</Text>
          </HStack>
        </VStack>
      </HStack>
      <VStack space={1}>
        <Text className="font-black">Facturacion </Text>
        <Text className="text-textmuted">Fecha Registro : 20/12/2023</Text>
      </VStack>
      <VStack
        p={3}
        space={3}
        bg="red.100"
        rounded={10}
        className="border-[1px] border-red-500"
      >
        <Text className="text-red-500 text-xl font-semibold">
          Zona de Peligro
        </Text>
        <Text className="text-textmuted">
          Para cerrar la cuenta y eliminar tus datos de forma permanente haz
          click en el botón
        </Text>
        <HStack justifyContent="center" p={5} space={3}>
          <Button
            onPress={() => {
              alert("Cuenta Eliminada");
              setTimeout(() => {
                signOut();
              }, 2000);
            }}
            className="w-full rounded-full"
            height={12}
            variant="solid"
            colorScheme="rose"
          >
            <Text className="font-semibold text-white ">Eliminar Cuenta</Text>
          </Button>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default Membership;
