import { supabase } from "@/utils/supabase";
import {
  Button,
  FormControl,
  HStack,
  Input,
  VStack,
  WarningOutlineIcon,
} from "native-base";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { Image, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";

const DEFAULT_IMAGE_URI =
  "https://cdn-icons-png.flaticon.com/128/6542/6542999.png";

export default function PersonalInfo() {
  const [imageUri, setImageUri] = React.useState(DEFAULT_IMAGE_URI);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  async function onSubmit(data: any) {
    try {
      const { error } = await supabase
        .from("usuarios_expense")
        .update({
          nombres: data.name,
          apellidos: data.lastname,
        })
        .eq("id", data.id);
      if (error) {
        throw new Error(error.message);
      }
      alert("Datos actualizados correctamente");
    } catch (e: any) {
      alert(e.message);
    }
  }
  const deleteImage = () => {
    setImageUri(DEFAULT_IMAGE_URI);
  };
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets[0]) {
      setValue("image", result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };

  React.useEffect(() => {
    (async () => {
      const { granted } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!granted) {
        alert("Permission was not granted");
      }
    })();
  }, []);
  return (
    <VStack marginX={7} space={5}>
      <HStack>
        <View className="bg-accent w-1 h-8 rounded-full my-3 " />
        <Text className="text-[#464444] p-3 font-bold text-lg">
          Datos personales
        </Text>
      </HStack>
      <HStack
        space={12}
        marginBottom={5}
        alignItems="center"
        justifyContent="space-between"
        className="bg-background"
      >
        <HStack space={2} alignItems="center">
          <Image
            source={{ uri: imageUri }}
            className="w-14 h-14 rounded-full"
          />
          <Text className="text-textmuted text-sm">Foto de perfil</Text>
        </HStack>
        <HStack space={2}>
          <Button
            rounded={7}
            colorScheme="primary"
            height={10}
            px={4}
            onPress={pickImageAsync}
          >
            <Text className="text-white font-semibold">Reemplazar</Text>
          </Button>
          <Button
            onPress={deleteImage}
            rounded={7}
            height={10}
            colorScheme="error"
            variant="outline"
          >
            Quitar
          </Button>
        </HStack>
      </HStack>

      <View className="border-0.5  border-gray-300"></View>
      <VStack space={5}>
        <FormControl isInvalid={!!errors.name}>
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
                //TODO : El valor debe ser el nombre del usuario y no un placeholder
                value={value}
                placeholder="Nombre"
              />
            )}
            name="name"
            rules={{ required: true }}
            defaultValue=""
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {errors.name && "Este campo es requerido"}
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.lastname}>
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
            name="lastname"
            rules={{ required: true }}
            defaultValue=""
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {errors.lastname && "Este campo es requerido"}
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
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {errors.email && "Este campo es requerido"}
          </FormControl.ErrorMessage>
        </FormControl>

        <Button
          onPress={handleSubmit(onSubmit)}
          colorScheme="primary"
          rounded={10}
          py={4}
        >
          Actualizar datos
        </Button>
      </VStack>
    </VStack>
  );
}
