import { Flex, HStack, Box, Heading, Spacer } from "@chakra-ui/react";
import { CalendarIcon, Search2Icon, SettingsIcon } from "@chakra-ui/icons";
import { Link as RouteLink, Route } from "react-router-dom";

const NavBar = () => {
  const navBarElements = [
    {
      label: "Search",
      path: "/",
      icon: <Search2Icon />,
    },
    {
      label: "Main Page",
      path: "/main-page",
      icon: <CalendarIcon />,
    },
    {
      label: "Profile Settings",
      path: "/profile-settings",
      icon: <SettingsIcon />,
    },
  ];

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
        {navBarElements.map((element) => (
          <HStack spacing={3} alignItems={"center"}>
            <Heading color={"primary"} fontSize={"lg"}>
              <RouteLink to={element.path}>{element.label}</RouteLink>
            </Heading>
            {element.icon}
          </HStack>
        ))}
      </HStack>
    </Flex>
  );
};

export default NavBar;
