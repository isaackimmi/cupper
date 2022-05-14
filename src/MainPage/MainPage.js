import {
  Box,
  VStack,
  Flex,
  Text,
  HStack,
  Heading,
  Stack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";

import ClimbingBoxLadder from "react-spinners/ClimbingBoxLoader";

import SearchBar from "../components/SearchBar/SearchBar";
import MainCard from "../components/MainCard/MainCard";
import NavBar from "../components/NavBar/NavBar";

import "./MainPage.css";

import { useEffect, useState } from "react";

const MainPage = () => {
  const [cafes, setCafes] = useState([]);

  useEffect(() => {
    setCafes(JSON.parse(localStorage.getItem("cafes")));
  }, []);

  return (
    <VStack spacing={10} w={"100%"}>
      <NavBar />

      {cafes === null ? (
        <VStack pt={60} alignItems={"center"} justifyContent={"center"}>
          <ClimbingBoxLadder color={"#80FFE8"} size={50} />
          <Heading pl={20} pt={35}>
            Loading...
          </Heading>
        </VStack>
      ) : (
        <>
          <Flex w={"75%"} className={"search-bar-transition"}>
            <SearchBar />
          </Flex>
          <Wrap px={40} w={"100%"} pt={20} justify={"center"} spacing={10}>
            {cafes.map((element) => (
              <WrapItem key={element.id}>
                <MainCard
                  address_object={element.address_object}
                  rating={element.rating}
                  price_level={element.price_level}
                  distance={element.distance}
                  numberOfPeople={element.distance}
                  name={element.name}
                />
              </WrapItem>
            ))}
          </Wrap>
        </>
      )}
    </VStack>
  );
};

export default MainPage;
