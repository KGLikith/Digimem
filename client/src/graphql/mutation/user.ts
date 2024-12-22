import { gql } from "@apollo/client";

export const addUserMutation = gql`
    mutation addUser($email: String!, $firstName: String!, $lastName: String, $profileImageUrl: String) {
        addUser(email: $email, firstName: $firstName, lastName: $lastName, profileImageUrl: $profileImageUrl) {
            id
        }
    }
`;
