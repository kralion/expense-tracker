import { TermsPolicyModal } from "@/components/popups/terms&policy";
import { supabase } from "@/utils/supabase";
import { FontAwesome5 } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/build/MaterialIcons";
import { v4 as uuid } from "uuid";
import { Link, router } from "expo-router";
import {
  Button,
  Center,
  Checkbox,
  Divider,
  FormControl,
  HStack,
  Icon,
  Input,
  VStack,
  WarningOutlineIcon,
} from "native-base";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  Image,
  Keyboard,
  Pressable,
  Text,
  TouchableWithoutFeedback,
  View,
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
  const [show, setShow] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [showTCModal, setShowTCModal] = React.useState(false);

  async function signUpWithEmail(data: FormData) {
    setLoading(true);
    try {
      const { error, data: authData } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: "https://expense-tracker-web-nine.vercel.app",
        },
      });
      if (error) {
        Alert.alert(`Error de Registro: ${error.message}`);
      } else if (authData) {
        const { error: insertError, data: authDataForm } = await supabase
          .from("usuarios")
          .insert([
            {
              id: uuid(),
              nombres: data.nombres,
              apellidos: data.apellidos,
              session_id: authData.user?.id,
              rol: "free",
              terms: true,
            },
          ]);
        console.log(authDataForm);
        if (insertError) {
          console.error("Insert error:", insertError.message);
        }
      }
    } catch (e: any) {
      Alert.alert(`Error inesperado: ${e.message}`);
    } finally {
      setLoading(false);
      reset();
      router.push("/(auth)/sign-in");
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView>
        <VStack space={5} className="flex items-start " mx={7}>
          <VStack space={2}>
            <Text className="mt-10 text-3xl font-bold ">Crea una cuenta</Text>
            <HStack space={1} alignItems="center">
              <Text className=" ">Si ya tienes una cuenta ?</Text>
              <Link asChild href="/(auth)/sign-in">
                <Button className="p-0" variant="link">
                  Inicia Sesión
                </Button>
              </Link>
            </HStack>
          </VStack>
        </VStack>
        <VStack justifyContent="center" space={5} mx={7}>
          <HStack mt={4} space={3}>
            <Button bgColor="black" flex={1} rounded={7} height={12}>
              <FontAwesome5 size={24} color="white" name="apple" />
            </Button>
            <Button colorScheme="blue" flex={1} rounded={7} height={12}>
              <FontAwesome5 size={24} color="white" name="facebook" />
            </Button>
            <Button
              background="#F5F3F3"
              flex={1}
              rounded={7}
              borderWidth={0.2}
              height={12}
            >
              <Image
                className="w-5 h-5 mr-2"
                source={{
                  uri: "https://img.icons8.com/?size=96&id=17949&format=png",
                }}
              />
            </Button>
          </HStack>
          <HStack space={3} alignItems="center">
            <Divider flex={1} orientation="horizontal" />
            <Text>o</Text>
            <Divider flex={1} orientation="horizontal" />
          </HStack>
          <TermsPolicyModal
            openModal={showTCModal}
            setOpenModal={setShowTCModal}
          />
          <HStack space={3}>
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
              maxW={180}
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
                  type={show ? "text" : "password"}
                  passwordRules={
                    "minlength: 8; required: lower; required: upper; required: digit; required: [-];"
                  }
                  InputRightElement={
                    <Pressable onPress={() => setShow(!show)}>
                      <Icon
                        as={
                          <MaterialIcons
                            name={show ? "visibility" : "visibility-off"}
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
        <VStack space={5} px={7}>
          <FormControl
            isInvalid={
              !!errors.termsAndConditions && !!errors.termsAndConditions.message
            }
          >
            <HStack mt={5}>
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
            className="mt-5 "
            size="lg"
            onPress={handleSubmit((data: FormData) => {
              signUpWithEmail(data);
            })}
            py={5}
            rounded={10}
            isLoading={loading}
          >
            <Text className="font-semibold text-white ">Registrarse</Text>
          </Button>

          <Text className="text-mute text-[12px] mt-3  ">
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
        <Center mt={20}>
          <Text className="text-mute text-[12px]">
            Copyright © SoloPrenuer - FIS Corp. Derechos Reservados
          </Text>
        </Center>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
