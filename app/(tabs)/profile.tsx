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
import { Pressable, Text, View } from "react-native";
import DefaultAvatar from "@/assets/svgs/avatar.svg";
import { Image } from "expo-image";
import { useNotificationContext } from "@/context";

export default function App() {
  const [session, setSession] = React.useState<Session | null>(null);
  const [names, setNames] = React.useState("");
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
  async function fetchUserName(userId: string) {
    try {
      const { data, error } = await supabase
        .from("usuarios_expense")
        .select("nombres")
        .eq("id", userId)
        .single();

      if (error) {
        throw error;
      }
      setNames(data.nombres);
    } catch (error) {
      showNotification({
        title: "Error al obtener datos del usuario",
        alertStatus: "error",
      });
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
      <View className="bg-accent relative h-40">
        <VStack
          space={2}
          className=" absolute left-36 right-36 top-24"
          alignItems="center"
        >
          {session?.user?.user_metadata?.avatar_url ? (
            <Image
              source={{
                uri: session?.user?.user_metadata?.avatar_url,
              }}
              className="rounded-full"
              alt="profile"
              style={{ width: 120, height: 120 }}
            />
          ) : (
            <DefaultAvatar width={120} height={120} />
          )}
          <Heading size="md"> {names} </Heading>
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
          <Link asChild href="/(modals)/export-data">
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
          <Link asChild href="/(modals)/buy-premium">
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
