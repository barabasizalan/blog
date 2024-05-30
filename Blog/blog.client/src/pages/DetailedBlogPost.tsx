import { useEffect, useRef, useState } from "react";
import {
  deleteBlogAsync,
  getBlogPostByIdAsync,
  updateBlogAsync,
} from "../service/api/api-service";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  IconButton,
  Flex,
  Divider,
  Button,
  Input,
  Textarea,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@chakra-ui/react";
import { FaTrash, FaPencilAlt, FaUser } from "react-icons/fa";
import Navbar from "../components/Navbar";
import { convertDate } from "../utils/utils";
import { useAuth } from "../context/AuthContext";

const DetailedBlogPost = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const { id } = useParams<{ id: string }>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {isLoggedIn} = useAuth();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchBlogPostById(parseInt(id));
    }
  }, [id]);

  const fetchBlogPostById = async (id: number) => {
    try {
      const blogPost = await getBlogPostByIdAsync(id);
      if (blogPost) {
        setTitle(blogPost.title);
        setContent(blogPost.content);
        setAuthor(blogPost.author);
        setDate(blogPost.dateCreated);
      }
    } catch (error) {
      console.error("Failed to fetch blog post by id: ", error);
    }
  };

  const handleUpdate = async (id: number) => {
    setIsEditable(false);
    try {
      await updateBlogAsync(id, {
        title: title,
        content: content,
        author: author,
      });
      fetchBlogPostById(id);
    } catch (error) {
      console.error("Failed to update blog post: ", error);
    }
  };

  const handleEdit = () => {
    setIsEditable(true);
  };

  const handleDelete = async (id: number) => {
    setIsDialogOpen(false);
    try {
      await deleteBlogAsync(id);
      navigate("/");
    } catch (error) {
      console.error("Failed to delete blog post: ", error);
    }
  };

  return (
    <>
      <div className="main-container">
        <Navbar />
      </div>
      <Box p={4}>
        <Box maxW="600px" mx="auto" bg="white" p={4} borderRadius="md">
          <Flex>
            {isEditable ? (
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fontSize="2xl"
                fontWeight="bold"
                mr="auto"
              />
            ) : (
              <Heading as="h1" size="xl" mr="auto">
                {title}
              </Heading>
            )}
            {isLoggedIn && (
              <>
            <IconButton
              icon={<FaPencilAlt />}
              onClick={handleEdit}
              aria-label="Edit"
              mx="2"
            />
            <IconButton
              icon={<FaTrash />}
              onClick={() => setIsDialogOpen(true)}
              aria-label="Delete"
              mx="2"
            />
            </>
            )}
          </Flex>

          <Flex mt="4">
            <Text color="gray.500" mr="5">
              {convertDate(date)}
            </Text>

            {isEditable ? (
              <>
                <Flex ml="auto" alignItems="center">
                  <FaUser />
                </Flex>
                <Input
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  ml="2"
                  size="md"
                  width="auto"
                />
              </>
            ) : (
              <>
                <Flex alignItems="center">
                  <FaUser />
                </Flex>
                <Text ml="2" fontWeight="bold">
                  {author}
                </Text>
              </>
            )}
          </Flex>

          <Divider my="4" />
          {isEditable ? (
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          ) : (
            <Text>{content}</Text>
          )}
          {isEditable && (
            <Flex>
              <Button
                mt="4"
                colorScheme="blue"
                onClick={() => handleUpdate(Number(id))}
              >
                Update
              </Button>
              <Button
                mt="4"
                ml="auto"
                colorScheme="blue"
                onClick={() => setIsEditable(false)}
              >
                Cancel
              </Button>
            </Flex>
          )}
        </Box>
      </Box>

      <AlertDialog
        isOpen={isDialogOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsDialogOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Blog Post
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this blog post? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={() => handleDelete(Number(id))} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DetailedBlogPost;
