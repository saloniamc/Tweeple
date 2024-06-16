import React from "react";
import Image from "next/image";
import { BsTwitter } from "react-icons/bs";
import { BiBell, BiBookmark, BiEnvelope, BiHash, BiHomeCircle, BiUser } from "react-icons/bi";
import { CiCircleMore } from "react-icons/ci";
import { Inter } from "next/font/google";

const inter = Inter({subsets : ["latin"]});

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
  return (
    <div className={inter.className}>
      <div className="grid grid-cols-12 h-screen w-screen px-48 ">
        <div className=" col-span-3  pt-8 px-4">
          <div className="text-3xl h-fit w-fit hover:bg-gray-800 rounded-full p-2 cursor-pointer transition-all">
          <BsTwitter  />
          </div>
          <div className="mt-4 text-lg pr-4">
            {// for each item i want to have an <li></li>
            }
            <ul>
            {sideBarMenuItems.map(item => 
            <li className="flex justify-start items-center gap-4 hover:bg-gray-800 rounded-full px-4 py-2 cursor-pointer w-fit mt-2" key={item.title}>
              <span>{item.icon}</span>
              <span>{item.title}</span>
              </li> )}

            </ul>
            <div className=" mt-5 px-3">
              <button className="bg-[#1d9bf0] p-2 font-semibold text-sm rounded-full w-full ">Tweet</button>

            </div>
          </div>
        </div>
        <div className="col-span-6 border-r-[0.1px] border-l-[0.1px] border-gray-800"></div>
        <div className="col-span-3"></div>

      </div>
    </div>
  );
}
