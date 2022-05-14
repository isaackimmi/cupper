import {
  Box,
  Image,
  Badge,
  Text,
  Stack,
  Icon,
  Button,
  Flex,
  useColorMode,
} from "@chakra-ui/react";

import { StarIcon } from "@chakra-ui/icons";

import { faDollarSign, faExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import coffee from "../../images/cupocoffee.svg";

import "./MainCard.css";

const MainCard = ({
  vicinity,
  rating,
  price_level,
  distance,
  numberOfPeople,
  name,
  width,
}) => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "gray.200", dark: "gray.700" };
  const textColor = { light: "gray.500", dark: "gray.100" };
  let length = price_level;
  let priceArray = [];

  for (let index = 0; index < length; index++) {
    priceArray.push(price_level);
  }

  return (
    <Box
      position={"relative"}
      w={width || "400px"}
      rounded="20px"
      boxShadow="sm"
      sx={{
        background: "rgba(255, 255, 255, 0.2)",
        borderRadius: "100px",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdroFilter: "blur(50px)",
        border: "1px solid rgba(255, 255, 255, 0.53)",
        zIndex: 5,
      }}
      className={"main-card"}
    >
      <Flex
        sx={{
          backgroundColor: "rgba(151, 210, 251, 1)",
          width: "65px",
          height: "65px",
          position: "absolute",
          top: "-10px",
          left: "-10px",
          borderRadius: "45% 55% 22% 78% / 59% 81% 19% 41% ",
          zIndex: 10,
        }}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Text fontSize={18} fontWeight={600}>
          5
        </Text>
      </Flex>
      <Flex
        alignItems={"center"}
        justifyContent={"center"}
        className={"floating"}
      >
        <Image w={60} h={60} src={coffee} alt="Course Cover" />
      </Flex>
      <Box px={10} py={8}>
        <Stack isInline align="baseline">
          <Badge
            variant="solid"
            variantColor="teal"
            rounded="full"
            py={0.5}
            px={2}
          >
            <Box as="span">
              {priceArray.map((element) =>
                element ? (
                  <FontAwesomeIcon
                    key={element}
                    icon={faDollarSign}
                    color={element < price_level ? "teal.500" : "gray.300"}
                  />
                ) : (
                  <FontAwesomeIcon
                    key={element}
                    icon={faExclamation}
                    color={"gray.300"}
                  />
                )
              )}
            </Box>
          </Badge>
          <Badge
            variant="solid"
            variantColor="teal"
            rounded="full"
            py={0.5}
            px={2}
          >
            Cafe
          </Badge>
          <Text
            textTransform="uppercase"
            fontSize="sm"
            color="gray.500"
            letterSpacing="wide"
          >
            {Math.round(distance * 100) / 100} Mi &bull;
          </Text>
        </Stack>
        <Text as="h2" fontWeight="semibold" fontSize="xl" my={2}>
          {name}
        </Text>
        <Text isTruncated fontWeight="light" fontSize="md">
          {vicinity}
        </Text>
        <Stack isInline justify="space-between" color={textColor[colorMode]}>
          <Box d="flex">
            <Box as="span">
              {Array(5)
                .fill("")
                .map((_, i) => (
                  <StarIcon
                    name="star"
                    overflow={"hidden"}
                    color={i < Math.floor(rating) ? "teal.500" : "gray.300"}
                    key={i}
                  />
                ))}
            </Box>
          </Box>
        </Stack>
        <Box textAlign="center">
          <Button
            color={"#080708"}
            backgroundColor={"#E1EFF6"}
            size="lg"
            mt={3}
            boxShadow="md"
          >
            Check In
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default MainCard;
