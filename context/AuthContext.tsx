import React from "react";
import { supabase } from "@/utils/supabase";
import { Session } from "@supabase/supabase-js";
import { router } from "expo-router";
import { useNotificationContext } from "./NotificationContext";

interface AuthContextType {
  session: Session | null;
  userData: any | null;
  setUserData: React.Dispatch<React.SetStateAction<any>>;
}

type TUserData = {
  nombres: string;
  apellidos: string;
  email: string;
  rol: string;
  id: string;
};
export const AuthContext = React.createContext<AuthContextType | null>(null);
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = React.useState<Session | null>(null);
  const [userData, setUserData] = React.useState<TUserData>();
  const { showNotification } = useNotificationContext();

  React.useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        setSession(session);
      })
      .catch((error) => {
        console.error("Error al obtener sesión:", error);
      });

    supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      if (session) {
        await fetchUserData(session.user.id);
        console.log("Sesión activa:", session.user.id);
      } else {
        try {
          await router.push("/(auth)/sign-in");
        } catch (error) {
          console.error("Error redireccionando:", error);
        }
      }
    });
  }, []);
  async function fetchUserData(id: string) {
    try {
      const { data, error } = await supabase
        .from("usuarios")
        .select("*")
        .eq("session_id", id)
        .single();
      if (error) {
        throw error;
      }
      setUserData(data);
    } catch (error) {
      showNotification({
        title: "Error al obtener datos del usuario",
        alertStatus: "error",
      });
    }
  }

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
