// components/Appbar.tsx
"use client";

import { authModalState } from "@/atoms/authModalAtom";
import { auth } from "@/firebase/firebase";
import Link from "next/link";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";
import { BiSolidLeftArrow, BiSolidRightArrow, BiSolidUser } from "react-icons/bi";
import Logout from "./Buttons/Logout";
import { usePathname } from "next/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BsList } from "react-icons/bs";
import Timer from "./Timer";

type TopBarProps = {};

const TopBar: React.FC<TopBarProps> = () => {
  const pathname = usePathname();
  const problemPage = pathname.startsWith('/pracproblems'); 
  const setAuthModalState = useSetRecoilState(authModalState);
  const [user] = useAuthState(auth);

  const handleClick = () => {
    setAuthModalState((prev) => ({ ...prev, isOpen: true, type: "login" }));
  };

  return (
    <nav className='relative flex h-[50px] w-full shrink-0 items-center justify-center px-5 bg-dark-layer-1 text-dark-gray-7 border-b-[1px] border-gray-300 '>
			<div className={`flex w-full items-center justify-between ${!problemPage ? "max-w-[1200px] mx-auto" : ""}`}>
      <Link href="/">
        <div className="text-3xl flex flex-col justify-center font-bold text-blue-800">
          CodeSphere
        </div>
      </Link>
      {problemPage && (
        <div className="flex">

        
					<div className='flex items-center gap-4 flex-1 justify-center rounded-md bg-gray-700 max-w-56 backdrop-blur-md'>
						<div
							className='flex items-center justify-center rounded bg-dark-fill-3 hover:bg-dark-fill-2 h-8 w-8 cursor-pointer'
						
						>
							<FaChevronLeft />
						</div>
						<Link
							href='/'
							className='flex items-center gap-2 font-medium max-w-[170px] text-dark-gray-8 cursor-pointer'
						>
							<div>
								<BsList />
							</div>
							<p>Problem List</p>
						</Link>
						<div
							className='flex items-center justify-center rounded bg-dark-fill-3 hover:bg-dark-fill-2 h-8 w-8 cursor-pointer'
							
						>
							<FaChevronRight />
						</div>
            
					</div>
          <Timer/>
          </div>

				)}
        
      <div className="flex flex-row justify-center pt-2 items-center">
        <div className="flex flex-col justify-center mr-4 h-full text-white items-center">
          Hello,
        </div>
        {!user && (
          <Link href={"/auth"} onClick={handleClick}>
            <button>Sign In</button>
          </Link>
        )}
        {user && (
          <div className="cursor-pointer group relative align-middle items-center flex mr-10">
            <div className="flex h-8 w-8 rounded-full bg-gray-700 backdrop-blur-md items-center align-middle">
              <BiSolidUser className="ml-2" />
            </div>
            <div
              className="absolute top-10 left-2/4 -translate-x-2/4 mx-auto bg-gray-400 text-brand-orange p-2 rounded shadow-lg 
                z-40 group-hover:scale-100 scale-0 
                transition-all duration-300 ease-in-out"
            >
              <p className="text-sm">{user.email}</p>
            </div>
          </div>
        )}
        {user && <Logout />}
      </div>
    </div>
    </nav>
   
  );
};

export default TopBar;
