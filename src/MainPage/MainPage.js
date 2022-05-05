import { Box, VStack, Flex, Text } from "@chakra-ui/react";
import NavBar from "../components/NavBar/NavBar";

const MainPage = () => {
  return (
    <VStack spacing={80}>
      <NavBar />
      <Flex>main page</Flex>
    </VStack>
  );
};

export default MainPage;
