"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_secret = '$uper@1234.';
class JWTService {
    static generateTokenForUser(user) {
        const payload = {
            id: user === null || user === void 0 ? void 0 : user.id,
            email: user === null || user === void 0 ? void 0 : user.email,
        };
        const token = jsonwebtoken_1.default.sign(payload, 'JWT_secret');
        return token;
    }
    static decodeToken(token) {
        try {
            return jsonwebtoken_1.default.verify(token, JWT_secret);
        }
        catch (error) {
            return null;
        }
    }
}
exports.default = JWTService;
