// components/Appbar.tsx
"use client";

import { authModalState } from "@/atoms/authModalAtom";
import { auth } from "@/firebase/firebase";
import Link from "next/link";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";
import { BiSolidUser } from "react-icons/bi";
import Logout from "./Buttons/Logout";

type TopBarProps = {};

const TopBar: React.FC<TopBarProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [user] = useAuthState(auth);
  const handleClick = () => {
    setAuthModalState((prev) => ({ ...prev, isOpen: true,type:"login" }));
  };

  return (
    <div className="flex justify-between border-b px-4 py-2 border-slate-300">
      <Link href="/">
        <div className="text-3xl flex flex-col justify-center font-bold text-blue-800">
          CodeSphere
        </div>
      </Link>
      <div className="flex flex-row justify-center pt-2">
        <div className="flex flex-col justify-center mr-4 h-full text-white">
          Hello,{" "}
        </div>
        {!user && (
          <Link href={"/auth"} onClick={handleClick}>
            <button>Sign In</button>
          </Link>
        )}
        {user && (
          <div className="cursor-pointer group relative align-middle items-center flex mr-10">
            <div className="flex h-8 w-8 rounded-full bg-gray-700 backdrop-blur-md   items-center align-middle">
              <BiSolidUser className="ml-2" />
            </div>
            <div
              className="absolute top-10 left-2/4 -translate-x-2/4  mx-auto bg-gray-400 text-brand-orange p-2 rounded shadow-lg 
								z-40 group-hover:scale-100 scale-0 
								transition-all duration-300 ease-in-out"
            >
              <p className="text-sm">{user.email}</p>
            </div>
          </div>
        )}
{user &&<Logout/>
}      </div>
    </div>
  );
};

export default TopBar;
