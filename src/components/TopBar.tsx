// components/Appbar.tsx
"use client";

import { authModalState } from "@/atoms/authModalAtom";
import { auth } from "@/firebase/firebase";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";
import { BiSolidLeftArrow, BiSolidRightArrow, BiSolidUser } from "react-icons/bi";
import Logout from "./Buttons/Logout";
import { usePathname } from "next/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BsList } from "react-icons/bs";
import Timer from "./Timer";
import AddProblem from "./Forms/AddProblem";

type TopBarProps = {};

const TopBar: React.FC<TopBarProps> = () => {
  const pathname = usePathname();
  const problemPage = pathname.startsWith('/pracproblems'); 
  const setAuthModalState = useSetRecoilState(authModalState);
  const [user, loading, error] = useAuthState(auth); 
    const[showAddProblem,setShowAddProblem]=useState(false);
  const modalRef=useRef<HTMLDivElement>(null);

  const handleAddProblemClick=()=>{
    setShowAddProblem(true);
  }
  const handleOutsideClick = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setShowAddProblem(false);
    }
    
  };


  useEffect(() => {
    if (showAddProblem) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showAddProblem]);
  const handleClick = () => {
    setAuthModalState((prev) => ({ ...prev, isOpen: true, type: "login" }));
  };
  useEffect(() => {
    if (!loading && user) {
      console.log("User email:", user.email);
      console.log("User displayName:", user.displayName);
    } else if (error) {
      console.log("Error:", error);
    } else {
      console.log("Loading:", loading);
    }
  }, [user, loading, error]); // Add these dependencies
  
  return (
    <nav className='sticky top-0 z-40 w-full bg-gray-900 text-white shadow-md'>
      <div className={`flex items-center justify-between h-16 px-4 mx-auto ${!problemPage ? "max-w-7xl" : ""}`}>
        <Link href="/dashboard" className="flex items-center space-x-2">
          <div className="text-3xl font-bold text-blue-500 hover:text-blue-400 transition-colors">
            CodeSphere
          </div>
        </Link>

        {problemPage && (
          <div className="flex items-center space-x-4">
            <div className='flex items-center space-x-2 bg-gray-800 rounded-lg p-2'>
              <button className='p-2 rounded-full hover:bg-gray-700 transition-colors'>
                <FaChevronLeft />
              </button>
              <Link href='/dashboard' className='flex items-center space-x-2 text-gray-300 hover:text-white transition-colors'>
                <BsList />
                <span className="hidden sm:inline">Problem List</span>
              </Link>
              <button className='p-2 rounded-full hover:bg-gray-700 transition-colors'>
                <FaChevronRight />
              </button>
            </div>
            <Timer />
          </div>
        )}
        
        <div className="flex items-center space-x-4">
          {user && (
            <button
              onClick={() => setShowAddProblem(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Add Problem
            </button>
          )}
          <div className="text-sm ">Hello, {user?.displayName ? user?.displayName : 'Guest'}</div>
          {!user ?  (<Link href={"/auth"} onClick={handleClick}>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">Sign In</button>
          </Link>) : (
            <div className="flex items-center space-x-2">
              <div className="flex relative group">
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center cursor-pointer mr-2 backdrop-blur-md">
                  <BiSolidUser className="text-xl" />
                </div>
                <div
              className="absolute top-10 left-2/4 -translate-x-2/4 mx-auto bg-gray-400 text-brand-orange p-2 rounded shadow-lg 
                z-40 group-hover:scale-100 scale-0 
                transition-all duration-300 ease-in-out"
            >
              <p className="text-sm">{user.email}</p>
            </div>
            <Logout/>
              </div>
            </div>
          )}
        </div>
      </div>

      {showAddProblem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div ref={modalRef} className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
            <AddProblem />
          </div>
        </div>
      )}
    </nav>
  );
};

export default TopBar;
