import { Box, Button, Flex, useToast } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {

  const {isLoggedIn, logout} = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  

  const handleLogout = async () => {
    logout();
  }

  const handleCreatePostClick = () => {
    if(!isLoggedIn) {
      toast({
        title: 'You must be logged in to post a blog',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top'
      });
    } else {
      navigate('/create-post');
    }
  }

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      h="80px"
      bg="teal.500"
      color="white"
      px={8}
      py={4}
    >
      <Box>
        <Button as={Link} to="/" variant="ghost" color='white'>Home</Button>
        <Button as={Link} variant="ghost" ml={4} color='white' onClick={() => handleCreatePostClick()}>Post your blog</Button>
      </Box>

      <Box marginLeft='auto'>
        { !isLoggedIn ? (
          <Button as={Link} to="/login" variant="outline" color='white'>Login</Button>
        ) : (
          <Button as={Link} variant="outline" color='white' onClick={() => handleLogout()}>Logout</Button>
        ) }
        
      </Box>
    </Flex>
  );
};

export default Navbar;
