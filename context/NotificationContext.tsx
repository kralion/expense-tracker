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

export const NotificationContext = createContext<INotificationContext>({
  showNotification: () => {},
  notification: {
    title: "",
    alertStatus: "",
  },
});

export const NotificationContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [notification, setNotification] = useState<TNotification>({
    title: "",
    alertStatus: "",
  });

  const showNotification = (newNotification: TNotification) => {
    setNotification(newNotification);
  };

  return (
    <NotificationContext.Provider value={{ showNotification, notification }}>
      {notification.title && (
        <Alert
          variant="subtle"
          shadow="3"
          rounded={10}
          position="absolute"
          top={10}
          left={2}
          right={2}
          px={3}
          zIndex={1}
          status={notification.alertStatus}
          w="95%"
        >
          <HStack space={2}>
            <Alert.Icon mt="1" />
            <Text fontSize="md">{notification.title}</Text>
          </HStack>
        </Alert>
      )}
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => {
  const context = React.useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotificationContext must be used within a NotificationsContextProvider"
    );
  }
  return context;
};
