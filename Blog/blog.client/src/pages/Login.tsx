import {
    Flex,
    Heading,
    Input,
    Button,
    InputGroup,
    Stack,
    InputLeftElement,
    chakra,
    Box,
    Avatar,
    FormControl,
    InputRightElement,
    useToast,
    Link as ChakraLink,
} from "@chakra-ui/react";

import { useState } from "react";

import { FaUserAlt, FaLock } from "react-icons/fa";
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";


const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const toast = useToast();
    const {login} = useAuth();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        try {
            await login(username, password);
            const response = true;
          if (!response) {
            throw new Error('Login failed');
          }
          navigate('/');
          toast({
            title: "Login successful. Welcome " + username + "!",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top"
          })
        } catch (error) {
          console.error('Login failed: ', error);
          setUsername('');
          setPassword('');
          toast({
            title: "Login failed",
            description: "Invalid username or password. Please try again.",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top"
          });
        }
      };

    const handleShowClick = () => setShowPassword(!showPassword);

    return (
        <Flex
      flexDirection="column"
      width="100vw"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
      >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center">

        <Avatar bg="#bed1cf" />
        <Heading color="teal.400">Welcome back!</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form name="loginForm" onSubmit={handleSubmit}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md">
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    name="loginusername"
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="off"
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    name="loginPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        New to us?{" "}
        <ChakraLink as={ReactRouterLink} color="teal.500" to="/register">
          Sign Up
        </ChakraLink>
      </Box>
    </Flex>
    );
}

export default Login;