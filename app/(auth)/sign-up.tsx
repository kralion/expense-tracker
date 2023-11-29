import { supabase } from "@/utils/supabase";
import { FontAwesome5 } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/build/MaterialIcons";
import { Link } from "expo-router";
import {
  Button,
  Checkbox,
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
  Pressable,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import { v4 as uuidv4 } from "uuid";

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
    formState: { errors },
  } = useForm<FormData>();
  const [show, setShow] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  async function signUpWithEmail(data: FormData) {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });
    if (error) {
      Alert.alert(error.message);
    } else {
      //TODO Corroborar el nombre de la tabla
      const { error: insertError } = await supabase.from("usuarios").insert([
        {
          id: uuidv4(),
          nombres: data.nombres,
          apellidos: data.apellidos,
          email: data.email,
          password: data.password,
          termsAndConditions: data.termsAndConditions,
        },
      ]);

      if (insertError) {
        Alert.alert(insertError.message);
      } else {
        Alert.alert("Revisa tu correo para verificar tu cuenta");
      }
    }
  }

  return (
    <SafeAreaView className="mx-7">
      <View className="bg-background ">
        <View className="flex items-start">
          <Text className="mt-10 text-3xl font-bold ">Crea una cuenta</Text>
          <View className="items-center gap-1 flex   flex-row">
            <Text className=" ">Si ya tienes una cuenta ?</Text>
            <Link asChild href="/(auth)/sign-in">
              <Button className="px-0" variant="link">
                Inicia Sesión
              </Button>
            </Link>
          </View>
        </View>
        <VStack justifyContent="center" space={5}>
          <HStack mt={4} space={3}>
            <Button
              bgColor="black"
              rounded={7}
              className="w-[105px]"
              height={12}
            >
              <FontAwesome5 size={24} color="white" name="apple" />
            </Button>
            <Button
              colorScheme="blue"
              rounded={7}
              className="w-[105px]"
              height={12}
            >
              <FontAwesome5 size={24} color="white" name="facebook" />
            </Button>
            <Button
              background="#F5F3F3"
              rounded={7}
              borderWidth={0.2}
              className="w-[100px]"
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
          <View className="flex flex-row items-center text-center justify-center">
            <View className="w-[155px] border-[1px] h-0.5 border-gray-300"></View>
            <Text className="text-textmuted mx-2 text-center">o</Text>
            <View className="w-[153px] border-[1px] h-0.5 border-gray-300"></View>
          </View>
          <HStack space={3}>
            <FormControl
              maxW={160}
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
                    w={{
                      base: "100%",
                      md: "25%",
                    }}
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
              maxW={160}
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
                    w={{
                      base: "100%",
                      md: "25%",
                    }}
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
          <FormControl
            width={370}
            isInvalid={!!errors.email && !!errors.email.message}
          >
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
                  w={{
                    base: "90%",
                    md: "25%",
                  }}
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
            width={370}
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
                  w={{
                    base: "90%",
                    md: "25%",
                  }}
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
        <FormControl
          width={370}
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
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {errors.termsAndConditions && errors.termsAndConditions.message}
          </FormControl.ErrorMessage>
        </FormControl>

        <Button
          className="mt-5 "
          size="lg"
          onPress={handleSubmit((data: FormData) => {
            signUpWithEmail(data);
          })}
          w={{
            md: "25%",
          }}
          py={5}
          width={333}
          rounded={7}
          isLoading={loading}
        >
          <Text className="font-semibold text-white ">Registrarse</Text>
        </Button>

        <Text className="text-mute text-[12px] mt-3  ">
          Al continuar aceptas el como seran tratados tus datos, si lo deseas
          puedes revisar los
          <Link asChild href={"/modal"}>
            <Text className="text-[12px] text-primary">
              {" "}
              Términos y Condiciones
            </Text>
          </Link>
        </Text>
        <View>
          <Text className="text-mute text-[12px] mt-16">
            Copyright © UNCP Association Inc. Derechos Reservados
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
