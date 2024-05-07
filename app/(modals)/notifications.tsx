import SingleNotification from "@/components/popups/notification";
import useAuth from "@/context/AuthContext";
import { INotification } from "@/interfaces/notification";
import { supabase } from "@/utils/supabase";
import { Alert, FlatList, HStack, useToast } from "native-base";
import * as React from "react";
import { Text } from "react-native";

export default function Notifications() {
  const [notifications, setNotifications] = React.useState<INotification[]>([]);
  const { userData } = useAuth();
  const toast = useToast();

  const getNotifications = async () => {
    const { data, error } = await supabase
      .from("notificaciones")
      .select("*")
      .eq("usuario_id", userData?.id);

    if (error) {
      toast.show({
        render: () => (
          <Alert variant="solid" rounded={10} px={5} status="error">
            <HStack space={2} alignItems="center">
              <Alert.Icon mt="1" />
              <Text className="text-white">
                Error al recuperar las notificaciones
              </Text>
            </HStack>
          </Alert>
        ),
        description: "",
        duration: 2000,
        placement: "top",
        variant: "solid",
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
      renderItem={({ item }) => <SingleNotification notification={item} />}
      keyExtractor={(item) => item.id}
    />
  );
}
