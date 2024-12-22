import express from "express";
import cors from "cors";
import { ApolloServer, BaseContext } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { user } from "./user";
import { memories } from "./memories";
import JWTService from "./services/jwt";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

export default async function initServer<GraphqlContext>() {
  const app = express();

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
  });

  const gqlServer = new ApolloServer<BaseContext>({
    typeDefs: `
      ${user.types}
      ${memories.types}
      type Query {
        ${user.queries}
        ${memories.queries}
      }
      type Mutation {
      ${memories.mutations}
        ${user.mutations}
      }
  `,
    resolvers: {
      Query: {
        ...user.resolvers.queryResolver,
        ...memories.resolvers.queryresolvers,
      },
      Mutation: {
        ...user.resolvers.mutationResolver,
        ...memories.resolvers.mutationResolvers,
      },
    },
  });

  await gqlServer.start();

  app.use(cors());
  app.use(express.json());

  app.use(
    "/graphql",
    expressMiddleware(gqlServer, {
      context: async ({ req, res }) => {
        return {
          user: req.headers.authorization
            ? await JWTService.decodeToken(
                req.headers.authorization.split(" ")[1]
              )
            : undefined,
        };
      },
    })
  );

  return app;
}
