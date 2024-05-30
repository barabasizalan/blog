import { Box, Button, Divider, Flex, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom";
import { BlogPost } from "../../model/BlogPost";

interface BlogPostCardProps {
    blog: BlogPost;
}

const BlogPostCard:React.FC<BlogPostCardProps> = ({blog}) => {
    return (
        <Box boxShadow="xl" p={4} m={5} borderRadius="20px" bg="#e6fff4" width='30%'>
        <Flex alignItems="center" justifyContent="space-between" mb={2}>
            <Text fontWeight="bold">
                {blog.author}
            </Text>
            <Text >
                {blog.dateCreated}
            </Text>
        </Flex>
        <Divider />
        <Flex alignItems="center" justifyContent="space-between">
            <Text m={4}>
                {blog.title}
            </Text>
            <Button as={Link} to={`/post/${blog.id}`} color='black'>Read more</Button>
        </Flex>
        </Box>
    );
}

export default BlogPostCard;