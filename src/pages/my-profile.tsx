import { AspectRatio, Box, Button, Flex, Heading } from "@chakra-ui/react";
import React, { useCallback } from "react";
import { Image } from "@chakra-ui/react";
import Layout from "../components/Layout";
import { MdPhotoCamera } from "react-icons/md";
import { Icon } from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import ChangeProfilePicOperation from "../operations/user/changeProfilePic";
import { setUserProfilePic } from "../redux/features/user/userSlice";

const MyProfile = () => {
  const user = useAppSelector((state) => state.user.value);
  const dispatch = useAppDispatch();
  const onDrop = useCallback(async ([file]) => {
    const formData = new FormData();
    formData.append("name", file.name);
    formData.append("file", file);
    const newProfilePicUrl = await ChangeProfilePicOperation(formData);
    dispatch(setUserProfilePic(newProfilePicUrl.profilePicUrl));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png",
    multiple: false,
  });

  return (
    <Layout>
      {user.id ? (
        <Box maxW="50%">
          <Flex
            alignItems="center"
            flexDirection="column"
            my={10}
            p={2}
            maxW="sm"
            borderWidth="1px"
            boxShadow="lg"
            overflow="hidden">
            <Box w="50%" my={2}>
              <Box role="group" maxW="sm" position="relative">
                <Box>
                  <AspectRatio ratio={1}>
                    <Image
                      src={user.profilePicUrl}
                      borderRadius="full"
                      alt=""
                      backgroundColor="blackAlpha.600"
                    />
                  </AspectRatio>
                </Box>
                <Box
                  position="absolute"
                  top="0"
                  left="0"
                  borderRadius="full"
                  h="100%"
                  w="100%"
                  display="none"
                  backgroundColor="blackAlpha.400"
                  _groupHover={{ display: "block" }}>
                  <Flex
                    h="100%"
                    justifyContent="center"
                    alignItems="center"
                    borderRadius="full"
                    {...getRootProps()}>
                    <Button
                      borderRadius="full"
                      h="100%"
                      w="100%"
                      colorScheme="blackAlpha">
                      <input name="imageUrl" {...getInputProps()} />
                      <Icon boxSize="3em" as={MdPhotoCamera} />
                    </Button>
                  </Flex>
                </Box>
              </Box>
            </Box>
            <Heading mb={2}>{user.username}</Heading>
          </Flex>
        </Box>
      ) : (
        <Flex justifyContent="center">
          <Heading size="md" my={4} fontWeight="light">
            You're not logged in.
          </Heading>
        </Flex>
      )}
    </Layout>
  );
};

export default MyProfile;
