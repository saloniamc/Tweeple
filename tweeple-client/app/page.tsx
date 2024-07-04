"use client";
import React, { useCallback } from "react";
import Image from "next/image";
import { BsTwitter } from "react-icons/bs";
import { BiBell, BiBookmark, BiEnvelope, BiHash, BiHomeCircle, BiUser } from "react-icons/bi";
import { CiCircleMore } from "react-icons/ci";
import {CredentialResponse, GoogleLogin} from "@react-oauth/google"
import FeedCard from "@/components/FeedCard";
import { graphqlClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import toast from "react-hot-toast";


interface twitterSidebarButton{
  title : string;
  icon : React.ReactNode;

}

// Array of twitterSidebarItems type items
const sideBarMenuItems : twitterSidebarButton[] = [
  {
  title : "Home",
  icon : <BiHomeCircle />,
  },
  {
    title : "Explore",
    icon : <BiHash />,
  },
  {
    title : "Notifications",
    icon : <BiBell />,
  },
  {
    title : "Messages",
    icon : <BiEnvelope />,
  },
  {
    title : "Bookmarks",
    icon : <BiBookmark />,
  },
  {
    title : "Profile",
    icon : <BiUser />,
  },
  {
    title : "More",
    icon : <CiCircleMore />,
  },
];

export default function Home() {

   const handleLoginWithGoogle = useCallback( async(cred: CredentialResponse) => {
    const googleToken = cred.credential;
    if(!googleToken) return toast.error(`Google token not found`);
    const {verifyGoogleToken} = await graphqlClient.request(verifyUserGoogleTokenQuery, {token: googleToken});

    toast.success("Verified Success");
    console.log(verifyGoogleToken);

    if(verifyGoogleToken) window.localStorage.setItem("__tweeple_token", verifyGoogleToken);
  },
   []
  );

  return ( <div>
      <div className="grid grid-cols-12 h-screen w-screen px-40 ">
        <div className=" col-span-3  pt-8 px-4">
          <div className="text-3xl h-fit w-fit hover:bg-gray-800 rounded-full p-2 cursor-pointer transition-all">
          <BsTwitter  />
          </div>
          <div className="mt-4 text-lg pr-4">
            {// for each item i want to have an <li></li>
            }
            <ul>
            {sideBarMenuItems.map((item) => (
            <li className="flex justify-start items-center gap-4 hover:bg-gray-800 rounded-full px-4 py-2 cursor-pointer w-fit mt-2" 
            key={item.title}
            >
              <span className="text-3xl">{item.icon}</span>
              <span>{item.title}</span>
              </li> 
              ))}

            </ul>
            <div className=" mt-5 px-3">
              <button className="bg-[#1d9bf0] p-2 font-semibold text-sm rounded-full w-full ">Tweet</button>

            </div>
          </div>
        </div>
        <div className="col-span-6 border-r-[0.1px] h-screen overflow-scroll scrollbar-hide border-l-[0.1px] border-gray-800">
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
        </div>
        <div className="col-span-3">
            <div className="p-5 bg-slate-700 rounded-lg">
              <h1>New to Tweeple?</h1>
              <GoogleLogin onSuccess={handleLoginWithGoogle} />
            </div>
        </div>

      </div>
    </div>
  );
}
