import * as Google from "expo-auth-session/providers/google";
import { useForm, Controller, set } from "react-hook-form";
import { MaterialIcons } from "@expo/vector-icons";
import {
  AppleAuthenticationScope,
  signInAsync,
} from "expo-apple-authentication";
import { Link, router } from "expo-router";
import {
  Button,
  Center,
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

type FormData = {
  email: string;
  password: string;
};

export default function SignIn() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [show, setShow] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [invalidCredentials, setInvalidCredentials] = React.useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId:
      "422618280931-fc0s3ktar0vcgoc80n128589e5ahhk1e.apps.googleusercontent.com",
    androidClientId:
      "422618280931-50inl7uig7t4p5k6o89521jejcic2llj.apps.googleusercontent.com",
    scopes: ["profile", "email"],
  });

  async function signInWithEmail(data: FormData) {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      setLoading(false);
      setInvalidCredentials(true);
      setTimeout(() => {
        setInvalidCredentials(false);
      }, 3000);
    } else {
      router.push("/(tabs)/");
    }
  }

  return (
    <SafeAreaView>
      <View className="flex flex-col space-y-7 justify-between ">
        <VStack space={5} className="flex items-start mx-7">
          <VStack space={2}>
            <Text className=" text-3xl font-bold tracking-tight mt-10">
              Inicio de Sesión
            </Text>

            <Text>
              Disfruta las bondades de la{" "}
              <Text className="font-semibold text-primary">
                Expense Tracker
              </Text>
            </Text>
          </VStack>
        </VStack>
        <VStack space={5} paddingX={7}>
          <FormControl isInvalid={!!errors.email}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  py={3}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  autoCapitalize="none"
                  borderRadius={7}
                  placeholder="Correo electrónico"
                  size="lg"
                />
              )}
              name="email"
              rules={{
                required: {
                  value: true,
                  message: "Email es requerido",
                },
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Email no es válido",
                },
              }}
              defaultValue=""
            />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              {errors.email && errors.email.message}
            </FormControl.ErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.password}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  py={3}
                  onBlur={onBlur}
                  placeholder="Contraseña"
                  size="lg"
                  onChangeText={onChange}
                  value={value}
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
                />
              )}
              name="password"
              rules={{ required: true }}
              defaultValue=""
            />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              {errors.password && "Este campo es requerido"}
            </FormControl.ErrorMessage>
          </FormControl>
          {invalidCredentials && (
            <HStack space={1} justifyContent="center" alignContent="center">
              <MaterialIcons color="#ef4444" name="dangerous" size={16} />
              <Text className="text-red-500">Credenciales inválidas</Text>
            </HStack>
          )}

          <Button
            rounded={10}
            py={5}
            marginTop={7}
            alignItems="center"
            onPress={handleSubmit((data) => {
              signInWithEmail(data);
            })}
            isLoading={loading}
          >
            <Text className="font-semibold text-white ">Ingresar</Text>
          </Button>

          <View className="flex flex-row px-4 items-center text-center justify-center">
            <View className="w-1/2 border-[1px] h-0.5 border-gray-300"></View>
            <Text className="text-textmuted mx-2 text-center">o</Text>
            <View className=" w-1/2 border-[1px] h-0.5 border-gray-300"></View>
          </View>
          <Button
            variant="outline"
            colorScheme="gray"
            className="rounded-full  "
            height={12}
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
                } catch (e: any) {
                  if (e.code === "ERR_REQUEST_CANCELED") {
                    <HStack space={1} alignContent="center">
                      <MaterialIcons
                        color="#ef4444"
                        name="dangerous"
                        size={16}
                      />
                      <Text className="text-red-500">
                        Debes iniciar sesión con Apple para continuar
                      </Text>
                    </HStack>;
                  } else {
                    <HStack space={1} alignContent="center">
                      <MaterialIcons
                        color="#ef4444"
                        name="dangerous"
                        size={16}
                      />
                      <Text className="text-red-500">
                        Ocurrió un error al iniciar sesión con Apple
                      </Text>
                    </HStack>;
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
        </VStack>
      </View>
      <HStack alignItems="center" marginTop={20} justifyContent="center">
        <Text className="text-textmuted text-center">
          ¿No tienes una cuenta?
        </Text>
        <Link asChild href={"/(auth)/sign-up"}>
          <Button className="px-1" variant="link">
            Regístrate
          </Button>
        </Link>
      </HStack>
    </SafeAreaView>
  );
}
