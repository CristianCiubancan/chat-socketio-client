import { AspectRatio, Box, Flex, Heading, Image } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { useRouter } from "next/dist/client/router";
import { UserData } from "./userCard";
import hasUserReadTheChat from "../../utils/hasUserReadTheChat";
import getChatWithName from "../../utils/getChatWithName";
import { WindowSizeState } from "../../utils/getScreenSize";
import getMessageDate from "../../utils/getMessageDate";
import { useAppSelector } from "../../redux/hooks";

export interface ChatData {
  id: number;
  lastMessage: {
    senderId: number;
    text: string;
    chatId: number;
    createdAt: string;
    readers: { id: number }[];
  };
  members: UserData[];
}

interface ChatCardProps {
  chat: ChatData;
  singleItemOnPage?: boolean;
  windowSize: WindowSizeState;
}

const ChatCard: React.FC<ChatCardProps> = ({
  chat,
  singleItemOnPage,
  windowSize,
}) => {
  const router = useRouter();

  const userId = useAppSelector((state) => state.user.value).id;
  return (
    <NextLink key={chat.id} href={`/chat/${chat.id}`}>
      <Box key={chat.id}>
        <Flex
          flex={1}
          borderColor={
            !hasUserReadTheChat(chat, userId) &&
            chat.id !== parseInt(router.query.id as string)
              ? "facebook.500"
              : "gray.200"
          }
          backgroundColor={
            !hasUserReadTheChat(chat, userId) &&
            chat.id !== parseInt(router.query.id as string)
              ? "facebook.50"
              : "gray.200"
          }
          key={chat.id}
          px={3}
          py={5}
          borderWidth="1px"
          alignItems="center"
          justifyContent={windowSize.width > 800 ? "flex-start" : "center"}
          width={"100%"}
          cursor="pointer">
          <Box boxSize="3em">
            <AspectRatio ratio={1}>
              <Image
                borderRadius="full"
                backgroundColor="blackAlpha.600"
                src={getChatWithName(chat, userId!).profilePic}
              />
            </AspectRatio>
          </Box>
          {windowSize.width > 800 || singleItemOnPage ? (
            <Flex flex={1} ml={2} flexDirection="column">
              <Flex>
                <Box flex={1}>
                  <Heading fontSize="medium" color="pink.300" display="inline">
                    {getChatWithName(chat, userId!).name.length > 15
                      ? ` ${getChatWithName(chat, userId!).name.substring(
                          0,
                          15
                        )}...`
                      : ` ${getChatWithName(chat, userId!).name}`}
                  </Heading>
                </Box>
              </Flex>
              <Flex>
                {chat.lastMessage.senderId === userId ? (
                  <Flex width={"100%"} alignItems="center">
                    <Box wordBreak="keep-all" fontWeight="100">
                      You:
                    </Box>

                    <Box
                      overflow="hidden"
                      textOverflow="ellipsis"
                      width={
                        singleItemOnPage && windowSize.width < 800
                          ? windowSize.width - 220
                          : "110px"
                      }
                      minW={
                        singleItemOnPage && windowSize.width < 800
                          ? "150px"
                          : "0px"
                      }
                      whiteSpace="nowrap"
                      mx={1}>
                      {chat.lastMessage?.text}
                    </Box>

                    <Box ml="auto" wordBreak="keep-all" fontWeight="100">
                      {getMessageDate(chat.lastMessage?.createdAt)}
                    </Box>
                  </Flex>
                ) : (
                  <Flex height={"1.5em"} width={"100%"} alignItems="center">
                    <Box
                      overflow="hidden"
                      textOverflow="ellipsis"
                      width={
                        singleItemOnPage && windowSize.width < 800
                          ? windowSize.width - 180
                          : "137px"
                      }
                      minW={
                        singleItemOnPage && windowSize.width < 800
                          ? "150px"
                          : "0px"
                      }
                      whiteSpace="nowrap"
                      mx={1}>
                      {chat.lastMessage?.text}
                    </Box>

                    <Box ml="auto" wordBreak="keep-all" fontWeight="100">
                      {getMessageDate(chat.lastMessage?.createdAt)}
                    </Box>
                  </Flex>
                )}
              </Flex>
            </Flex>
          ) : null}
        </Flex>
      </Box>
    </NextLink>
  );
};

export default ChatCard;
