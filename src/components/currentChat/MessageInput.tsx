import { Box, Flex, IconButton } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import InputField from "../InputField";
import SendMessageOperation from "../../operations/message/sendMessage";
import { MessageData } from "../cards/messageCard";
import { sendNewMessage } from "../../redux/features/chatMessages/chatMessagesSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { newMessageSentToChat } from "../../redux/features/userChats/userChatsSlice";
import { SocketContext } from "../../utils/SocketContext";
import { UserData } from "../cards/userCard";

interface MessageInputProps {}

const MessageInput: React.FC<MessageInputProps> = () => {
  const dispatch = useAppDispatch();
  const socket = useContext(SocketContext);

  const [otherUserId, setOtherUserId] = useState<number>();

  const {
    user: { value: currentUser },
    chat: { value: chat },
  } = useAppSelector((state) => state);

  useEffect(() => {
    chat.members.map((member: UserData) => {
      if (member.id !== currentUser.id) {
        setOtherUserId(member.id);
      }
    });
  }, [chat]);

  const handleSendMessage = (message: MessageData) => {
    socket?.emit("message", { message, to: otherUserId, chat });
  };

  return (
    <Formik
      initialValues={{ message: "" }}
      onSubmit={async (values, actions) => {
        if (values.message !== "") {
          const data = await SendMessageOperation(chat.id, values.message);
          actions.resetForm();
          dispatch(sendNewMessage(data));
          dispatch(newMessageSentToChat({ message: data, chat }));
          handleSendMessage(data);
        }
      }}>
      {({ isSubmitting }) =>
        false ? (
          <Box></Box>
        ) : (
          <Box w="100%">
            <Form>
              <Flex
                backgroundColor="teal"
                height="88px"
                justifyContent="space-around"
                alignItems="center"
                borderTopWidth="1px"
                width="100%"
                mt="auto"
                px={4}>
                <InputField
                  name="message"
                  placeholder="Send Message"
                  label="message"
                  type="text"
                  chatField={true}
                />

                <IconButton
                  // disabled={loading}
                  type="submit"
                  ml={4}
                  colorScheme="teal"
                  aria-label="send message"
                  icon={<ChevronRightIcon />}
                />
              </Flex>
            </Form>
          </Box>
        )
      }
    </Formik>
  );
};
export default MessageInput;
