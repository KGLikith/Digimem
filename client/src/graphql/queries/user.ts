// import { graphql } from "@/gql";
import { gql } from "@apollo/client";

export const currentUserQuery= gql`
  query currentUser {
    currentUser {
      id
      email
      profileImage
      FirstName
      LastName
    }
  }
`

export const currentUserByEmailQuery = gql`
  query currentUserByEmail($email: String!) {
    currentUserByEmail(email: $email) {
      id
      email
      profileImage
      FirstName
      LastName
    }
  }
`;

export const currentUserByIdQuery = gql`
  query currentUserById($id: String!) {
    currentUserById(id: $id) {
      id
      email
      profileImage
      FirstName
      LastName
    }
  }
`;


export const verifyUserQuery = gql`
  query verifyUser($email: String!, $firstName: String!, $lastName: String!, $profileImageUrl: String!) {
    verifyUser(email: $email, firstName: $firstName, lastName: $lastName, profileImageUrl: $profileImageUrl)
  }
`;