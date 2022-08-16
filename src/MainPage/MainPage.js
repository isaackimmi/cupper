import {
  VStack,
  Flex,
  Heading,
  Wrap,
  WrapItem,
  Image,
} from "@chakra-ui/react";

import SearchBar from "../components/SearchBar/SearchBar";
import MainCard from "../components/MainCard/MainCard";
import NavBar from "../components/NavBar/NavBar";
import sloth from "../images/sloth.svg";

import "./MainPage.css";

const MainPage = ({
  user,
  cafes,
  onCafeChange,
}) => {
  return (
    <VStack spacing={10} w={"100%"} pb={20}>
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
            <SearchBar onCafeChange={(cafes) => onCafeChange([...cafes])} />
          </Flex>
          <Wrap px={40} w={"100%"} pt={20} justify={"center"} spacing={10}>
            {cafes.map((element) => (
              <WrapItem>
                <MainCard
                  vicinity={element.address_object.vicinity}
                  rating={element.rating}
                  price_level={element.price_level}
                  distance={element.distance}
                  numberOfPeople={element.numberOfPeople}
                  name={element.name}
                  place_id={element.place_id}
                  user={user}
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
