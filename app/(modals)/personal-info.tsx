import { FontAwesome } from "@expo/vector-icons";
import { supabase } from "@/utils/supabase";
import { useForm, Controller } from "react-hook-form";
import {
  Button,
  HStack,
  VStack,
  Input,
  Box,
  FormControl,
  WarningOutlineIcon,
  Divider,
} from "native-base";
import * as React from "react";
import { Image, Pressable, Text, View } from "react-native";
import DocumentPicker from 'react-native-document-picker';

export default function PersonalInfo() {
  const [show, setShow] = React.useState(false);
  const [imageUri, setImageUri] = React.useState("https://userstock.io/data/wp-content/uploads/2017/09/bewakoof-com-official-219589-300x300.jpg");
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  async function onSubmit(data: any) {
    try{
      const { error } = await supabase
        .from('usuarios_expense')
        .update({
          nombres: data.name,
          apellidos: data.lastname,
        })
        .eq('id', data.id)
      if(error) {
        throw new Error(error.message);
      }
      alert('Datos actualizados correctamente')
    }
    catch(e){
      alert(e.message);
    }
  }

  async function handleReplaceClick() {
      try {
        const res = await DocumentPicker.pickSingle({
          type: [DocumentPicker.types.images],
        });

        console.log(
          res.uri,
          res.type,
          res.name,
          res.size
        );
        setImageUri(res.uri);
        setValue('image', res.uri);
      } catch (err) {
        if (DocumentPicker.isCancel(err)) {
          // El usuario canceló la operación de selección de archivos
        } else {
          throw err;
        }
      }
    }

  return (
    <View className="flex flex-col space-y-3 justify-between mx-auto">
      <HStack>
        <View className="bg-accent w-2 h-8 rounded-full my-3 " />
        <Text className="text-[#464444] p-3 font-bold text-lg">
          Datos personales
        </Text>
      </HStack>
      <HStack
        space={12}
        marginBottom={5}
        alignItems="center"
        className="bg-background"
      >
        <Image
          source={{
            uri: imageUri
          }}
          alt="profile-pic"
          width={70}
          height={70}
          className="rounded-full "
        />
        <HStack space={2}>
          <Button
            rounded={7}
            colorScheme="gray"
            height={10}
            px={4}
            onPress={handleReplaceClick}
          >
            <Text className="text-white font-semibold">Reemplazar</Text>
          </Button>
          <Button rounded={7} height={10} colorScheme="red" variant="subtle">
            <Text className="text-red-500 font-semibold">Eliminar</Text>
          </Button>
        </HStack>
      </HStack>
      
      <View className="border-[1px] my-5 h-0.5 border-gray-300"></View>
      <VStack space={5}>
        <FormControl isInvalid={!!errors.name}>
          <FormControl.Label>Nombres</FormControl.Label>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                size={"lg"}
                onBlur={onBlur}
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
                size={"lg"}
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
                size={"lg"}
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
    </View>
  );
}
