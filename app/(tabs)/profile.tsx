import {
  Entypo,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Button, HStack, Heading, Icon, VStack, Link } from "native-base";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";

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
              alt="logo"
              width={20}
              height={20}
            />
          </HStack>
        </VStack>
      </View>

      <VStack space={2} paddingX={3} alignItems="flex-start" marginTop={200}>
        <Button
          borderWidth={0}
          colorScheme="emerald"
          borderRadius={14}
          variant="link"
          startIcon={
            <Icon
              color="gray.500"
              as={FontAwesome5}
              size={21}
              name="user-alt"
            />
          }
        >
          <Text className="font-bold text-xl px-1 text-slate-500">
            Datos Personales
          </Text>
        </Button>
        <Pressable className="flex flex-row items-center gap-2 active:bg-gray-100 rounded-md p-2">
          <Icon color="gray.400" as={Entypo} size={21} name="wallet" />
          <Text className="font-bold text-xl px-1 text-slate-400">
            Métodos de Pago
          </Text>
        </Pressable>
        <Button
          borderWidth={0}
          colorScheme="emerald"
          borderRadius={14}
          variant="link"
          startIcon={
            <Icon color="gray.400" as={Entypo} size={21} name="bell" />
          }
        >
          <Text className="font-bold text-xl px-1 text-slate-400">
            Notificaciones
          </Text>
        </Button>
        <Button
          borderWidth={0}
          colorScheme="emerald"
          borderRadius={14}
          variant="link"
          startIcon={
            <Icon
              color="gray.400"
              as={Ionicons}
              size={21}
              name="ios-settings-sharp"
            />
          }
        >
          <Text className="font-bold text-xl px-1 text-slate-400">
            Configuracion
          </Text>
        </Button>
        <Button
          borderWidth={0}
          colorScheme="emerald"
          borderRadius={14}
          variant="link"
          startIcon={
            <Icon
              color="gray.400"
              as={MaterialCommunityIcons}
              size={21}
              name="logout"
            />
          }
        >
          <Text className="font-bold text-xl px-1 text-slate-400">Salir</Text>
        </Button>
      </VStack>

      <HStack
        alignItems="center"
        justifyContent="center"
        className="text-sm text-center absolute -bottom-24 left-20 "
      >
        <Text className="text-gray-400">Developed by</Text>

        <Link
          href="https://twitter.com/joanpaucar_"
          isUnderlined={false}
          isExternal
          _text={{
            color: "teal.600",
          }}
          mt={-0.5}
          _web={{
            mb: -2,
          }}
          className="px-1 "
        >
          Brayan
        </Link>
        <Text className="text-gray-400">&</Text>
        <Link
          href="https://www.facebook.com/miguelangel.requenaramos.94"
          isUnderlined={false}
          isExternal
          _text={{
            color: "teal.600",
          }}
          mt={-0.5}
          _web={{
            mb: -2,
          }}
          className="px-1 "
        >
          Miguel
        </Link>
      </HStack>
    </View>
  );
}
