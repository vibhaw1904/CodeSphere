// components/Appbar.tsx
"use client";

import { authModalState } from '@/atoms/authModalAtom';
import Link from 'next/link';
import React from 'react';
import { useSetRecoilState } from 'recoil';

type AppbarProps = {};

const Appbar: React.FC<AppbarProps> = () => {
    const setAuthModalState = useSetRecoilState(authModalState);

    const handleClick = () => {
        setAuthModalState((prev) => ({ ...prev, isOpen: true}));
    };

    return (
        <div className="flex justify-between border-b px-4 py-2 border-slate-300">
            <Link href="/">
                <div className="text-3xl flex flex-col justify-center font-bold text-blue-800">
                    CodeSphere
                </div>
            </Link>
            <div className="flex flex-row justify-center pt-2">
                <div className="flex flex-col justify-center mr-4 h-full text-white">Hello, </div>
                <button onClick={handleClick}>Login</button>
            </div>
        </div>
    );
};

export default Appbar;
