"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = initServer;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const user_1 = require("./user");
const memories_1 = require("./memories");
const jwt_1 = __importDefault(require("./services/jwt"));
const cloudinary_1 = require("cloudinary");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function initServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        cloudinary_1.v2.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
        });
        const gqlServer = new server_1.ApolloServer({
            typeDefs: `
      ${user_1.user.types}
      ${memories_1.memories.types}
      type Query {
        ${user_1.user.queries}
        ${memories_1.memories.queries}
      }
      type Mutation {
      ${memories_1.memories.mutations}
        ${user_1.user.mutations}
      }
  `,
            resolvers: {
                Query: Object.assign(Object.assign({}, user_1.user.resolvers.queryResolver), memories_1.memories.resolvers.queryresolvers),
                Mutation: Object.assign(Object.assign({}, user_1.user.resolvers.mutationResolver), memories_1.memories.resolvers.mutationResolvers),
            },
        });
        yield gqlServer.start();
        app.use((0, cors_1.default)());
        app.use(express_1.default.json());
        app.use("/graphql", (0, express4_1.expressMiddleware)(gqlServer, {
            context: (_a) => __awaiter(this, [_a], void 0, function* ({ req, res }) {
                return {
                    user: req.headers.authorization
                        ? yield jwt_1.default.decodeToken(req.headers.authorization.split(" ")[1])
                        : undefined,
                };
            }),
        }));
        return app;
    });
}
