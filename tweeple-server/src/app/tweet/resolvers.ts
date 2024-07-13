import { Tweet } from "@prisma/client";
import { prismaClient } from "../../clients/db";
import {GraphqlContext} from "../../interfaces";
import UserService from "../../services/user";
// import TweetService, { CreateTweetPayload } from "../../services/tweet";

interface CreateTweetPayload {
    content: string
    imageURL?: string
}

const queries = {
    // getAllTweets:  () => prismaClient.tweet.findMany({orderBy: { createdAt: "desc"}}),
    // getAllTweets: () => TweetService.getAllTweets(),
};

const mutations = {
    createTweet: async (parent: any, { payload }: {payload: CreateTweetPayload}, 
        ctx: GraphqlContext) => {

         if(!ctx.user) throw new Error("You are not authenticated");
         const tweet = await prismaClient.tweet.create({
            data: {
                content: payload.content,
                imageURL: payload.imageURL,
                author: {connect: {id: ctx.user.id}},
            },
         });
         return tweet;
    },
};

// const extraResolvers = {
//     Tweet: {
//         author: (parent: Tweet) =>
//             prismaClient.user.findUnique({where: { id : parent.authorId }}),
//     },
// };

const extraResolvers = {
    Tweet: {
      author: (parent: Tweet) => UserService.getUserById(parent.authorId),
    },
  };

export const resolvers = {mutations, extraResolvers, queries};