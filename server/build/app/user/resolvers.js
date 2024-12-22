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
exports.resolvers = void 0;
const db_1 = __importDefault(require("../../clients/db"));
const user_1 = __importDefault(require("../services/user"));
const queryResolver = {
    verifyUser: (_1, _a, __1) => __awaiter(void 0, [_1, _a, __1], void 0, function* (_, { email, firstName, lastName, profileImageUrl, }, __) {
        return yield user_1.default.verifyUser(email, firstName, lastName, profileImageUrl);
    }),
    currentUser: (_, __, context) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const id = (_a = context.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!id)
            return;
        const user = yield user_1.default.getUserbyId(id);
        return user;
    }),
    currentUserByEmail: (_, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const id = (_a = context.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!id)
            return;
        const user = yield user_1.default.getUserbyId(id);
        // console.log("user", user);
        return user;
    }),
    currentUserById: (_1, _a, __1) => __awaiter(void 0, [_1, _a, __1], void 0, function* (_, { id }, __) {
        return yield user_1.default.getUserbyId(id);
    }),
};
const mutationResolver = {
    addUser: (parent, props, context) => __awaiter(void 0, void 0, void 0, function* () {
        return yield db_1.default.user.create({
            data: {
                email: props.email,
                FirstName: props.firstName,
                LastName: props.lastName,
                profileImage: props.profileImageUrl,
            },
        });
    }),
};
exports.resolvers = { queryResolver, mutationResolver };
