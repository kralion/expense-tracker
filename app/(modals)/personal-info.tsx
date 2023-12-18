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
import { Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";
import DefaultAvatar from "@/assets/svgs/avatar.svg";
import { Session } from "@supabase/supabase-js";

export default function PersonalInfo() {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [session, setSession] = React.useState<Session | null>(null);
  const [name, setName] = React.useState("");

  async function fetchUserName(userId: string) {
    const { data, error } = await supabase
      .from("usuarios_expense")
      .select("nombres")
      .eq("id", userId)
      .single();

    if (error) {
      console.error(error);
    } else if (data) {
      setName(data.nombres);
    }
  }

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    if (session?.user?.id) {
      fetchUserName(session.user.id);
    }
  }, [session?.user?.id]);
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
          Foto de Perfil
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
          {session?.user?.user_metadata?.avatar_url ? (
            <Image
              source={{
                uri: session?.user?.user_metadata?.avatar_url,
              }}
              alt="profile-pic"
              style={{ width: 80, height: 80 }}
              className="rounded-full "
            />
          ) : (
            <DefaultAvatar width={80} height={80} />
          )}
        </HStack>
        <HStack space={2}>
          <Button
            rounded={7}
            variant="outline"
            height={10}
            px={4}
            onPress={pickImageAsync}
          >
            <Text className="text-primary">Cambiar</Text>
          </Button>
          <Button rounded={7} px={6} height={10} colorScheme="rose">
            <Text className="text-white ">Quitar</Text>
          </Button>
        </HStack>
      </HStack>

      <HStack>
        <View className="bg-accent w-1 h-8 rounded-full my-3 " />
        <Text className="text-[#464444] p-3 font-bold text-lg">
          Datos personales
        </Text>
      </HStack>
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
          mt={4}
          py={4}
        >
          Actualizar datos
        </Button>
      </VStack>
    </VStack>
  );
}
