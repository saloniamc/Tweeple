import express from 'express';
import bodyParser, {BodyParser} from "body-parser";
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

export async function initServer(){
    const app = express();

    app.use(bodyParser.json());

    //create a graphql server    
    const graphqlServer = new ApolloServer<any>({
        typeDefs: `
            type Query{
                sayHello : String
            }
        `,
        resolvers:  {
            Query: {
                sayHello: () => `Hello from the graphql server`,

            }
        },
      });

    await graphqlServer.start();

    app.use('/graphql', expressMiddleware(graphqlServer));


    return app;
}