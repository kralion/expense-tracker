import useAuth from "@/context/AuthContext";
import { supabase } from "@/utils/supabase";
import { FontAwesome5 } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import CameraIcon from "@/assets/svgs/camera.svg";
import {
  Alert,
  Avatar,
  Button,
  FormControl,
  HStack,
  Input,
  ScrollView,
  VStack,
  WarningOutlineIcon,
  useToast,
} from "native-base";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { Keyboard, Text, TouchableWithoutFeedback, View } from "react-native";
interface FormData {
  nombres: string;
  apellidos: string;
  email?: string;
  perfil: string;
}

export default function PersonalInfo() {
  const { userData, session } = useAuth();
  const toast = useToast();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nombres: userData?.nombres,
      apellidos: userData?.apellidos,
      email: session?.user?.email,
      perfil: "https://img.icons8.com/?size=40&id=23454&format=png",
    },
  });

  async function onSubmit(data: FormData) {
    const { error } = await supabase
      .from("usuarios")
      .update({
        nombres: data.nombres,
        apellidos: data.apellidos,
      })
      .eq("id", userData.id);

    if (error) {
      toast.show({
        render: () => (
          <Alert variant="solid" rounded={10} px={5} status="error">
            <HStack space={2} alignItems="center">
              <Alert.Icon mt="1" />
              <Text className="text-white">Error al actualizar los datos</Text>
            </HStack>
          </Alert>
        ),
        description: "",
        duration: 2000,
        placement: "top",
        variant: "solid",
      });
      return;
    }

    toast.show({
      render: () => (
        <Alert variant="solid" rounded={10} px={5} status="success">
          <HStack space={2} alignItems="center">
            <Alert.Icon mt="1" />
            <Text className="text-white">Datos actualizados</Text>
          </HStack>
        </Alert>
      ),
      description: "",
      duration: 2000,
      placement: "top",
      variant: "solid",
    });
  }

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets[0]) {
      setValue("perfil", result.assets[0].uri);
    }
  };

  React.useEffect(() => {
    (async () => {
      const { granted } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!granted) {
        alert("Aceptar los permisos para acceder a la galería");
      }
    })();
  }, []);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView background="white">
        <VStack margin={5} space={3}>
          <VStack alignItems="center" space={3}>
            <HStack space={2} alignItems="center">
              <Avatar
                bg="teal.600"
                alignSelf="center"
                size="2xl"
                source={{
                  uri: userData.foto,
                }}
              />
            </HStack>

            <Button
              onPress={pickImageAsync}
              rounded={7}
              variant="subtle"
              colorScheme="gray"
              height={10}
            >
              <CameraIcon width={30} height={30} />
            </Button>
          </VStack>
          <HStack>
            <View className="bg-accent w-1 h-8 rounded-full my-3 " />
            <Text className="text-[#464444] p-3 font-bold text-lg">
              Informacion Básica
            </Text>
          </HStack>
          <VStack space={5}>
            <FormControl isInvalid={!!errors.nombres}>
              <FormControl.Label>Nombres</FormControl.Label>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    size="lg"
                    rounded={7}
                    onBlur={onBlur}
                    py={3}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="nombres"
                rules={{ required: true }}
                defaultValue=""
              />
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                {errors.nombres && "Este campo es requerido"}
              </FormControl.ErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.apellidos}>
              <FormControl.Label>Apellidos</FormControl.Label>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    size="lg"
                    rounded={7}
                    py={3}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    //TODO : El valor debe ser el apellido del usuario y no un placeholder
                    value={value}
                    placeholder="Apellido"
                  />
                )}
                name="apellidos"
                rules={{ required: true }}
                defaultValue=""
              />
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                {errors.apellidos && "Este campo es requerido"}
              </FormControl.ErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.email}>
              <FormControl.Label>Correo electrónico</FormControl.Label>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    onBlur={onBlur}
                    size="lg"
                    rounded={7}
                    py={3}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Correo electrónico"
                  />
                )}
                name="email"
                rules={{ required: true }}
                defaultValue=""
              />
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                {errors.email && "Este campo es requerido"}
              </FormControl.ErrorMessage>
            </FormControl>

            <Button
              onPress={handleSubmit(onSubmit)}
              colorScheme="primary"
              borderRadius={10}
              mt={4}
              height={12}
            >
              <Text className="font-semibold text-white ">
                Actualizar Datos
              </Text>
            </Button>
          </VStack>
        </VStack>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
