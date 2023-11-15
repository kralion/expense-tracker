import {
  Entypo,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Button, Center, HStack, Heading, Icon, VStack } from "native-base";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { Link } from "expo-router";

export default function App() {
  return (
    <View>
      <View className="bg-accent relative h-20">
        <VStack
          className=" absolute -top-4 left-28"
          space={2}
          alignItems="center"
          marginTop={5}
        >
          <Image
            source={{
              uri: "https://userstock.io/data/wp-content/uploads/2017/09/bewakoof-com-official-219589-300x300.jpg",
            }}
            alt="profile-pic"
            width={150}
            height={150}
            className="rounded-full "
          />

          <Heading size="md">Brayan Joan</Heading>
          <HStack space={2} alignItems="center">
            <Heading size="xm" color="gray.400">
              28 años,
            </Heading>
            <Image
              source={{
                uri: "https://img.icons8.com/?size=96&id=eofZXRmqHHir&format=png",
              }}
              className="rounded-md"
              alt="country"
              width={20}
              height={20}
            />
          </HStack>
        </VStack>
      </View>
      <HStack>
        <VStack
          space={2}
          paddingLeft={5}
          alignItems="flex-start"
          marginTop={200}
        >
          <Link asChild href="/(modals)/export-data">
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
          <Link asChild href="/(modals)/export-data">
            <Pressable className="flex gap-3 flex-row p-2 items-center active:opacity-30">
              <Icon
                color="gray.500"
                as={MaterialCommunityIcons}
                size={21}
                name="database-export"
              />
              <Text className="text-xl font-bold text-gray-500">
                Exportar Gastos
              </Text>
            </Pressable>
          </Link>
          <Link asChild href="/(modals)/export-data">
            <Pressable className="flex gap-3 flex-row p-2 items-center active:opacity-30">
              <Icon color="gray.500" as={Entypo} size={21} name="bell" />

              <Text className="text-xl font-bold text-gray-500">
                Notificaciones
              </Text>
            </Pressable>
          </Link>
          <Link asChild href="/(modals)/export-data">
            <Pressable className="flex gap-3 flex-row p-2 items-center active:opacity-30">
              <Icon
                color="gray.500"
                as={Ionicons}
                size={21}
                name="ios-settings-sharp"
              />

              <Text className="text-xl font-bold text-gray-500">
                Configuración
              </Text>
            </Pressable>
          </Link>
          <Link asChild href="/(modals)/export-data">
            <Pressable className="flex gap-3 flex-row p-2 items-center active:opacity-30">
              <Icon
                color="gray.500"
                as={MaterialCommunityIcons}
                size={21}
                name="logout"
              />

              <Text className="text-xl font-bold text-gray-500">Salir</Text>
            </Pressable>
          </Link>
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
