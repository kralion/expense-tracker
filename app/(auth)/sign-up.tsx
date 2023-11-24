import { supabase } from "@/utils/supabase";
import { FontAwesome5 } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/build/MaterialIcons";
import { Link } from "expo-router";
import {
  Button,
  Center,
  Checkbox,
  FormControl,
  HStack,
  Icon,
  Input,
  VStack,
} from "native-base";
import * as React from "react";
import {
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from "react-native";

export default function SignUp() {
  {
    /* //TODO : Agregar validación y todo el staff relacionad con formularios utilizando RHF */
  }
  const [show, setShow] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [nombres, setNombres] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  async function signUpWithEmail() {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert(error.message);
    } else if (data && data.user) {
      // Agregar nombres y apellidos a la tabla de usuarios
      const { data: userData, error: userError } = await supabase
        .from("app_users")
        .insert([{ id: data.user.id, nombres: nombres }]);

      if (userError) {
        Alert.alert(userError.message);
      }
    }

    setLoading(false);
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
        <VStack justifyContent="center" space={4}>
          <HStack mt={4} space={6}>
            <Button bgColor="black" rounded={7} width={24} height={12}>
              <FontAwesome5 size={24} color="white" name="apple" />
            </Button>
            <Button colorScheme="blue" rounded={7} width={24} height={12}>
              <FontAwesome5 size={24} color="white" name="facebook" />
            </Button>
            <Button
              background="#F5F3F3"
              rounded={7}
              borderWidth={0.2}
              width={24}
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
            <FormControl maxW={160}>
              <Input
                value={nombres}
                size="lg"
                py={3}
                borderRadius={7}
                onChange={(value) => setNombres(value.nativeEvent.text)}
                placeholder="Nombres"
              />
            </FormControl>
            <FormControl maxW={160}>
              <Input
                size="lg"
                borderRadius={7}
                py={3}
                w={{
                  base: "100%",
                  md: "25%",
                }}
                placeholder="Apellidos"
              />
            </FormControl>
          </HStack>

          <FormControl width={370}>
            <Input
              size="lg"
              value={email}
              w={{
                base: "90%",
                md: "25%",
              }}
              py={3}
              onChange={(value) => setEmail(value.nativeEvent.text)}
              borderRadius={7}
              placeholder="Email"
            />
          </FormControl>
          <FormControl width={370}>
            <Input
              size="lg"
              value={password}
              w={{
                base: "90%",
                md: "25%",
              }}
              py={3}
              onChange={(value) => setPassword(value.nativeEvent.text)}
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
                    mr="3"
                    color="muted.400"
                  />
                </Pressable>
              }
              placeholder="Contraseña"
            />
          </FormControl>
        </VStack>
        <HStack mt={5}>
          <Checkbox
            shadow="none"
            borderWidth={1}
            value="acepto"
            accessibilityLabel="Terminos y Condiciones"
            defaultIsChecked
          >
            <Text className="text-mute">Acepto los Términos y Condiciones</Text>
          </Checkbox>
        </HStack>

        <Button
          className="rounded-md mt-5 "
          size="lg"
          onPress={() => signUpWithEmail()}
          w={{
            md: "25%",
          }}
          py={4}
          width={333}
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
