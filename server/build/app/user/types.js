"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.types = void 0;
exports.types = `#graphql
    type User{
        id: ID!
        FirstName: String!
        LastName: String
        email: String!
        profileImage: String
        memories: [Memory]
    }
`;
