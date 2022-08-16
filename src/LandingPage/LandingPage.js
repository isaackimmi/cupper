import {
  VStack,
  Flex,
  Text,
  HStack,
  Wrap,
  WrapItem,
  Heading,
} from "@chakra-ui/react";
import { SunIcon } from "@chakra-ui/icons";
import { ClimbingBoxLadder } from "react-spinners";
import SearchBar from "../components/SearchBar/SearchBar";
import NavBar from "../components/NavBar/NavBar";
import MainCard from "../components/MainCard/MainCard";

import "./LandingPage.css";

import axios from "axios";
import { useEffect, useState } from "react";

const LandingPage = ({ onCafeChange }) => {
  const [topCafes, setTopCafes] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/top`)
      .then(res => setTopCafes(res.data))
  }, []);

  return (
    <VStack spacing={50} pb={20}>
      <NavBar />
      <Flex pt={40} w={"75%"} className={"floating-search"}>
        <SearchBar onCafeChange={(cafes) => onCafeChange([...cafes])} />
        {/* <SearchBar /> */}
      </Flex>
      <VStack pt={40} w={"100%"} spacing={2}>
        <HStack
          pl={60}
          spacing={3}
          w={"100%"}
          align={"flex-start"}
          alignItems="center"
        >
          <Text fontWeight={700} fontSize={30}>
            Hot Places{" "}
          </Text>
          <SunIcon boxSize={8} />
        </HStack>

        {topCafes === null ? (
          <VStack alignItems={"center"} justifyContent={"center"}>
            <ClimbingBoxLadder color={"#80FFE8"} size={50} />
            <Heading pl={20} pt={35}>
              Loading...
            </Heading>
          </VStack>
        ) : (
          <Wrap px={40} w={"100%"} pt={20} justify={"center"} spacing={10}>
            {topCafes.map((element) => (
              <WrapItem key={element.id}>
                <MainCard
                  width={"300px"}
                  vicinity={element.address_object.vicinity}
                  rating={element.rating}
                  price_level={element.price_level}
                  distance={element.distance}
                  numberOfPeople={element.numberOfPeople}
                  name={element.name}
                />
              </WrapItem>
            ))}
          </Wrap>
        )}
      </VStack>
    </VStack>
  );
};

export default LandingPage;
