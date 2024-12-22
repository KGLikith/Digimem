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
const db_1 = __importDefault(require("../../clients/db"));
const jwt_1 = __importDefault(require("./jwt"));
class UserService {
    static getUserbyId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.default.user.findUnique({
                where: {
                    id: id,
                },
            });
        });
    }
    static getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.default.user.findUnique({
                where: {
                    email: email,
                },
            });
        });
    }
    static verifyUser(email, firstName, lastName, profileImageUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.getUserByEmail(email);
            if (!user) {
                const data = yield db_1.default.user.create({
                    data: {
                        email: email,
                        FirstName: firstName,
                        LastName: lastName,
                        profileImage: profileImageUrl,
                    },
                });
                const UserToken = yield jwt_1.default.generateJWT(data);
                return UserToken;
            }
            const UserToken = yield jwt_1.default.generateJWT(user);
            return UserToken;
        });
    }
}
exports.default = UserService;
