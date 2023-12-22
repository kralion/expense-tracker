import SingleNotification from "@/components/popups/notification";
import { useNotificationContext } from "@/context";
import useAuth from "@/context/AuthContext";
import { INotification } from "@/interfaces/notification";
import { supabase } from "@/utils/supabase";
import { FlatList, VStack, View } from "native-base";
import * as React from "react";
import { ScrollView, Text } from "react-native";

export default function Notifications() {
  const { showNotification } = useNotificationContext();
  const [notifications, setNotifications] = React.useState<INotification[]>([]);
  const { session } = useAuth();

  const getNotifications = async () => {
    const { data, error } = await supabase
      .from("notificaciones")
      .select("*")
      .eq("session_id", session?.user.id);

    if (error) {
      showNotification({
        title: "Error al obtener las notificaciones",
        alertStatus: "error",
      });
      return;
    }
    setNotifications(data);
  };

  React.useEffect(() => {
    getNotifications();
  }, [notifications]);

  return (
    <FlatList
      data={notifications}
      renderItem={({ item }) => (
        <VStack space={3}>
          <SingleNotification notification={item} />
        </VStack>
      )}
      keyExtractor={(item) => item.id}
    />
  );
}
