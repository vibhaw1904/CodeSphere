"use client"
import { authModalState } from '@/atoms/authModalAtom';
import AuthPage from '@/components/AuthPage';
import { auth } from '@/firebase/firebase';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilValue } from 'recoil';

type pageProps = {
    
};

const Loginpage:React.FC<pageProps> = () => {
    const router=useRouter()
    const authmodal=useRecoilValue(authModalState);
    const[user,loading,error]=useAuthState(auth);
    useEffect(()=>{
        if(user)router.push('/');
    },[user,router])
    return <div>
        {authmodal.isOpen&&<AuthPage/>}
    </div>
}
export default Loginpage;