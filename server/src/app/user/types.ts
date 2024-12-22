export const types=`#graphql
    type User{
        id: ID!
        FirstName: String!
        LastName: String
        email: String!
        profileImage: String
        memories: [Memory]
    }
`