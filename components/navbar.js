import React from "react";
import { Center, IconButton, HStack, Icon } from "native-base";
import {
  Entypo,
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome5,
} from "@expo/vector-icons";
export default function NavBar() {
  return (
    <Center>
      <HStack space={4} alignItems="center">
        <IconButton
          colorScheme="teal"
          className="rounded-full"
          icon={<Icon as={Entypo} size={30} name="home" />}
        />
        <IconButton
          colorScheme="teal"
          className="rounded-full"
          icon={
            <Icon
              as={MaterialCommunityIcons}
              size={30}
              name="google-analytics"
            />
          }
        />
        <IconButton
          colorScheme="teal"
          className="rounded-full "
          icon={<Icon as={AntDesign} size={50} name="pluscircle" />}
        />
        <IconButton
          colorScheme="teal"
          className="rounded-full"
          icon={<Icon as={Entypo} size={30} name="wallet" />}
        />
        <IconButton
          colorScheme="teal"
          className="rounded-full"
          icon={<Icon as={FontAwesome5} size={30} name="user-alt" />}
        />
      </HStack>
    </Center>
  );
}
