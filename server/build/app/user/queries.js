"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queries = void 0;
exports.queries = `#graphql
        verifyUser(email: String, firstName: String, lastName: String,profileImageUrl: String): String
        currentUser: User
        currentUserByEmail(email: String): User
        currentUserById(id: String): User
`;
