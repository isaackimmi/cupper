import { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  Box,
  FormControl,
  InputRightElement,
  Image,
  Text
} from "@chakra-ui/react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import { AtSignIcon, UnlockIcon } from "@chakra-ui/icons";
import coffee from "../images/cupocoffee.svg";
import NavBar from "../components/NavBar/NavBar";

import axios from "axios";


const Login = ({ onUserChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleLogin = async () => {
    const payload = {
      email: email,
      password: password,
    };

    try {
      const res = await axios.post(`/api/login`, payload);
      onUserChange(res.data);
      window.localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/landing-page");
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <>
      <NavBar />
      <Flex
        flexDirection="column"
        width="100wh"
        height="100vh"
        backgroundColor="grey.200"
        alignItems="center"
        pt={40}
      >
        <Stack
          flexDir="column"
          mb="2"
          justifyContent="center"
          alignItems="center"
        >
          <Image
            className="floating"
            w={20}
            h={20}
            src={coffee}
            alt="Course Cover"
          />
          <Heading color="#97D2FB">Welcome to Cupper</Heading>
          <Box minW={{ base: "90%", md: "468px" }}>
            {/* <form> */}
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="grey.200"
              boxShadow="md"
              borderRadius={20}
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<AtSignIcon color="gray.300" />}
                  />
                  <Input
                    type="email"
                    placeholder="Email"
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<UnlockIcon color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                borderRadius={10}
                type="submit"
                variant="solid"
                backgroundColor="#97D2FB"
                width="full"
                onClick={handleLogin}
                isDisabled={password !== "" && email !== "" ? false : true}
              >
                Login
              </Button>
            </Stack>
            {/* </form> */}
          </Box>
        </Stack>
        <Box>
          New to us?{" "}
          <Link color="#97D2FB" to="/">
            <Text as="span" color="#97D2FB"> 
              Sign Up
            </Text>
          </Link>
        </Box>
      </Flex>
    </>
  );
};

export default Login;
