// components/Signin.tsx
"use client";

import { authModalState } from '@/atoms/authModalAtom';
import { auth } from '@/firebase/firebase';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import { useRecoilValue, useSetRecoilState } from 'recoil';

const Signin = () => {
    const authModal = useRecoilValue(authModalState);
    const router=useRouter()
    const setAuthModalState= useSetRecoilState(authModalState)
    const handleClick=(type:"login" | "signup")=>{
        setAuthModalState((prev)=>({...prev,type,isOpen:true}))
        
    }
    const [inputs,setInputs]=useState({email:"",password:""})
    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setInputs((prev)=>({...prev,[e.target.name]:e.target.value}))
    }
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth);
    const handleSubmit=async(e:React.ChangeEvent<HTMLFormElement>)=>{
        e.preventDefault();
        try {
        const userSigned=await signInWithEmailAndPassword(inputs.email, inputs.password)
        if(!userSigned)return
        router.push('/')

        } catch (error:any) {
            toast.error(error.message,{position:'top-center',autoClose:3000,theme:"dark"})
        }

    }
    console.log(user)
    
   
    const handleClose = () => {
        setAuthModalState((prev) => ({ ...prev, isOpen: false }));
    };

    if (!authModal.isOpen) return null;
   
useEffect(()=>{
    if(error) toast.error(error.message,{position:'top-center',autoClose:3000,theme:"dark"})
},[error])
    return ( <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className=" space-y-4 md:space-y-6 sm:p-8">
                    <div className='flex justify-end '>
                            <button
                                type='button'
                                onClick={handleClose}
                                className='bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-800 hover:text-white text-white'
                            >
                                ✖
                            </button>
                        </div>
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Login
                        </h1>
                        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Your email
                                </label>
                                <input onChange={handleChange} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Password
                                </label>
                                <input onChange={handleChange} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <button type="submit" className="w-full bg-blue-700 text-white bg-primary-600 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                              {loading?'loading...':'Login'}
                            </button>
                            <button type="button" onClick={() => handleClick("signup")} className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don't have an account? <span className="font-medium text-primary-600 hover:underline dark:text-primary-500 text-blue-700">Create here</span>
                            </button>
                        </form>
                    </div>
                </div>
        
    );
};

export default Signin;
