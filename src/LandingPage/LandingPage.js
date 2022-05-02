import { Box, VStack, Flex, Text } from "@chakra-ui/react";
import SearchBar from "../components/SearchBar/SearchBar";
import NavBar from "../components/NavBar/NavBar";

const LandingPage = () => {
  return (
    <VStack spacing={80}>
      <NavBar />
      <Flex w={"75%"}>
        <SearchBar />
      </Flex>
    </VStack>
  );
};

export default LandingPage;
