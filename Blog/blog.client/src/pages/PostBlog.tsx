import Navbar from "../components/Navbar";
import '../App.css';
import { FormControl, Box, Text, Textarea, FormLabel, Input, Button, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { CreateBlogPost } from "../dto/CreateBlogPost";
import { postBlogAsync } from "../service/api/api-service";

const PostBlog = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const toast = useToast();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newBlogPost: CreateBlogPost = {
            title: title,
            content: content,
            author: author
        };

        try {
          await postBlogAsync(newBlogPost);
          
          toast({
            title: "Blog post created successfully!",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top"
          });

          setTitle('');
          setContent('');
          setAuthor('');
        } catch (error) {
          console.error('Failed to post blog: ', error);
          toast({
            title: "Failed to create blog post",
            description: "Please try again.",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top"
          });
        }
    }

    return (
        <>
        <div className='main-container'>
            <Navbar /> 
        </div>
        <Box p={4}>
        <Box maxW="600px" mx="auto" bg="white" p={4} borderRadius="md">
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            Create your blog post
          </Text>
          <form onSubmit={handleSubmit}>
            <FormControl id="name" mb={4} isRequired>
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                autoComplete="off"
                maxLength={90}
                required
              />
            </FormControl>
            
            <FormControl id="description" mb={4} isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea
                h='50vh'
                aria-required="true"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                autoComplete="off"
                required
              />
            </FormControl>
            <FormControl id="name" mb={4} isRequired>
              <FormLabel>Author</FormLabel>
              <Input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                autoComplete="off"
                maxLength={90}
                required
              />
            </FormControl>
            <Button colorScheme="blue" bg="teal.500" color="white" type="submit" w="100%">
              Publish
            </Button>
          </form>
        </Box>
      </Box>
      </>
    );
}

export default PostBlog;