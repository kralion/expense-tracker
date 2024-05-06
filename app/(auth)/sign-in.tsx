import { AppleAuthButton } from "@/components/auth/Apple.auth";
import FacebookSignInButton from "@/components/auth/Facebook.auth";
import GoogleSignInButton from "@/components/auth/Google.native.auth";
import { supabase } from "@/utils/supabase";
import { MaterialIcons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import {
  Button,
  Divider,
  FormControl,
  HStack,
  Icon,
  Input,
  ScrollView,
  Alert,
  VStack,
  WarningOutlineIcon,
  useToast,
} from "native-base";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  AppState,
  Keyboard,
  Pressable,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type FormData = {
  email: string;
  password: string;
};
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});
export default function SignIn() {
  const {
    control,
    handleSubmit,

    formState: { errors },
  } = useForm<FormData>();
  const [show, setShow] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const toast = useToast();
  async function signInWithEmail(data: FormData) {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    if (error) {
      toast.show({
        render: () => (
          <Alert variant="solid" rounded={10} px={5} status="error">
            <HStack space={2} alignItems="center">
              <Alert.Icon mt="1" />
              <Text className="text-white">Credenciales inválidas</Text>
            </HStack>
          </Alert>
        ),
        description: "",
        duration: 2000,
        placement: "top",
        variant: "solid",
      });
    } else {
      router.push("/(tabs)/");
    }
    setLoading(false);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView>
        <SafeAreaView>
          <VStack space={1} m={4}>
            <Text className=" text-3xl font-bold tracking-tight">
              Inicio de Sesión
            </Text>
            <Text>Disfruta las bondades de Expense Tracker</Text>
          </VStack>
          <VStack space={4} m={4}>
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

            <Button
              rounded={10}
              py={5}
              marginTop={5}
              alignItems="center"
              onPress={handleSubmit((data) => {
                signInWithEmail(data);
              })}
              isLoading={loading}
            >
              <Text className="font-semibold text-white ">Ingresar</Text>
            </Button>

            <HStack space={2} alignItems="center">
              <Divider flex={1} orientation="horizontal" />
              <Text>o</Text>
              <Divider flex={1} orientation="horizontal" />
            </HStack>
            <GoogleSignInButton />
            <AppleAuthButton />
            <FacebookSignInButton />
          </VStack>

          <HStack
            alignItems="center"
            space={1}
            marginTop={16}
            justifyContent="center"
          >
            <Text className="text-textmuted text-center">
              ¿No tienes una cuenta?
            </Text>
            <Link asChild href={"/(auth)/sign-up"}>
              <Button className="p-0" variant="link">
                Regístrate
              </Button>
            </Link>
          </HStack>
        </SafeAreaView>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
