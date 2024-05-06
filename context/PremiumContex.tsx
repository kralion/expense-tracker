import { supabase } from "@/utils/supabase";
import { router } from "expo-router";
import React, { createContext, useState } from "react";
import { Alert, HStack, useToast } from "native-base";
import { Text } from "react-native";

interface PremiumContextProps {
  isPremium: boolean;
  setIsPremium: React.Dispatch<React.SetStateAction<boolean>>;
  getPremiumUserStatusById?: (id: string) => void;
}

export const PremiumContext = createContext<PremiumContextProps>({
  isPremium: false,
  setIsPremium: () => {},
  getPremiumUserStatusById: () => {},
});

export function PremiumProvider({ children }: { children: React.ReactNode }) {
  const [isPremium, setIsPremium] = useState(false);
  const toast = useToast();

  async function getPremiumUserStatusById(id: string) {
    try {
      const newRol = isPremium ? "premium" : "free";
      const { error } = await supabase
        .from("usuarios")
        .update({ rol: newRol })
        .eq("id", id);
      if (error) {
        toast.show({
          render: () => (
            <Alert variant="solid" rounded={10} px={5} status="error">
              <HStack space={2} alignItems="center">
                <Alert.Icon mt="1" />
                <Text className="text-white">
                  Error al actualizar el rol del usuario
                </Text>
              </HStack>
            </Alert>
          ),
          description: "",
          duration: 2000,
          placement: "top",
          variant: "solid",
        });
      } else {
        toast.show({
          render: () => (
            <Alert variant="solid" rounded={10} px={5} status="success">
              <HStack space={2} alignItems="center">
                <Alert.Icon mt="1" />
                <Text className="text-white">
                  Ahora eres un usuario premium
                </Text>
              </HStack>
            </Alert>
          ),
          description: "",
          duration: 2000,
          placement: "top",
          variant: "solid",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      router.push("/(tabs)/");
    }
  }
  const value = {
    isPremium,
    setIsPremium,
    getPremiumUserStatusById,
  };

  return (
    <PremiumContext.Provider value={value}>{children}</PremiumContext.Provider>
  );
}

export function usePremiumStatusContext() {
  const context = React.useContext(PremiumContext);
  if (context === undefined) {
    throw new Error("usePremiumProvider must be used within a PremiumProvider");
  }
  return context;
}
