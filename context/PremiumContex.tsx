import { supabase } from "@/utils/supabase";
import { router } from "expo-router";
import React, { createContext, useState } from "react";
import { useNotificationContext } from "./NotificationContext";

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
  const { showNotification } = useNotificationContext();

  async function getPremiumUserStatusById(id: string) {
    try {
      const newRol = isPremium ? "premium" : "free";
      const { error } = await supabase
        .from("usuarios")
        .update({ rol: newRol })
        .eq("id", id);
      if (error) {
        showNotification({
          title: "Error al actualizar el rol",
          alertStatus: "error",
        });
      } else {
        showNotification({
          title: "Plan premium activado",
          alertStatus: "success",
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
