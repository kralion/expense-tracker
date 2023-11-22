import { supabase } from "@/utils/supabase";
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
  const [loading, setLoading] = React.useState(false);

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    if (!session)
      Alert.alert("Por favor, revisa tu correo electrónico para verificarlo");
    setLoading(false);
  }
  return (
    <SafeAreaView>
      <View className="bg-[#F5F6F] flex items-center">
        <View className="items-center gap-1 flex ml-24  flex-row">
          <Text className="  text-textmuted text-center">
            Ya tienes una cuenta ?
          </Text>
          <Link asChild href="/(auth)/sign-in">
            <Button className="px-0" variant="link">
              Inicia Sesión
            </Button>
          </Link>
        </View>
        <Text className="mt-10 text-2xl font-semibold text-gray-700 text-center">
          Regístrate en Expense Tracker
        </Text>
        <VStack alignItems="center" space={4}>
          <View className="flex flex-row justify-center items-center gap-4 mt-5">
            <Button>
              <HStack>
                <Image
                  className="w-5 h-5 mr-2"
                  source={{
                    uri: "https://img.icons8.com/?size=50&id=17950&format=png",
                  }}
                />
                <Text className="font-semibold text-white">
                  Registrarse con Google
                </Text>
              </HStack>
            </Button>
            <Button>
              <HStack>
                <Image
                  className="w-5 h-5"
                  source={{
                    uri: "https://img.icons8.com/?size=50&id=8818&format=png",
                  }}
                />
              </HStack>
            </Button>
            <Button>
              <HStack>
                <Image
                  className="w-5 h-5"
                  source={{
                    uri: "https://img.icons8.com/?size=60&id=95294&format=png",
                  }}
                />
              </HStack>
            </Button>
          </View>

          <HStack space={3}>
            <FormControl w="85%" maxW="150px">
              <FormControl.Label marginBottom={2}>Nombres</FormControl.Label>
              <Input
                size="lg"
                borderRadius={7}
                w={{
                  base: "100%",
                  md: "25%",
                }}
              />
            </FormControl>
            <FormControl w="85%" maxW="150px">
              <FormControl.Label marginBottom={2}>Apellidos</FormControl.Label>
              <Input
                size="lg"
                borderRadius={7}
                w={{
                  base: "100%",
                  md: "25%",
                }}
              />
            </FormControl>
          </HStack>

          <FormControl w="85%" maxW="350px">
            <FormControl.Label marginBottom={2}>
              Correo electrónico
            </FormControl.Label>
            <Input
              size="lg"
              value={email}
              onChange={(value) => setEmail(value.nativeEvent.text)}
              borderRadius={7}
              w={{
                base: "90%",
                md: "25%",
              }}
              placeholder="joanhweu115@gmail.com"
            />
          </FormControl>
          <FormControl w="85%" maxW="350px">
            <FormControl.Label marginBottom={2}>Contraseña</FormControl.Label>
            <Input
              size="lg"
              value={password}
              w={{
                base: "90%",
                md: "25%",
              }}
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
                    mr="2"
                    color="muted.400"
                  />
                </Pressable>
              }
              placeholder="********"
            />
          </FormControl>
        </VStack>
        <HStack className="mr-14 " justifyContent="start" mt={5}>
          <Checkbox
            shadow="none"
            borderWidth={1}
            value="acepto"
            accessibilityLabel="Terminos y Condiciones"
            defaultIsChecked
          >
            <Text className="text-mute">Acepto los</Text>
            <Link asChild href={"/modal"}>
              <Button px={0} variant="link">
                Términos y Condiciones
              </Button>
            </Link>
          </Checkbox>
        </HStack>

        <Button
          className="rounded-md mt-5 "
          height={12}
          onPress={() => signUpWithEmail()}
          w={{
            base: "80%",
            md: "25%",
          }}
          maxW="350px"
        >
          <Text className="font-semibold text-white ">Registrarse</Text>
        </Button>

        <View>
          <Text className="text-[#AEACAC] mt-16 mr-24 text-[11px]">
            Este sitio esta protegido por reCAPTCHA
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
