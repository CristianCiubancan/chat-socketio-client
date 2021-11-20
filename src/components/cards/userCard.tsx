import {
  AspectRatio,
  Box,
  Button,
  Flex,
  Heading,
  Image,
} from "@chakra-ui/react";
import React from "react";
import { ChatIcon } from "@chakra-ui/icons";
import { useRouter } from "next/dist/client/router";
import { useAppSelector } from "../../redux/hooks";
import CreateChatOperation from "../../operations/chat/createChat";

export interface UserData {
  id: number;
  username: string;
  profilePicUrl: string;
  createdAt: string;
}

interface UserCardProps {
  user: UserData;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const router = useRouter();
  const { id: userId } = useAppSelector((state) => state.user.value);
  return (
    <Flex flex={1} key={user.id} mt={8} p={5} shadow="md" borderWidth="1px">
      <Box flex={1} overflow="hidden">
        <Flex>
          <Box boxSize="2.5em" mr={2}>
            <AspectRatio ratio={1}>
              <Image
                borderRadius="full"
                backgroundColor="blackAlpha.600"
                src={user.profilePicUrl}
              />
            </AspectRatio>
          </Box>
          <Heading fontSize="large" mt={2} color="pink.300" display="inline">
            {user.username.length > 20
              ? ` ${user.username.slice(0, 20)}...`
              : ` ${user.username}`}
          </Heading>
        </Flex>
      </Box>

      <Button
        colorScheme="teal"
        ml="auto"
        onClick={async () => {
          //go to login page
          if (!userId || userId === 0) {
            router?.push(`/register`);
          } else {
            const data = await CreateChatOperation({
              initiatorId: userId,
              otherMemberId: user.id,
            });
            if (data.id) {
              router?.push(`/chat/${data.id}`);
            }
          }
        }}>
        <ChatIcon />
      </Button>
    </Flex>
  );
};

export default UserCard;
