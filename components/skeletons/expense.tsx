import React from "react";
import { Center, HStack, Skeleton } from "native-base";

export function ExpenseSkeleton() {
  return (
    <Center w="100%">
      <HStack
        alignItems="center"
        justifyContent="space-between"
        w="100%"
        maxW="400"
      >
        <HStack alignItems="center" width={120}>
          <Skeleton size="16" rounded="full" />
          <Skeleton.Text lines={2} alignItems="flex-start" px={3} />
        </HStack>
        <Skeleton size="6" rounded="full" width="1/3" />
      </HStack>
    </Center>
  );
}
