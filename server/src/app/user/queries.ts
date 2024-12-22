export const queries = `#graphql
        verifyUser(email: String, firstName: String, lastName: String,profileImageUrl: String): String
        currentUser: User
        currentUserByEmail(email: String): User
        currentUserById(id: String): User
`;
