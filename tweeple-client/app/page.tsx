"use client";
import React, { useCallback, useState } from "react";
import FeedCard from "@/components/FeedCard"; 
import { useCreateTweet, useGetAllTweets } from "../hooks/tweet";
import { useCurrentUser } from "@/hooks/user";
import { Maybe, Tweet, User } from "@/gql/graphql";
import Twitterlayout from "@/components/Layout/TwitterLayout";
import Image from "next/image";
import { BiImageAlt } from "react-icons/bi";
import { GetServerSideProps } from "next";
import { graphqlClient } from "@/clients/api";
import { getAllTweetsQuery} from "@/graphql/query/tweet";

interface HomeProps {
  tweets?: Tweet[];
}


export default function Home(props: HomeProps) {
  const { user } = useCurrentUser();
  const { tweets = props.tweets as Tweet[] } = useGetAllTweets();
  const { mutateAsync } = useCreateTweet();

  const [content, setContent] = useState('');
  const [imageURL, setImageURL] = useState("");

  const handleSelectImage = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
  }, []);

  const handleCreatetweet = useCallback(() => {
    mutateAsync({
      content,
    });
  }, [content, mutateAsync]);



  return ( 
    <div>
      <Twitterlayout>
      <div>
          <div className="border border-gray-800 p-4 border-l-0 border-r-0 border-b-0 hover:bg-slate-900 transition-all cursor-pointer">
          <div className="grid grid-cols-12 gap-2">
          <div className="col-span-1">
                {user?.profileImageURL && (
                <Image
                className="rounded-full"
                src={user?.profileImageURL}
                alt="User-Image" 
                height={50} 
                width={50}
                />
              )}
            </div>
            <div className="col-span-11">
              <textarea 
              value={content}
              onChange={e => setContent(e.target.value)}
              className="w-full bg-transparent text-xl px-3 border-b border-slate-700" 
              placeholder="What's happening?"
              rows={4}></textarea>
              <div className="mt-2 flex justify-between items-center">
                <BiImageAlt onClick={handleSelectImage} className="text-xl"/>
                <button 
                onClick={handleCreatetweet}
                className="bg-[#1d9bf0] py-1 px-4 font-semibold text-sm rounded-full ">
                  Tweet
                </button>
              </div>
            </div>
          </div>
           </div>
          </div>
          {tweets?.map((tweet: { id: any; __typename?: "Tweet" | undefined; author?: Maybe<User> | undefined; content?: string; imageURL?: Maybe<string> | undefined; }) =>
          tweet ? <FeedCard key={tweet?.id} data={tweet as Tweet} /> : null
        )}
      </Twitterlayout>
    </div>
  );
}


export const getServerSideProps: GetServerSideProps<HomeProps> = async (
  context
) => {
  const allTweets = await graphqlClient.request(getAllTweetsQuery);
  return {
    props: {
      tweets: allTweets.getAllTweets as Tweet[],
    },
  };
};

