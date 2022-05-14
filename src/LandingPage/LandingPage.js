import {
  Box,
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

const LandingPage = () => {
  const [topCafes, setTopCafes] = useState([]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        const res = await axios.post(`http://localhost:3001/api/top`);
        setTopCafes(res.data);
      } catch (error) {
        console.log(error);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [topCafes]);

  return (
    <VStack spacing={50} pb={20}>
      <NavBar />
      <Flex pt={40} w={"75%"} className={"floating-search"}>
        <SearchBar />
      </Flex>
      <VStack pt={40} w={"100%"} spacing={2}>
        <HStack
          pl={60}
          spacing={3}
          w={"100%"}
          align={"flex-start"}
          alignItems="center"
        >
          <Text fontWeight={600} fontSize={30}>
            Hot Places{" "}
          </Text>
          <SunIcon boxSize={5} />
        </HStack>

        {topCafes === [] ? (
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
                  address_object={element.address_object}
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
