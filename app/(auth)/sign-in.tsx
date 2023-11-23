import * as Google from "expo-auth-session/providers/google";

import { MaterialIcons } from "@expo/vector-icons";
import {
  AppleAuthenticationScope,
  signInAsync,
} from "expo-apple-authentication";
import { Link, router } from "expo-router";
import {
  Button,
  FormControl,
  HStack,
  Icon,
  Input,
  VStack,
  WarningOutlineIcon,
} from "native-base";
import * as React from "react";
import { Image, Pressable, SafeAreaView, Text, View } from "react-native";
import { supabase } from "@/utils/supabase";
export default function SignIn() {
  {
    /* //TODO : Agregar validación y todo el staff relacionad con formularios utilizando RHF */
  }
  const [show, setShow] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState(null);
  const [invalidEmail, setInvalidEmail] = React.useState(false);
  const [invalidPassword, setInvalidPassword] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId:
      "422618280931-fc0s3ktar0vcgoc80n128589e5ahhk1e.apps.googleusercontent.com",
    androidClientId:
      "422618280931-50inl7uig7t4p5k6o89521jejcic2llj.apps.googleusercontent.com",
    scopes: ["profile", "email"],
  });
  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setLoading(false);

      if (error.message.includes("Invalid login credentials")) {
        setInvalidEmail(true);
        setInvalidPassword(true);
        return;
      }

      if (error.message.includes("Invalid password")) {
        setInvalidPassword(true);
        return;
      }
    } else {
      router.push("/(tabs)/");
    }
    setLoading(false);
  }
  return (
    <SafeAreaView>
      <View className="flex flex-col space-y-9 justify-between mx-2">
        <View className="items-center space-y-7">
          <View className="justify-center text-center  mt-10">
            <View className="flex flex-row  items-center gap-2 justify-center ">
              <Image
                className="w-10 h-10"
                source={{
                  uri: "https://img.icons8.com/?size=100&id=ogMD71G6DBkF&format=png",
                }}
              />
              <Text className="font-bold text-xl">Expense Tracker</Text>
            </View>
            <Text className="text-textmuted text-center">
              Controla tus gastos desde tu bolsillo
            </Text>
          </View>
          <VStack space={4}>
            <FormControl isInvalid={invalidEmail} w="85%" maxW="350px">
              <FormControl.Label marginBottom={2}>
                Tu correo electrónico
              </FormControl.Label>
              <Input
                size="lg"
                value={email}
                autoCapitalize="none"
                onChange={(value) => {
                  setEmail(value.nativeEvent.text);
                  setInvalidEmail(false);
                }}
                borderRadius={7}
                w={{
                  base: "90%",
                  md: "25%",
                }}
                placeholder="joanhweu115@gmail.com"
              />
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                Correo electrónico incorrecto
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl isInvalid={invalidPassword} w="85%" maxW="350px">
              <FormControl.Label marginBottom={2}>Contraseña</FormControl.Label>
              <Input
                size="lg"
                value={password}
                w={{
                  base: "90%",
                  md: "25%",
                }}
                onChange={(value) => {
                  setPassword(value.nativeEvent.text);
                  setInvalidPassword(false);
                }}
                type={show ? "text" : "password"}
                passwordRules={
                  "required: upper; required: lower; required: digit; minlength: 8;"
                }
                borderRadius={7}
                InputRightElement={
                  <Pressable onPress={() => setShow(!show)}>
                    <Icon
                      as={
                        <MaterialIcons
                          name={show ? "visibility" : "visibility-off"}
                        />
                      }
                      size={5}
                      mr="2"
                      color="muted.400"
                    />
                  </Pressable>
                }
                placeholder="********"
              />
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                Contraseña incorrecta
              </FormControl.ErrorMessage>
            </FormControl>
          </VStack>

          <Button
            className="rounded-full"
            height={12}
            w={{
              base: "83%",
              md: "25%",
            }}
            maxW="350px"
            onPress={() => signInWithEmail()}
          >
            <Text className="font-semibold text-white ">Ingresar</Text>
          </Button>
        </View>
        <View className="flex flex-row items-center text-center justify-center">
          <View className="w-36 border-[1px] h-0.5 border-gray-300"></View>
          <Text className="text-textmuted mx-2 text-center">o</Text>
          <View className="w-36 border-[1px] h-0.5 border-gray-300"></View>
        </View>
        <View className="flex gap-3 items-center  justify-center">
          <Button
            variant="outline"
            colorScheme="gray"
            className="rounded-full  "
            height={12}
            w={{
              base: "80%",
              md: "25%",
            }}
            maxW="350px"
          >
            <Pressable onPress={() => promptAsync()}>
              <HStack alignItems="center" space={2}>
                <Image
                  className="w-5 h-5"
                  source={{
                    uri: "https://img.icons8.com/?size=96&id=17949&format=png",
                  }}
                />
                <Text className="  font-semibold">
                  Iniciar Sesión con Google
                </Text>
              </HStack>
            </Pressable>
          </Button>
          <Button
            height={12}
            variant="outline"
            colorScheme="gray"
            className="rounded-full  "
            w={{
              base: "80%",
              md: "25%",
            }}
            maxW="350px"
          >
            <Pressable
              onPress={async () => {
                try {
                  const credential = await signInAsync({
                    requestedScopes: [
                      AppleAuthenticationScope.FULL_NAME,
                      AppleAuthenticationScope.EMAIL,
                    ],
                  });
                  // signed in
                } catch (e) {
                  if (e.code === "ERR_REQUEST_CANCELED") {
                    // handle that the user canceled the sign-in flow
                  } else {
                    // handle other errors
                  }
                }
              }}
            >
              <HStack alignItems="center" space={2}>
                <Image
                  className="w-5 h-5"
                  source={{
                    uri: "https://img.icons8.com/?size=60&id=95294&format=png",
                  }}
                />
                <Text className="  font-semibold">
                  Iniciar Sesión con Apple
                </Text>
              </HStack>
            </Pressable>
          </Button>
          <Button
            height={12}
            variant="outline"
            colorScheme="gray"
            className="rounded-full  "
            w={{
              base: "80%",
              md: "25%",
            }}
            maxW="350px"
          >
            <HStack alignItems="center" space={2}>
              <Image
                className="w-5 h-5"
                source={{
                  uri: "https://img.icons8.com/?size=96&id=uLWV5A9vXIPu&format=png",
                }}
              />
              <Text className="  font-semibold">Iniciar Sesión con Meta</Text>
            </HStack>
          </Button>
        </View>
        <HStack alignItems="center" justifyContent="center">
          <Text className="text-textmuted text-center">
            ¿No tienes una cuenta?
          </Text>
          <Link asChild href={"/(auth)/sign-up"}>
            <Button className="px-1" variant="link">
              Regístrate
            </Button>
          </Link>
        </HStack>
      </View>
    </SafeAreaView>
  );
}
