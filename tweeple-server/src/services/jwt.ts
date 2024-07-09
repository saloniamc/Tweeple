import jwt from 'jsonwebtoken';
import { prismaClient } from "../clients/db";
import { User } from "@prisma/client";

const JWT_secret = '$uper@1234.'

class JWTService{
    static decodeToken(arg0: string) {
        throw new Error('Method not implemented.');
    }
    static decode(arg0: string) {
        throw new Error('Method not implemented.');
    }
    public static generateTokenForUser(user: User){
        const payload = {
            id: user?.id,
            email: user?.email,
        };

        const token = jwt.sign(payload, 'JWT_secret');
        return token;
    }
}

export default JWTService;