import DefaultAvatar from "@/assets/svgs/avatar.svg";
import { useNotificationContext } from "@/context";
import useAuth from "@/context/AuthContext";
import { supabase } from "@/utils/supabase";
import {
  Entypo,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Image } from "expo-image";
import { Link, router } from "expo-router";
import { Center, HStack, Heading, Icon, VStack } from "native-base";
import React from "react";
import { Pressable, Text, View } from "react-native";

export default function App() {
  const { userData } = useAuth();
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
    <View>
      <View className="bg-accent relative h-40">
        <VStack
          space={2}
          className=" absolute left-28 right-28 top-24"
          alignItems="center"
        >
          {userData ? (
            <Image
              source={{
                //TODO change to user avatar
                // uri: userData?.perfil.uri,
                uri: "https://img.icons8.com/?size=40&id=23454&format=png",
              }}
              className="rounded-full"
              alt="profile"
              style={{ width: 120, height: 120 }}
            />
          ) : (
            <DefaultAvatar width={120} height={120} />
          )}
          <Heading size="md">{`${userData.nombres} ${userData.apellidos}`}</Heading>
        </VStack>
      </View>
      <HStack>
        <VStack
          space={2}
          paddingLeft={5}
          alignItems="flex-start"
          marginTop={200}
        >
          <Link asChild href="/(modals)/personal-info">
            <Pressable className="flex flex-row gap-3 p-2 items-center active:opacity-30">
              <Icon
                color="gray.500"
                as={FontAwesome5}
                size={21}
                name="user-alt"
              />
              <Text className="text-xl font-bold text-gray-500">
                Datos Personales
              </Text>
            </Pressable>
          </Link>
          <Link asChild href="/(modals)/budget">
            <Pressable className="flex gap-3 flex-row p-2 items-center active:opacity-30">
              <Icon
                color="gray.500"
                as={MaterialCommunityIcons}
                size={21}
                name="database-export"
              />
              <Text className="text-xl font-bold text-gray-500">
                Presupuestos
              </Text>
            </Pressable>
          </Link>
          <Link asChild href="/(modals)/notifications">
            <Pressable className="flex gap-3 flex-row p-2 items-center active:opacity-30">
              <Icon color="gray.500" as={Entypo} size={21} name="bell" />

              <Text className="text-xl font-bold text-gray-500">
                Notificaciones
              </Text>
            </Pressable>
          </Link>
          <Link asChild href="/(modals)/membership">
            <Pressable className="flex gap-3 flex-row p-2 items-center active:opacity-30">
              <Icon
                color="gray.500"
                as={Ionicons}
                size={21}
                name="ios-settings-sharp"
              />

              <Text className="text-xl font-bold text-gray-500">Membresía</Text>
            </Pressable>
          </Link>
          <Pressable
            onPress={() => signOut()}
            className="flex gap-3 flex-row p-2 items-center active:opacity-30"
          >
            <Icon
              color="red.500"
              as={MaterialCommunityIcons}
              className="rotate-180"
              size={21}
              name="logout"
            />

            <Text className="text-xl font-bold text-red-500">Salir</Text>
          </Pressable>
        </VStack>
        <Center>
          <VStack className="relative">
            <View className="w-48 absolute top-44 rounded-lg shadow-xl  bg-slate-900 shadow-black/50 ml-24 -rotate-[23deg] h-96" />
            <View className="w-48 absolute top-32 rounded-lg shadow-md shadow-black/50 bg-accent ml-28 -rotate-[18deg] h-96" />
            <View className="w-48 absolute top-20 rounded-lg shadow-md shadow-black/50  bg-primary ml-32 -rotate-[10deg] h-96" />
          </VStack>
        </Center>
      </HStack>
      <HStack
        alignItems="center"
        justifyContent="center"
        className="text-sm text-center absolute -bottom-24 left-20 "
      >
        <Text className="text-gray-400">Desarrollado por</Text>

        <Link
          href="https://twitter.com/joanpaucar_"
          className="px-1  text-primary active:underline"
        >
          Brayan
        </Link>
        <Text className="text-gray-400">&</Text>
        <Link
          href="https://www.facebook.com/miguelangel.requenaramos.94"
          className="px-1 text-primary active:underline "
        >
          Miguel
        </Link>
      </HStack>
    </View>
  );
}
