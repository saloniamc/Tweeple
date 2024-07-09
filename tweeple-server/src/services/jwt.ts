import JWT from 'jsonwebtoken';
import { prismaClient } from "../clients/db";
import { User } from "@prisma/client";
import { JWTUser } from "../interfaces";

const JWT_secret = '$uper@1234.'

class JWTService{
    
    public static generateTokenForUser(user: User){
        const payload = {
            id: user?.id,
            email: user?.email,
        };

        const token = JWT.sign(payload, 'JWT_secret');
        return token;
    }
    public static decodeToken(token: string){
        try{
            return JWT.verify(token, JWT_secret) as JWTUser;
        } catch (error) {
            return null;
        }
    }
}

export default JWTService;