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

export default function Wallet() {
  
  const [show, setShow] = React.useState(false);

  return (
    <SafeAreaView>
      <View className="flex flex-col justify-between mx-2">
        <View className="items-center mb-4">
            <View>
                <Text className="text-[#464444] font-bold text-2xl mr-32">
                    Metas de ahorro
                </Text>
            </View>
        </View>
          <View className="bg-[#ffff] mx-auto w-[85%] rounded-lg">
            <HStack>
              <View className="bg-[#CABDFF] w-[3%] rounded-full my-3 ml-3"><Text></Text></View>
                <Text className="text-[#464444] p-3 font-bold text-lg">
                    Ingresar los detalles
                </Text>
            </HStack>
            <View className="w-72 mx-auto border-b border-[#AEACAC]"></View>
            <VStack>
                <View className="mt-2 ml-4">
                  <Text className=" text-[#464444]">
                      Metas a corto plazo
                  </Text>
                </View>
                <View className="flex flex-row items-center p-4 mr-4 rounded-xl">
                  <Image
                      className="w-7 h-7 mr-2"
                      source={{
                        uri: "https://img.icons8.com/?size=48&id=13013&format=png",
                      }}
                  />
                  <Input
                    size="sm"
                    borderRadius={7}
                    w={{
                      base: "90%",
                      md: "25%",
                    }}
                    placeholder="Ingresa el monto de meta de ahorro"
                />
                </View>   
                <View className="flex flex-row items-center px-4 mb-4 mr-4 rounded-xl">
                  <Image
                      className="w-7 h-7 mr-2"
                      source={{
                        uri: "https://img.icons8.com/?size=80&id=TVHK3ohcpSmp&format=gif",
                      }}
                  />
                  <Input
                    size="sm"
                    borderRadius={7}
                    w={{
                      base: "90%",
                      md: "25%",
                    }}
                    placeholder="Ingresa la fecha limite de ahorro"
                />
                </View>   
                <Button
                    colorScheme="teal"
                    className="rounded-full mb-4 ml-48"
                    height={10}
                    w={40}
                    maxW="100px"
                  >
                    <Text className="font-semibold text-white ">Registrar</Text>
                </Button>  
            </VStack>
          </View>   

          <View className="bg-[#ffff] mx-auto w-[85%] rounded-lg mt-7">
            <HStack>
              <View className="bg-[#CABDFF] w-[3%] rounded-full my-3 ml-3"><Text></Text></View>
                <Text className="text-[#464444] p-3 font-bold text-lg">
                    Ingresar los detalles
                </Text>
            </HStack>
            <View className="w-72 mx-auto border-b border-[#AEACAC]"></View>
            <VStack>
                <View className="mt-2 ml-4">
                  <Text className=" text-[#464444]">
                      Metas a largo plazo
                  </Text>
                </View>
                <View className="flex flex-row items-center p-4 mr-4 rounded-xl">
                  <Image
                      className="w-7 h-7 mr-2"
                      source={{
                        uri: "https://img.icons8.com/?size=48&id=13013&format=png",
                      }}
                  />
                  <Input
                    size="sm"
                    borderRadius={7}
                    w={{
                      base: "90%",
                      md: "25%",
                    }}
                    placeholder="Ingresa el monto de meta de ahorro"
                />
                </View>   
                <View className="flex flex-row items-center px-4 mb-4 mr-4 rounded-xl">
                  <Image
                      className="w-7 h-7 mr-2"
                      source={{
                        uri: "https://img.icons8.com/?size=80&id=TVHK3ohcpSmp&format=gif",
                      }}
                  />
                  <Input
                    size="sm"
                    borderRadius={7}
                    w={{
                      base: "90%",
                      md: "25%",
                    }}
                    placeholder="Ingresa la fecha limite de ahorro"
                />
                </View>   
                <Button
                    colorScheme="teal"
                    className="rounded-full mb-4 ml-48"
                    height={10}
                    w={40}
                    maxW="100px"
                  >
                    <Text className="font-semibold text-white ">Registrar</Text>
                </Button>  
            </VStack>
          </View>      
      </View>
    </SafeAreaView>
  );
}
