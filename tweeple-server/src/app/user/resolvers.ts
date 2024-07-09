import axios from 'axios';
import { prismaClient } from "../../clients/db";
import JWTService from "../../services/jwt";
import { GraphqlContext } from '../../interfaces';
import UserService from "../../services/user";
import { Tweet, User } from '@prisma/client';
import { mutations } from '../tweet/mutations';

interface GoogleTokenResult {
    iss?: string;
    nbf?: string;
    aud?: string;
    sub?: string;
    email: string;
    email_verified: string;
    azp?: string;
    name?: string;
    picture?: string;
    given_name: string;
    family_name?: string;
    iat?: string;
    exp?: string;
    jti?: string;
    alg?: string;
    kid?: string;
    typ?: string;
}

const queries = {
    verifyGoogleToken: async (parents:any, {token}:{token: string}) => {
        const googleToken = token;
        const googleOauthURL = new URL('https://oauth2.googleapis.com/tokeninfo');
        googleOauthURL.searchParams.set("id_token", googleToken);

        const { data } = await axios.get<GoogleTokenResult>(googleOauthURL.toString(), {
            responseType: "json",
        });

        const user = await prismaClient.user.findUnique({
            where :{email: data.email},
        });

        if(!user){
            await prismaClient.user.create({
                data: {
                    email: data.email,
                    firstname: data.given_name,
                    lastname: data .family_name,
                    profileImgURL: data.picture,
                },
            });
        }

        const userInDb = await prismaClient.user.findUnique({ where :{email: data.email} });

        if(!userInDb) throw new Error('User with email not found');

        const userToken  = await JWTService.generateTokenForUser(userInDb);

        return userToken;
    },

    getCurrentUser: async (parent: any, args: any, ctx: GraphqlContext) => {
        const id = ctx.user?.id;
        if (!id) return null;
    
        const user = await UserService.getUserById(id);
        return user;
    },
    getUserById: async (
        parent: any,
        { id }: { id: string },
        ctx: GraphqlContext
    ) => UserService.getUserById(id),
};

const extraResolvers = {
    User: {
        twwets: (parent: User) => prismaClient.tweet.findMany({where: {author: {id: parent.id}}})
    }
}

export const resolvers = { queries, extraResolvers };