import express from 'express';
import bodyParser, {BodyParser} from "body-parser";
import cors from "cors";
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { User } from './user';
import JWTService from '../services/jwt';
import { PrismaClient } from '@prisma/client';
import {GraphqlContext} from "../interfaces";
import {Tweet} from "./tweet";

export async function initServer(){
    const app = express();

    app.use(bodyParser.json());
    app.use(cors());

    //create a graphql server    
    const graphqlServer = new ApolloServer<GraphqlContext>({
        typeDefs: `
            ${User.types}
            ${Tweet.types}
            type Query{
                ${User.queries} 
            }

            type Mutation {
            ${Tweet.mutations}}
        `,
        resolvers:  {
            Query: {
               ...User.resolvers.queries, 
            },
            Mutation: {
                ...Tweet.resolvers.mutations,
            }
        },
      });

    await graphqlServer.start();

    app.use("/graphql", expressMiddleware(graphqlServer, {
        context: async ({ req, res }) => {
            return {
                user: req.headers.authorization
                ? JWTService.decodeToken(
                    req.headers.authorization.split("Bearer ") [1]
                )
                : undefined,
            }
        }
    }));


    return app;
}