import { Flex, HStack, Box, Heading, Spacer } from "@chakra-ui/react";
import { CalendarIcon, Search2Icon, SettingsIcon } from "@chakra-ui/icons";

const NavBar = () => {
  return (
    <Flex
      alignItems={"center"}
      justifyContent={"space-between"}
      w={"100%"}
      py={8}
      px={3}
    >
      <Heading color={"primary"} px={8}>
        Cupper.
      </Heading>
      <Spacer />
      <HStack
        spacing={20}
        pr={8}
        alignContent={"flex-start"}
        justifyContent={"space-between"}
      >
        <HStack spacing={3} alignItems={"center"}>
          {" "}
          <Heading color={"primary"} fontSize={"lg"}>
            Search
          </Heading>
          <Search2Icon />
        </HStack>
        <HStack spacing={3} alignItems={"center"}>
          {" "}
          <Heading color={"primary"} spacing={3} fontSize={"lg"}>
            Main Page
          </Heading>
          <CalendarIcon />
        </HStack>
        <HStack spacing={3} alignItems={"center"}>
          <Heading color={"primary"} fontSize={"lg"}>
            Profile Settings
          </Heading>
          <SettingsIcon />
        </HStack>
      </HStack>
    </Flex>
  );
};

export default NavBar;
