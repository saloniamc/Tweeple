import { useCurrentUser } from '@/hooks/user';
import React, { useCallback, useMemo } from 'react';
import { BiBell, BiBookmark, BiEnvelope, BiHash, BiHomeCircle, BiMoney, BiUser } from 'react-icons/bi';
import { BsBell, BsBookmark, BsEnvelope, BsTwitter } from 'react-icons/bs';
import { CiCircleMore } from 'react-icons/ci';
import {CredentialResponse, GoogleLogin} from "@react-oauth/google"
import toast from 'react-hot-toast';
import { graphqlClient } from '@/clients/api';
import { verifyUserGoogleTokenQuery } from '@/graphql/query/user';
import { useQueryClient } from '@tanstack/react-query';
import Image from "next/image";
import Link from 'next/link';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

interface twitterSidebarButton{
    title : string;
    icon : React.ReactNode;
    link: string;
  
  }


interface TwitterlayoutProps{
    children: React.ReactNode
}

const Twitterlayout: React.FC<TwitterlayoutProps> = (props) => {
    const {user} = useCurrentUser();
    const queryClient = useQueryClient();

    // const sideBarMenuItems : twitterSidebarButton[] = useMemo(
    //     () => [
    //     {
    //     title : "Home",
    //     icon : <BiHomeCircle />,
    //     },
    //     {
    //       title : "Explore",
    //       icon : <BiHash />,
    //     },
    //     {
    //       title : "Notifications",
    //       icon : <BiBell />,
    //     },
    //     {
    //       title : "Messages",
    //       icon : <BiEnvelope />,
    //     },
    //     {
    //       title : "Bookmarks",
    //       icon : <BiBookmark />,
    //     },
    //     {
    //       title : "Profile",
    //       icon : <BiUser />,
    //     },
    //     {
    //       title : "More",
    //       icon : <CiCircleMore />,
    //     },
    //     ],
    //     [user?.id]
    //   );

    
  const sidebarMenuItems: twitterSidebarButton[] = useMemo(
    () => [
      {
        title: "Home",
        icon: <BiHomeCircle />,
        link: "/",
      },
      {
        title: "Explore",
        icon: <BiHash />,
        link: "/",
      },
      {
        title: "Notifications",
        icon: <BsBell />,
        link: "/",
      },
      {
        title: "Messages",
        icon: <BsEnvelope />,
        link: "/",
      },
      {
        title: "Bookmarks",
        icon: <BsBookmark />,
        link: "/",
      },
      {
        title: "Twitter Blue",
        icon: <BiMoney />,
        link: "/",
      },
      {
        title: "Profile",
        icon: <BiUser />,
        link: `/${user?.id}`,
      },
      {
        title: "More",
        icon: <CiCircleMore />,
        link: "/",
      },
    ],
    [user?.id]
  );

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
    
  return (

    <div>
      <div className="grid grid-cols-12 h-screen w-screen sm:px-56">
        <div className="col-span-2 sm:col-span-3 pt-1 flex sm:justify-end pr-4 relative">
          <div>
            <div className="text-2xl h-fit w-fit hover:bg-gray-800 rounded-full p-4 cursor-pointer transition-all">
              <BsTwitter />
            </div>
            <div className="mt-1 text-xl pr-4">
              <ul>
                {sidebarMenuItems.map((item) => (
                  <li key={item.title}>
                    <Link
                      className="flex justify-start items-center gap-4 hover:bg-gray-800 rounded-full px-3 py-3 w-fit cursor-pointer mt-2"
                      href={item.link}
                    >
                      <span className=" text-3xl">{item.icon}</span>
                      <span className="hidden sm:inline">{item.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-5 px-3">
                <button className="hidden sm:block bg-[#1d9bf0] font-semibold text-lg py-2 px-4 rounded-full w-full">
                  Tweet
                </button>
                <button className="block sm:hidden bg-[#1d9bf0] font-semibold text-lg py-2 px-4 rounded-full w-full">
                  <BsTwitter />
                </button>
              </div>
            </div>
          </div>
          {user && (
            <div className="absolute bottom-5 flex gap-2 items-center bg-slate-800 px-3 py-2 rounded-full">
              {user && user.profileImageURL && (
                <Image
                  className="rounded-full"
                  src={user?.profileImageURL}
                  alt="user-image"
                  height={50}
                  width={50}
                />
              )}
              <div className="hidden sm:block">
                <h3 className="text-xl">
                  {user.firstName} {user.lastName}
                </h3>
              </div>
            </div>
          )}
        </div>
        <div className="col-span-10 sm:colspan-6 border-r-[0.1px] h-screen overflow-scroll scrollbar-hide border-l-[0.1px] border-gray-800">
        {props.children}
        </div>
        <div className="col-span-0 sm:col-span-3 p-5">
          {!user ? (
            <div className="p-5 bg-slate-700 rounded-lg">
              <h1 className="my-2 text-2xl">New to Twitter?</h1>
              <GoogleLogin onSuccess={handleLoginWithGoogle} />
            </div>
          ) : (
            <div className="px-4 py-3 bg-slate-800 rounded-lg">
              <h1 className="my-2 text-2xl mb-5">Users you may know</h1>
              {user?.recommendedUsers?.map((el: { id: React.Key | null | undefined; profileImageURL: string | StaticImport; firstName: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; lastName: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }) => (
                <div className="flex items-center gap-3 mt-2" key={el?.id}>
                  {el?.profileImageURL && (
                    <Image
                      src={el?.profileImageURL}
                      alt="user-image"
                      className="rounded-full"
                      width={60}
                      height={60}
                    />
                  )}
                  <div>
                    <div className="text-lg">
                      {el?.firstName} {el?.lastName}
                    </div>
                    <Link
                      href={`/${el?.id}`}
                      className="bg-white text-black text-sm px-5 py-1 w-full rounded-lg"
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>

  )
};

export default Twitterlayout;