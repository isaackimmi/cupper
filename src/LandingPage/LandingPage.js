import { Box, VStack, Flex, Text } from "@chakra-ui/react";
import SearchBar from "../components/SearchBar/SearchBar";
import NavBar from "../components/NavBar/NavBar";
import LandingCard from "../components/LandingCard/LandingCard";

const LandingPage = () => {
  return (
    <VStack spacing={60}>
      <NavBar />
      <Flex w={"75%"}>
        <SearchBar />
      </Flex>
      <LandingCard />
    </VStack>
  );
};

export default LandingPage;
