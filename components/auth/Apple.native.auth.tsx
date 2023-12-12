import { supabase } from "@/utils/supabase";
import * as AppleAuthentication from "expo-apple-authentication";
import { router } from "expo-router";
import { Button, HStack, Text } from "native-base";
import { Alert, Image, Platform, Pressable } from "react-native";

export function AppleAuthButton() {
  const onAppleButtonPress = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      // Sign in via Supabase Auth.
      if (credential.identityToken) {
        const {
          error,
          data: { user },
        } = await supabase.auth.signInWithIdToken({
          provider: "apple",
          token: credential.identityToken,
        });
        console.log(JSON.stringify({ error, user }, null, 2));
        if (!error) {
          router.push("/(tabs)/");
        }
      } else {
        throw new Error("No identityToken.");
      }
    } catch (e) {
      if (e.code === "ERR_REQUEST_CANCELED") {
        Alert.alert("Debes registrar con Apple para continuar");
      } else {
        Alert.alert("Error al registrar usuario");
      }
    }
  };

  if (Platform.OS === "ios")
    return (
      <Button
        height={12}
        variant="outline"
        colorScheme="gray"
        className="rounded-full  "
      >
        <Pressable
          onPress={async () =>
            (await AppleAuthentication.isAvailableAsync()) &&
            onAppleButtonPress()
          }
        >
          <HStack alignItems="center" space={2}>
            <Image
              className="w-5 h-5"
              source={{
                uri: "https://img.icons8.com/?size=60&id=95294&format=png",
              }}
            />
            <Text className="  font-semibold">Iniciar Sesión con Apple</Text>
          </HStack>
        </Pressable>
      </Button>
    );
  return <>{/* Implement Android Auth options. */}</>;
}
