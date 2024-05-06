import useAuth from "@/context/AuthContext";
import { supabase } from "@/utils/supabase";
import {
  Entypo,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Link, router } from "expo-router";
import {
  Avatar,
  Badge,
  Center,
  HStack,
  Heading,
  Icon,
  VStack,
} from "native-base";
import React from "react";
import { Pressable, Text, View } from "react-native";

export default function App() {
  const { userData } = useAuth();
  async function signOut() {
    await supabase.auth.signOut();
    router.push("/(auth)/sign-in");
  }

  return (
    <View>
      <View className="bg-accent relative h-40">
        <VStack
          space={3}
          className=" absolute left-28 right-28 top-24"
          alignItems="center"
        >
          <Avatar
            bg="teal.600"
            alignSelf="center"
            size="2xl"
            source={{
              uri: userData.foto,
            }}
          />

          <VStack space={1}>
            <Heading size="md">{`${userData.nombres} ${userData.apellidos}`}</Heading>
            <Badge
              className="border border-orange-500"
              variant="solid"
              borderRadius={10}
              colorScheme={userData.rol === "premium" ? "success" : "warning"}
            >
              {`Usuario ${userData.rol}`}
            </Badge>
          </VStack>
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
