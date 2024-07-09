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
const axios_1 = __importDefault(require("axios"));
const db_1 = require("../../clients/db");
const jwt_1 = __importDefault(require("../../services/jwt"));
const user_1 = __importDefault(require("../../services/user"));
const queries = {
    verifyGoogleToken: (parents_1, _a) => __awaiter(void 0, [parents_1, _a], void 0, function* (parents, { token }) {
        const googleToken = token;
        const googleOauthURL = new URL('https://oauth2.googleapis.com/tokeninfo');
        googleOauthURL.searchParams.set("id_token", googleToken);
        const { data } = yield axios_1.default.get(googleOauthURL.toString(), {
            responseType: "json",
        });
        const user = yield db_1.prismaClient.user.findUnique({
            where: { email: data.email },
        });
        if (!user) {
            yield db_1.prismaClient.user.create({
                data: {
                    email: data.email,
                    firstname: data.given_name,
                    lastname: data.family_name,
                    profileImgURL: data.picture,
                },
            });
        }
        const userInDb = yield db_1.prismaClient.user.findUnique({ where: { email: data.email } });
        if (!userInDb)
            throw new Error('User with email not found');
        const userToken = yield jwt_1.default.generateTokenForUser(userInDb);
        return userToken;
    }),
    getCurrentUser: (parent, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
        var _b;
        const id = (_b = ctx.user) === null || _b === void 0 ? void 0 : _b.id;
        if (!id)
            return null;
        const user = yield user_1.default.getUserById(id);
        return user;
    }),
    getUserById: (parent_1, _c, ctx_1) => __awaiter(void 0, [parent_1, _c, ctx_1], void 0, function* (parent, { id }, ctx) { return user_1.default.getUserById(id); }),
};
exports.resolvers = { queries };
