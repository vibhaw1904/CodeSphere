"use client"
import { authModalState } from '@/atoms/authModalAtom';
import AuthPage from '@/components/AuthPage';
import { auth } from '@/firebase/firebase';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilValue } from 'recoil';

type pageProps = {
    
};

const Loginpage:React.FC<pageProps> = () => {
    const router=useRouter()
    const authmodal=useRecoilValue(authModalState);
    const[user,loading,error]=useAuthState(auth);
    const[pageLoading,setPageLoading]=useState(true)
    useEffect(()=>{
        if(user)router.push('/');
        if(!loading && !user)setPageLoading(false)
    },[user,router])
    if(pageLoading){
        return null
    }

    return <div>
        {authmodal.isOpen&&<AuthPage/>}
    </div>
}
export default Loginpage;