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

export default function Export() {
  
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
          
            <View className="mt-4 ml-3">
              <Text className=" text-[#464444]">
                  Selecciona el tipo de documento en el que desea exportar
              </Text>
            </View>


              <View className="flex flex-row justify-center items-center gap-4 mt-3">
                <Button className="bg-[#ecf3ff] border border-[#2a5598]">
                  <Pressable>
                    <HStack>
                      <Image
                        className="w-5 h-5 mr-2"
                        source={{
                          uri: "https://img.icons8.com/?size=48&id=13674&format=png",
                        }}
                      />
                      <Text className="font-semibold text-black">
                        Archivo Word
                      </Text>
                    </HStack>
                  </Pressable>
                </Button>

                <Button className="bg-[#e1ffee] border border-[#217346]">
                  <Pressable>
                    <HStack>
                      <Image
                        className="w-5 h-5 mr-2"
                        source={{
                          uri: "https://img.icons8.com/?size=48&id=13654&format=png",
                        }}
                      />
                      <Text className="font-semibold text-black">
                        Archivo Excel
                      </Text>
                    </HStack>
                  </Pressable>
                </Button>
            </View>
            <View className="w-[45%] mx-auto mt-5 ">
              <Button className="bg-[#fbebe9] border border-[#b53629]">
                  <Pressable>
                    <HStack>
                      <Image
                        className="w-5 h-5 mr-2"
                        source={{
                          uri: "https://img.icons8.com/?size=48&id=13417&format=png",
                        }}
                      />
                      <Text className="font-semibold text-black">
                        Archivo PDF
                      </Text>
                    </HStack>
                  </Pressable>
                </Button>
            </View>
            <Button
                    colorScheme="teal"
                    className="rounded-lg mb-4 ml-3 mt-7"
                    height={10}
                    w={40}
                    maxW="100px"
                  >
                    <Text className="font-semibold text-white ">Registrar</Text>
                </Button> 
          </View>        
      </View>
    </SafeAreaView>
  );
}

