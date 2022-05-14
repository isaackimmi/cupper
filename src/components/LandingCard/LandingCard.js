import { Flex, HStack, Box, Heading, Spacer, Text } from "@chakra-ui/react";
import { CalendarIcon, Search2Icon, SettingsIcon } from "@chakra-ui/icons";

const LandingCard = () => {
  return (
    <Flex
      sx={{
        width: "200px",
        height: "200px",
        borderColor: "#97D2FB",
        borderWidth: 10,
        borderRadius: "100%",
      }}
      alignItems={"center"}
      justifyContent={"center"}
      position={"relative"}
    >
      <Flex
        sx={{
          backgroundColor: "rgba(223, 41, 53, 1)",
          width: "60px",
          height: "60px",
          position: "absolute",
          top: "-20px",
          left: "-20px",
          borderRadius: "62% 38% 24% 76% / 43% 71% 29% 57%",
        }}
        justifyContent={"center"}
        alignItems={"center"}
      >
        5.0
      </Flex>
    </Flex>
  );
};

export default LandingCard;
