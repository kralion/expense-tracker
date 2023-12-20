import { supabase } from "@/utils/supabase";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { Button, HStack } from "native-base";
import React from "react";
import { Pressable, Text } from "react-native";
import { Image } from "expo-image";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { set } from "date-fns";


const GoogleSignInButton = () => {
  // const [accessToken, setAccessToken] = React.useState<string | undefined>();
  // const [request, response, promptAsync] = Google.useAuthRequest({
  //   expoClientId:
  //     "422618280931-ilphj6o0mr8th7dvf37iq09kk1b7bjia.apps.googleusercontent.com",
  //   iosClientId:
  //     "422618280931-fc0s3ktar0vcgoc80n128589e5ahhk1e.apps.googleusercontent.com",
  //   androidClientId:
  //     "422618280931-50inl7uig7t4p5k6o89521jejcic2llj.apps.googleusercontent.com",
  //   scopes: ["profile", "email"],
  // });

  

  GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'], 
    webClientId: '<FROM DEVELOPER CONSOLE>'
  });
  WebBrowser.maybeCompleteAuthSession();

  const signInWithGoogleAsync = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log( JSON.stringify(userInfo, null, 2));
    } catch (error:any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  return (
    <Button
      variant="outline"
      colorScheme="gray"
      className="rounded-full  "
      height={12}
      onPress={signInWithGoogleAsync}
    >
      <Pressable>
        <HStack alignItems="center" space={2}>
          <Image
            style={{ width: 24, height: 24 }}
            source={{
              uri: "https://img.icons8.com/?size=96&id=17949&format=png",
            }}
          />
          <Text className="  font-semibold">Iniciar Sesión con Google</Text>
        </HStack>
      </Pressable>
    </Button>
  );
};

export default GoogleSignInButton;