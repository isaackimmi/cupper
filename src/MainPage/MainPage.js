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
  Image,
} from "@chakra-ui/react";

import BarLoader from "react-spinners/BarLoader";

import SearchBar from "../components/SearchBar/SearchBar";
import MainCard from "../components/MainCard/MainCard";
import NavBar from "../components/NavBar/NavBar";

import "./MainPage.css";

import sloth from "../images/sloth.svg";

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
        <VStack
          pt={40}
          alignItems={"center"}
          justifyContent={"center"}
          spacing={20}
        >
          <Image w={60} h={60} src={sloth} alt="Course Cover" />
          <Heading className="heading-transition">
            You forgot to search for cafes!
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
                  key={element.id}
                  address_object={element.address_object.vicinity}
                  rating={element.rating}
                  price_level={element.price_level}
                  distance={element.distance}
                  numberOfPeople={element.numberOfPeople}
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
