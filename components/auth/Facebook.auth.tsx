import { View, Text } from "react-native";
import React from "react";
import { supabase } from "@/utils/supabase";
import { Button, HStack, VStack } from "native-base";
import { Image } from "expo-image";
import * as Facebook from "expo-auth-session/providers/facebook";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

const FacebookSignInButton = () => {
  const [userInfo, setUserInfo] = React.useState<any>(null);
  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: "322543644083538",
  });

  React.useEffect(() => {
    if (response && response.type === "success" && response.authentication) {
      async () => {
        const userInfoResponse = await fetch(
          `https://graph.facebook.com/me?access_token=${response.authentication?.accessToken}&fields=id,name,email,picture.type(large)`
        );
        const userInfo = await userInfoResponse.json();
        setUserInfo(userInfo);
      };
    }
    console.log(userInfo);
  }, [response]);

  async function signInWithFacebook() {
    const result = await promptAsync();
    if (result?.type !== "success") {
      console.log("Uh oh, something went wrong");
      return;
    }
  }

  return (
    <VStack>
      {userInfo ? (
        <Text>{userInfo.name}</Text>
      ) : (
        <Button
          height={12}
          onPress={signInWithFacebook}
          variant="outline"
          colorScheme="gray"
          className="rounded-full  "
        >
          <HStack alignItems="center" space={2}>
            <Image
              style={{ width: 24, height: 24 }}
              source={{
                uri: "https://img.icons8.com/?size=96&id=uLWV5A9vXIPu&format=png",
              }}
            />
            <Text className="  font-semibold">Iniciar Sesión con Facebook</Text>
          </HStack>
        </Button>
      )}
    </VStack>
  );
};

export default FacebookSignInButton;
