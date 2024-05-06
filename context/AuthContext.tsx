import React from "react";
import { supabase } from "@/utils/supabase";
import { Session } from "@supabase/supabase-js";
import { router } from "expo-router";
import { Alert, HStack, useToast } from "native-base";
import { Text } from "react-native";

interface AuthContextType {
  session: Session | null;
  userData: any | null;
  setUserData: React.Dispatch<React.SetStateAction<any>>;
}

type TUserData = {
  nombres: string;
  apellidos: string;
  email: string;
  rol: "free";
  perfil: {
    uri: string;
  };
  id: string;
};
export const AuthContext = React.createContext<AuthContextType | null>(null);
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const toast = useToast();
  const [session, setSession] = React.useState<Session | null>(null);
  const [userData, setUserData] = React.useState<TUserData>();
  async function fetchUserData(id: string) {
    const { data } = await supabase
      .from("usuarios")
      .select("*")
      .eq("session_id", id)
      .single();
    setUserData(data);
  }
  React.useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        setSession(session);
      })
      .catch((error) => {
        toast.show({
          render: () => (
            <Alert variant="solid" rounded={10} px={5} status="error">
              <HStack space={2} alignItems="center">
                <Alert.Icon mt="1" />
                <Text className="text-white">
                  Error al obtener sesión de usuario
                </Text>
              </HStack>
            </Alert>
          ),
          description: "",
          duration: 2000,
          placement: "top",
          variant: "solid",
        });
      });

    supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      if (session) {
        await fetchUserData(session.user.id);
      } else {
        router.push("/(auth)/sign-in");
      }
    });
  }, []);

  const value = { session, userData, setUserData };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === null || context === undefined) {
    throw new Error("useAuth debe contenerse dentro de AuthProvider");
  }
  return context;
};

export default useAuth;
