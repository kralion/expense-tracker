import { supabase } from "@/utils/supabase";
import {
  Entypo,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Session } from "@supabase/supabase-js";
import { Link, router } from "expo-router";
import { Center, HStack, Heading, Icon, VStack } from "native-base";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";

export default function App() {
  const [session, setSession] = React.useState<Session | null>(null);
  const [name, setName] = React.useState("");
  async function signOut() {
    await supabase.auth.signOut();
    router.push("/(auth)/sign-in");
  }
  async function fetchUserName(userId: string) {
    const { data, error } = await supabase
      .from("app_users")
      .select("nombres")
      .eq("id", userId)
      .single();

    if (error) {
      console.error(error);
    } else if (data) {
      setName(data.nombres);
    }
  }
  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    if (session?.user?.id) {
      fetchUserName(session.user.id);
    }
  }, [session?.user?.id]);
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
              uri:
                "https://userstock.io/data/wp-content/uploads/2017/09/bewakoof-com-official-219589-300x300.jpg" ||
                session?.user?.user_metadata?.avatar_url,
            }}
            alt="profile-pic"
            width={150}
            height={150}
            className="rounded-full "
          />
          {/* //TODO: Cambiar el nombre por el nombre del usuario */}
          <Heading size="md"> {name} </Heading>
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
          <Link asChild href="/(modals)/add-expense-sucess">
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
          <Pressable
            onPress={() => signOut()}
            className="flex gap-3 flex-row p-2 items-center active:opacity-30"
          >
            <Icon
              color="gray.500"
              as={MaterialCommunityIcons}
              size={21}
              name="logout"
            />

            <Text className="text-xl font-bold text-gray-500">Salir</Text>
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
