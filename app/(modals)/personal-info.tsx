import { FontAwesome } from "@expo/vector-icons";
import { useForm, Controller } from 'react-hook-form';
import { 
    Button, 
    HStack, 
    VStack, 
    Input, 
    Box, 
    FormControl, 
    WarningOutlineIcon 
} from "native-base";
import * as React from "react";
import { Image, Pressable, Text, View } from "react-native";
import DocumentPicker from 'react-native-document-picker';

export default function PersonalInfo() {
  const [show, setShow] = React.useState(false);
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

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
        space={1}
        className="bg-background mx-auto space-x-10 py-4 items-center"
      >
        <Image
            source={{
              uri:
                "https://userstock.io/data/wp-content/uploads/2017/09/bewakoof-com-official-219589-300x300.jpg"
            }}
            alt="profile-pic"
            width={70}
            height={70}
            className="rounded-full "
        />
        <Button
            className="bg-[#13151d] rounded-xl py-3 px-4"
            onPress={handleReplaceClick}
        >
            <Text
                className="text-white font-bold"
            >
                Reemplazar
            </Text>
        </Button>
        <Button
            className="bg-[#fbe8e8] rounded-xl h-9"
        >
            <Text
                className="text-[#f44336] font-bold"
            >
                Eliminar
            </Text>
        </Button>
      </HStack>

      <VStack
        space={5}
      >
        <FormControl isInvalid={!!errors.name}>
          <FormControl.Label>Nombre</FormControl.Label>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                onBlur={onBlur}
                onChangeText={onChange}
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

        <FormControl isInvalid={!!errors.email}>
          <FormControl.Label>Correo electrónico</FormControl.Label>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                onBlur={onBlur}
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

        <FormControl isInvalid={!!errors.address}>
          <FormControl.Label>Dirección</FormControl.Label>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Dirección"
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

        <Button onPress={handleSubmit(onSubmit)} className="bg-[#fbe8e8] rounded-xl py-3 px-4">
          <Text className="text-[#f44336] font-bold">Actualizar datos</Text>
        </Button>
      </VStack>
    </View>
  );
}
