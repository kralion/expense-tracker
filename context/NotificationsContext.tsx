import React, { createContext, useState } from "react";
import { Alert, VStack, HStack, Text } from "native-base";

interface TNotification {
  title: string;
  alertStatus: string;
}

interface INotificationContext {
  showNotification: (notification: TNotification) => void;
  notification: TNotification;
}

export const NotificationsContext = createContext<INotificationContext>({
  showNotification: () => {},
  notification: {
    title: "",
    alertStatus: "",
  },
});

export const NotificationsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [notification, setNotification] = useState<TNotification>({
    title: "",
    alertStatus: "",
  });

  const showNotification = (notification: TNotification) => {
    setNotification(notification);
    setTimeout(() => {
      setNotification({
        title: "",
        alertStatus: "",
      });
    }, 3000);
  };

  return (
    <NotificationsContext.Provider value={{ showNotification, notification }}>
      {notification.title && (
        <Alert
          variant="top-accent"
          position="absolute"
          top={16}
          left={0}
          right={0}
          zIndex={1}
          status={notification.alertStatus}
          w="100%"
        >
          <VStack space={2} flexShrink={1} w="100%">
            <HStack flexShrink={1} space={2} justifyContent="space-between">
              <HStack space={2} flexShrink={1}>
                <Alert.Icon mt="1" />
                <Text fontSize="md" color="coolGray.800">
                  {notification.title}
                </Text>
              </HStack>
            </HStack>
          </VStack>
        </Alert>
      )}
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotificationsContext = () => {
  const context = React.useContext(NotificationsContext);
  if (!context) {
    throw new Error(
      "useNotificationsContext must be used within a NotificationsContextProvider"
    );
  }
  return context;
};
