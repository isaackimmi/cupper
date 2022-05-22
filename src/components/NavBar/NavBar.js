import { Flex, HStack, Heading, Spacer } from "@chakra-ui/react";
import { CalendarIcon, Search2Icon, SettingsIcon } from "@chakra-ui/icons";
import { Link as RouteLink } from "react-router-dom";

import "./NavBar.css";

const NavBar = () => {
  const navBarElements = [
    {
      label: "Search",
      path: "/landing-page",
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
      <Heading className="floating-logo" color={"primary"} px={8}>
        <RouteLink to={"/landing-page"}>Cupper</RouteLink>
      </Heading>
      <Spacer />

      <HStack
        spacing={20}
        pr={8}
        alignContent={"flex-start"}
        justifyContent={"space-between"}
        className="floating-logo"
      >
        {navBarElements.map((element) => (
          <HStack key={element.label} spacing={3} alignItems={"center"}>
            <Heading
              className="nav-link nav-link-fade-up"
              color={"primary"}
              fontSize={"lg"}
            >
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
