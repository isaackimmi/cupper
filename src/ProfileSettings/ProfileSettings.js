import { Box, VStack, Flex } from "@chakra-ui/react";
import NavBar from "../components/NavBar/NavBar";

const ProfileSettings = () => {
  return (
    <VStack spacing={80}>
      <NavBar />
      <Flex>profile settings</Flex>
    </VStack>
  );
};

export default ProfileSettings;
