import { ChevronLeftIcon } from "@chakra-ui/icons";
import { AspectRatio, Box, Button, Flex, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { WindowSizeState } from "../../utils/getScreenSize";

interface ChatInfoProps {
  windowSize: WindowSizeState;
}

const ChatInfo: React.FC<ChatInfoProps> = ({ windowSize }) => {
  const [profilePic, setProfilePic] = useState<String | null>(null);
  const [chatName, setChatName] = useState<String | null>(null);
  const router = useRouter();

  const {
    chat: { value: chatData },
    user: { value: currentUser },
  } = useAppSelector((state) => state);

  useEffect(() => {
    chatData.members.map((member) => {
      if (member.id !== currentUser.id) {
        setChatName(member.username);
        setProfilePic(member.profilePicUrl);
      }
    });

    return () => {
      setChatName(null);
      setProfilePic(null);
    };
  }, [chatData]);

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      height="88px"
      width="100%"
      backgroundColor="teal"
      color="white"
      borderBottomWidth="1px"
      position="relative">
      <Box
        fontSize={
          windowSize.width > 900
            ? "3rem"
            : windowSize.width < 600
            ? "1.5rem"
            : "2rem"
        }>
        {chatName?.length! > 15 ? `${chatName?.substring(0, 15)}...` : chatName}
      </Box>
      <Box position="absolute" boxSize="3em" right="0" mr={5}>
        <AspectRatio ratio={1}>
          <Image
            borderRadius="full"
            backgroundColor="blackAlpha.600"
            src={profilePic as any}
          />
        </AspectRatio>
      </Box>
      {windowSize.width > 600 ? null : (
        <Button
          position="absolute"
          boxSize="3em"
          left="0"
          ml={5}
          colorScheme="teal"
          onClick={() => {
            //go to login page
            router?.push(`/chat`);
          }}>
          <ChevronLeftIcon fontSize="2em" />
        </Button>
      )}
    </Flex>
  );
};
export default ChatInfo;
