import { Box, VStack, Flex, Text, HStack } from "@chakra-ui/react";
import SearchBar from "../components/SearchBar/SearchBar";
import NavBar from "../components/NavBar/NavBar";
import LandingCard from "../components/LandingCard/LandingCard";
import { SunIcon } from "@chakra-ui/icons";

import "./LandingPage.css";

import axios from "axios";

const URL = "http://localhost:3001";

const LandingPage = () => {
  return (
    <VStack spacing={50}>
      <NavBar />
      <Flex pt={40} w={"75%"} className={"floating-search"}>
        <SearchBar />
      </Flex>
      <VStack pt={40} w={"75%"} spacing={12}>
        <HStack spacing={3} w={"100%"} align={"flex-start"} alignItems="center">
          <Text fontWeight={600} fontSize={20}>
            Hot Places{" "}
          </Text>
          <SunIcon boxSize={5} />
        </HStack>

        <HStack w={"100%"} align={"flex-start"} alignItems="center">
          <LandingCard />
        </HStack>
      </VStack>
    </VStack>
  );
};

export default LandingPage;
