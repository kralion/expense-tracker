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
      <View className="flex flex-col space-y-6 justify-between mx-2">
        <View className="items-center space-y-5">
            <View>
                <Text className="text-[#464444] font-bold text-2xl mr-4">
                    Exportar registros de gastos
                </Text>
            </View>
        </View>
          <View className="bg-[#ffff] mx-auto w-[85%] rounded-lg">
            <HStack>
              <View className="bg-[#CABDFF] w-[3%] rounded-full my-3 ml-3"><Text></Text></View>
                <Text className="text-[#464444] p-3 font-bold text-lg">
                    Exportar como...
                </Text>
            </HStack>
            <View className="w-72 mx-auto border-b border-[#AEACAC] mt-3"></View>
            <VStack>
                <View className="mt-4 ml-3">
                  <Text className=" text-[#464444]">
                      Selecciona el tipo de documento en el que desea exportar
                  </Text>
                </View>
                <View className="flex flex-row items-center p-4 border m-4 border-[#368983] rounded-xl">
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
                <View className="flex flex-row items-center p-4 border m-4 border-[#368983] rounded-xl">
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
