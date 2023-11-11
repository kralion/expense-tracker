import { Pressable, Image, Text, View, SafeAreaView, TextInput} from "react-native";
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

export default function SignUp() {
  
  const [show, setShow] = React.useState(false);

  return (
    <SafeAreaView>
      <View className="bg-[#F5F6F] flex items-center">
        <Text className="text-right ml-32">
          ¿Ya es miembro?{" "} 
          <Text className="text-[#4285F4] font-semibold">
            Inicie Sesión
          </Text>
        </Text>
        <Text className="mt-10 text-2xl font-semibold text-gray-700 text-center">
          Registrarse Expense Tracker
        </Text>
        
        <View className="flex flex-row justify-center items-center gap-4 mt-5">
          <Button className="bg-[#368983]">
            <Pressable>
              <HStack>
                <Image
                  className="w-5 h-5 mr-2"
                  source={{
                    uri: "https://img.icons8.com/?size=96&id=17949&format=png",
                  }}
                />
                <Text className="font-semibold text-white">
                  Registrarse con Google
                </Text>
              </HStack>
            </Pressable>
          </Button>
          <Button className="bg-[#368983]">
            <Pressable>
              <HStack>
              <Image
                className="w-5 h-5"
                source={{
                  uri: "https://img.icons8.com/?size=96&id=uLWV5A9vXIPu&format=png",
                }}
              />
              </HStack>
            </Pressable>
          </Button>
          <Button className="bg-[#368983]">
            <Pressable>
              <HStack>
              <Image
                  className="w-5 h-5"
                  source={{
                    uri: "https://img.icons8.com/?size=60&id=95294&format=png",
                  }}
                />
              </HStack>
            </Pressable>
          </Button>
        </View>
      
        <View className="mx-auto w-80 border-b border-[#AEACAC] mt-3"></View>

        <View className="flex flex-row justify-center gap-3 mt-3">
          <FormControl w="85%" maxW="150px">
            <FormControl.Label marginBottom={2}>
              Nombres
            </FormControl.Label>
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
            <FormControl.Label marginBottom={2}>
              Apellidos
            </FormControl.Label>
            <Input
                size="lg"
                borderRadius={7}
                w={{
                  base: "100%",
                  md: "25%",
                }}
              />
          </FormControl>       
        </View>
        <View className="flex flex-col items-center">
          <VStack>
          <FormControl w="85%" maxW="350px">
            <FormControl.Label marginBottom={2}>
              Correo electrónico
            </FormControl.Label>
            <Input
                size="lg"
                borderRadius={7}
                w={{
                  base: "90%",
                  md: "25%",
                }}
              />
          </FormControl>
          <FormControl w="85%" maxW="350px">
            <FormControl.Label marginBottom={2}>
              Contraseña
            </FormControl.Label>
            <Input
                size="lg"
                borderRadius={7}
                w={{
                  base: "90%",
                  md: "25%",
                }}
                type={show ? "text" : "password"}
                passwordRules={
                  "required: upper; required: lower; required: digit; minlength: 8;"
                }
              />
          </FormControl>  
          </VStack>
        </View>


        <View className="mx-10">
          <Text className="mt-5 text-center text-[#AEACAC]">
            Al crear una cuenta, acepta nuestros{" "}
          <Text className="text-primary font-semibold">Términos y condiciones.</Text>
          </Text>
        </View>

        <Button
            className="rounded-md mt-5 bg-[#368983]"
            height={12}
            w={{
              base: "83%",
              md: "25%",
            }}
            maxW="350px"
          >
            <Text className="font-semibold text-white ">Ingresar</Text>
        </Button>     

        <View>
          <Text className="text-[#AEACAC] mt-16 mr-28 text-[11px]">
            Este sitio esta protegido por reCAPTCHA
          </Text>
        </View>

      </View>
    </SafeAreaView>
  );
}
