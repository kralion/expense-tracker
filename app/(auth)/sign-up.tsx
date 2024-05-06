import { TermsPolicyModal } from "@/components/popups/terms&policy";
import { supabase } from "@/utils/supabase";
import { FontAwesome5 } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/build/MaterialIcons";
import { Image } from "expo-image";
import { Link, router } from "expo-router";
import {
  Alert,
  Button,
  Center,
  Checkbox,
  Divider,
  FormControl,
  HStack,
  Icon,
  Input,
  ScrollView,
  VStack,
  WarningOutlineIcon,
  useToast,
} from "native-base";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Keyboard,
  Pressable,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type FormData = {
  nombres: string;
  apellidos: string;
  email: string;
  password: string;
  termsAndConditions: boolean;
};

export default function SignUp() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [showTCModal, setShowTCModal] = React.useState(false);
  const toast = useToast();

  async function sendWelcomeNotification(userId: string) {
    const notification = {
      titulo: "Bienvenido !!!",
      descripcion:
        "Registrado exitosamente en la app, ahora puedes comenzar a usarla con el plan gratuito.",
      fecha: new Date().toISOString(),
      usuario_id: userId,
      tipo: "INFO",
    };

    await supabase.from("notificaciones").insert(notification);
  }

  async function signUpWithEmail(data: FormData) {
    setLoading(true);
    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        emailRedirectTo: "https://expensetrackerweb.vercel.app",
      },
    });

    if (error) {
      toast.show({
        render: () => (
          <Alert variant="solid" rounded={10} px={5} status="error">
            <HStack space={2} alignItems="center">
              <Alert.Icon mt="1" />
              <Text className="text-white">Error de Registro</Text>
            </HStack>
          </Alert>
        ),
        description: "",
        duration: 2000,
        placement: "top",
        variant: "solid",
      });
    } else {
      toast.show({
        render: () => (
          <Alert variant="solid" rounded={10} px={5} status="success">
            <HStack space={2} alignItems="center">
              <Alert.Icon mt="1" />
              <Text className="text-white">
                Registro exitoso, ahora puedes comenzar a usarla con el plan
                gratuito.
              </Text>
            </HStack>
          </Alert>
        ),
        description: "",
        duration: 2000,
        placement: "top",
        variant: "solid",
      });
      if (authData.user) {
        await sendWelcomeNotification(authData.user.id);
      }
      setLoading(false);
      reset();
      router.push("/(auth)/sign-in");
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView>
        <SafeAreaView>
          <VStack space={4} className="flex items-start " m={4}>
            <VStack space={1}>
              <Text className="text-3xl font-bold ">Crea una cuenta</Text>
              <HStack space={1} alignItems="center">
                <Text className=" ">Ya tienes una cuenta ?</Text>
                <Link asChild href="/(auth)/sign-in">
                  <Button className="p-0" variant="link">
                    Inicia Sesión
                  </Button>
                </Link>
              </HStack>
            </VStack>
          </VStack>
          <VStack justifyContent="center" space={4} mx={4}>
            <HStack space={4}>
              <Button bgColor="black" flex={1} rounded={5} height={12}>
                <FontAwesome5 size={24} color="white" name="apple" />
              </Button>
              <Button colorScheme="blue" flex={1} rounded={5} height={12}>
                <FontAwesome5 size={24} color="white" name="facebook" />
              </Button>
              <Button
                background="#F5F3F3"
                flex={1}
                rounded={5}
                borderWidth={0.2}
                height={12}
              >
                <Image
                  style={{ width: 24, height: 24 }}
                  source={{
                    uri: "https://img.icons8.com/?size=96&id=17949&format=png",
                  }}
                  alt="google"
                />
              </Button>
            </HStack>
            <HStack space={2} alignItems="center">
              <Divider flex={1} orientation="horizontal" />
              <Text>o</Text>
              <Divider flex={1} orientation="horizontal" />
            </HStack>
            <TermsPolicyModal
              openModal={showTCModal}
              setOpenModal={setShowTCModal}
            />
            <HStack space={4}>
              <FormControl
                flex={1}
                isRequired
                isInvalid={!!errors.nombres && !!errors.nombres.message}
              >
                <Controller
                  name="nombres"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "Requerido",
                    },
                    pattern: {
                      value: /^[a-zA-Z\s]*$/,
                      message: "Solo puede contener letras",
                    },
                  }}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      size="lg"
                      borderRadius={7}
                      py={3}
                      placeholder="Nombres"
                      value={value}
                      onChangeText={(value) => onChange(value)}
                    />
                  )}
                />
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}
                >
                  {errors.nombres && errors.nombres.message}
                </FormControl.ErrorMessage>
              </FormControl>

              <FormControl
                flex={1}
                isInvalid={!!errors.apellidos && !!errors.apellidos.message}
              >
                <Controller
                  name="apellidos"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "Requerido",
                    },
                    pattern: {
                      value: /^[a-zA-Z\s]*$/,
                      message: "Solo puede contener letras",
                    },
                  }}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      size="lg"
                      borderRadius={7}
                      py={3}
                      placeholder="Apellidos"
                      value={value}
                      onChangeText={(value) => onChange(value)}
                    />
                  )}
                />
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}
                >
                  {errors.apellidos && errors.apellidos.message}
                </FormControl.ErrorMessage>
              </FormControl>
            </HStack>
            <FormControl isInvalid={!!errors.email && !!errors.email.message}>
              <Controller
                name="email"
                control={control}
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
                render={({ field: { onChange, value } }) => (
                  <Input
                    size="lg"
                    autoCapitalize="none"
                    borderRadius={7}
                    py={3}
                    placeholder="Email"
                    value={value}
                    onChangeText={(value) => onChange(value)}
                  />
                )}
              />
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                {errors.email && errors.email.message}
              </FormControl.ErrorMessage>
            </FormControl>

            <FormControl
              isInvalid={!!errors.password && !!errors.password.message}
            >
              <Controller
                name="password"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Contraseña es requerida",
                  },
                  minLength: {
                    value: 8,
                    message: "Contraseña debe tener al menos 8 caracteres",
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <Input
                    size="lg"
                    borderRadius={7}
                    py={3}
                    placeholder="Contraseña"
                    value={value}
                    onChangeText={(value) => onChange(value)}
                    type={showPassword ? "text" : "password"}
                    passwordRules={
                      "minlength: 8; required: lower; required: upper; required: digit; required: [-];"
                    }
                    InputRightElement={
                      <Pressable onPress={() => setShowPassword(!showPassword)}>
                        <Icon
                          as={
                            <MaterialIcons
                              name={
                                showPassword ? "visibility" : "visibility-off"
                              }
                            />
                          }
                          size={5}
                          mr="3"
                          color="muted.400"
                        />
                      </Pressable>
                    }
                  />
                )}
              />
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                {errors.password && errors.password.message}
              </FormControl.ErrorMessage>
            </FormControl>
          </VStack>
          <VStack space={4} mx={4}>
            <FormControl
              isInvalid={
                !!errors.termsAndConditions &&
                !!errors.termsAndConditions.message
              }
            >
              <HStack mt={4}>
                <Controller
                  control={control}
                  name="termsAndConditions"
                  defaultValue={false}
                  rules={{
                    required: {
                      value: true,
                      message:
                        "Debe aceptar los Términos y Condiciones para continuar",
                    },
                  }}
                  render={({ field }) => (
                    <Checkbox
                      className="border"
                      value={field.value.toString()}
                      isChecked={field.value}
                      onChange={(isChecked) => field.onChange(isChecked)}
                    >
                      <Text className="text-mute">
                        Acepto los Términos y Condiciones
                      </Text>
                    </Checkbox>
                  )}
                />
              </HStack>
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                {errors.termsAndConditions && errors.termsAndConditions.message}
              </FormControl.ErrorMessage>
            </FormControl>

            <Button
              mt={4}
              size="lg"
              onPress={handleSubmit(signUpWithEmail)}
              py={5}
              rounded={10}
              isLoading={loading}
            >
              <Text className="font-semibold text-white ">Registrarse</Text>
            </Button>

            <Text className="text-mute text-xs mt-4">
              Al continuar aceptas los{" "}
              <Text
                onPress={() => setShowTCModal(true)}
                className="text-[12px] underline text-primary"
              >
                Términos y Condiciones
              </Text>{" "}
              , estos describen como usamos tus datos y como protegemos tu
              privacidad.
            </Text>
          </VStack>
          <Center mt={16}>
            <Text className="text-mute text-xs">
              Copyright © Brayan & Miguel - 2024
            </Text>
          </Center>
        </SafeAreaView>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
