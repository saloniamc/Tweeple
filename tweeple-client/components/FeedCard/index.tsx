import React from 'react'
import Image from "next/image"
import { BiMessageRounded, BiUpload } from 'react-icons/bi';
import { FaRetweet } from 'react-icons/fa';
import { AiOutlineHeart } from 'react-icons/ai';
import { Inter } from "next/font/google";
import { Tweet } from '@/gql/graphql';

const inter = Inter({subsets : ["latin"]});

//To render this FeedCard in app.tsx file
//functional component of type React.FC

interface FeedCardProps {
    data: Tweet;
  }

const FeedCard: React.FC<FeedCardProps> = (props) => {
    const {data} = props;
    return (
        <div className="border border-gray-800 p-4 border-l-0 border-r-0 border-b-0 hover:bg-slate-900 transition-all cursor-pointer">
        <div className="grid grid-cols-12 gap-2">
            <div className="col-span-1">
                { data.author?.profileImageURL && <Image
                className="rounded-full"
                src={data.author.profileImageURL}
                alt="User-Image" 
                height={50} 
                width={50}
                />}
            </div>
            <div className="col-span-11 text-sm">
                <h5>{data.author?.firstName} {data.author?.lastName}</h5>
                <p>
                    {data.content}
                </p>
                <div className="flex justify-between items-center mt-5 text-xl w-[90%">
                    <div>
                        <BiMessageRounded />
                    </div>
                    <div>
                        <FaRetweet/>
                    </div>
                    <div>
                        <AiOutlineHeart/>
                    </div>
                    <div>
                        <BiUpload/>
                    </div>
                    <div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

export default FeedCard ;