import { Box, Button, Divider, Flex, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom";
import { BlogPost } from "../../model/BlogPost";
import { convertDate } from "../../utils/utils";
import { FaUser } from "react-icons/fa";

interface BlogPostCardProps {
    blog: BlogPost;
}

const BlogPostCard:React.FC<BlogPostCardProps> = ({blog}) => {
    return (
        <Box boxShadow="xl" p={4} m={5} borderRadius="20px" bg="#e6fff4" width='100%'>
        <Flex alignItems="center" justifyContent="space-between" mb={2}>
            <FaUser size={15} />
            <Text ml={5} mr='auto'>
                {blog.author}
            </Text>
            <Text >
                {convertDate(blog.dateCreated)}
            </Text>
        </Flex>
        <Divider />
        <Flex alignItems="center" justifyContent="space-between">
            <Text m={4} fontWeight="bold">
                {blog.title}
            </Text>
            <Button as={Link} to={`/post/${blog.id}`} color='black'>Read more</Button>
        </Flex>
        </Box>
    );
}

export default BlogPostCard;