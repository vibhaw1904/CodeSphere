"use client";

import { authModalState } from "@/atoms/authModalAtom";
import AuthPage from "@/components/AuthPage";
import { auth } from "@/firebase/firebase";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { FaCode, FaTrophy, FaHeart, FaComments } from "react-icons/fa";
import { motion } from 'framer-motion';
const Auth = () => {
  const router = useRouter();
  const authModal = useRecoilValue(authModalState);
  const setAuthModalState = useSetRecoilState(authModalState);
  const [user, loading] = useAuthState(auth);
  const [pageLoading, setPageLoading] = useState(true);
  const modalRef = useRef<HTMLDivElement>(null);

  const [windowWidth, setWindowWidth] = useState(0);



  useEffect(() => {

      if (typeof window !== 'undefined') {

          setWindowWidth(window.innerWidth);

      }

  }, []);

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    } else if (!loading) {
      setPageLoading(false);
    }
  }, [user, router, loading]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setAuthModalState({ ...authModal, isOpen: false });
      }
    };

    if (authModal.isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [authModal, setAuthModalState]);

  if (pageLoading) {
    return null;
  }

  const openAuthModal = (type: "login" | "signup") => {
    setAuthModalState({ isOpen: true, type });
  };

    return (
        
        <div className="bg-gradient-to-b from-indigo-900 to-blue-900 min-h-screen text-white relative">
           
            <section className="container mx-auto px-4 py-20 text-center">
                <h2 className="text-5xl font-bold mb-4">Master DSA with CodeSphere</h2>
                <p className="text-xl mb-8">Elevate your coding skills, compete with peers, and join a thriving community of problem solvers.</p>
                <button onClick={() => openAuthModal('login')} className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-full text-lg font-semibold">Get Started</button>
            </section>
            <section id="features" className="container mx-auto px-4 py-20">
                <h3 className="text-3xl font-bold text-center mb-12">Key Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
                    <FeatureCard icon={<FaCode />} title="Interactive Coding Area" description="Write, run, and test your code in real-time with our powerful coding interface." />
                    <FeatureCard icon={<FaTrophy />} title="Leaderboard" description="Compete with fellow coders and climb the ranks on our global leaderboard." />
                    <FeatureCard icon={<FaHeart />} title="Like Problems" description="Bookmark your favorite problems and track your progress over time." />
                    <FeatureCard icon={<FaComments />} title="Discussions" description="Engage in discussions, share insights, and learn from the community." />
                </div>
            </section>
            <section className="container mx-auto px-4 py-20 text-center">
                <h3 className="text-3xl font-bold mb-4">Ready to Take the Challenge?</h3>
                <p className="text-xl mb-8">Join CodeSphere today and start your journey to DSA mastery!</p>
                <button onClick={() => openAuthModal('signup')} className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-full text-lg font-semibold">Sign Up Now</button>
            </section>

            {/* Footer */}
            <footer className="bg-indigo-950 py-8">
                <div className="container mx-auto px-4 text-center">
                    <p>&copy; 2023 CodeSphere. All rights reserved.</p>
                </div>
            </footer>
            {/* Auth Modal */}
            {authModal.isOpen && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-md z-50">
                    <div ref={modalRef} className="bg-white rounded-lg shadow-lg p-6 relative">
                        <AuthPage />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Auth;

type FeatureCardProp={
    icon:any;
    title:string;
    description:string;
}
const FeatureCard = ({ icon, title, description }:FeatureCardProp) => (
  <motion.div 
  whileHover={{ scale: 1.05 }}
  transition={{ duration: 0.3 }}
  className="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col items-center text-center"
>
  <div className="text-4xl mb-2 text-blue-400">{icon}</div>
  <h3 className="text-xl font-semibold mb-2">{title}</h3>
  <p className="text-gray-400">{description}</p>
</motion.div>
);
