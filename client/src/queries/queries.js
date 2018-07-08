import { gql } from 'apollo-boost';


const getPostQuery = gql`
    {
        posts {
            id
            message
            user {
                name
                id
            }
        }
    }
`;

const addPostMutation = gql`
    mutation AddPost($message: String!, $userId: ID!){
        addPost(message: $message, userId: $userId){
            message
            user {
                name
            }
        }
    }
`;

export { getPostQuery, addPostMutation };
