
"use client";

import { useRecoilValue, useSetRecoilState } from 'recoil';
import { authModalState } from '@/atoms/authModalAtom';
import Signin from '@/components/signin';
import Signup from '@/components/signup';
import React from 'react';

type PageProps = {};

const AuthPage: React.FC<PageProps> = () => {
    const authModal = useRecoilValue(authModalState);
    const setAuthModalState = useSetRecoilState(authModalState);

  

    return (
        <>
           
                        {authModal.type === "login" ? <Signin /> : <Signup />}
                
        </>
    );
};

export default AuthPage;
