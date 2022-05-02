import { Flex, HStack, Box, Heading, Spacer } from "@chakra-ui/react";
import { CalendarIcon, Search2Icon, SettingsIcon } from "@chakra-ui/icons";

const NavBar = () => {
  return (
    <Flex
      alignItems={"center"}
      justifyContent={"space-between"}
      w={"100%"}
      //   border={"1px solid black"}
      py={8}
      px={3}
    >
      <Heading px={8}>Cupper.</Heading>
      <Spacer />
      <HStack
        spacing={20}
        pr={8}
        alignContent={"flex-start"}
        justifyContent={"space-between"}
      >
        <HStack spacing={3} alignItems={"center"}>
          {" "}
          <Heading fontSize={"lg"}>Search</Heading>
          <Search2Icon />
        </HStack>
        <HStack spacing={3} alignItems={"center"}>
          {" "}
          <Heading spacing={3} fontSize={"lg"}>
            Main Page
          </Heading>
          <CalendarIcon />
        </HStack>
        <HStack spacing={3} alignItems={"center"}>
          <Heading fontSize={"lg"}>Profile Settings</Heading>
          <SettingsIcon />
        </HStack>
      </HStack>
    </Flex>
  );
};

export default NavBar;
