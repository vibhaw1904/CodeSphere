"use client"
import { authModalState } from '@/atoms/authModalAtom';
import { auth, firestore } from '@/firebase/firebase';
import React, { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { doc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';


type signupProps = {
    
};

const Signup:React.FC<signupProps> = () => {
    const router=useRouter();
    const authModal = useRecoilValue(authModalState);
    const[inputs,setInputs]=useState({displayName:"",email:"",password:""})
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useCreateUserWithEmailAndPassword(auth);
    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setInputs((prev)=>({...prev,[e.target.name]:e.target.value}))
    }
    const handleSubmit=async(e:React.ChangeEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(!inputs.email||!inputs.displayName||!inputs.password)alert("please fill all the  field")

        try {
            toast.loading("Creating",{position:"top-center",toastId:"loadingToast"})
            const newUser=await createUserWithEmailAndPassword(inputs.email, inputs.password)
            if(!newUser)return
            const userData={
                uid:newUser.user.uid,
                email:newUser.user.email,
                displayname:newUser.user.displayName,
                createdAt:Date.now(),
                upadtedAt:Date.now(),
                likedProblem:[],
                dislikedProblem:[],
                solvedProblem:[]
            }
            await setDoc(doc(firestore,"users",newUser.user.uid),userData)
            router.push('/')
        } catch (error:any) {
            toast.error(error.message,{position:"top-center"})
        }finally{
            toast.dismiss("loadingToast")
        }
    }
    console.log(inputs)
    const setAuthModalState= useSetRecoilState(authModalState)
    const handleClick=(type:"login" | "signup")=>{
       
        setAuthModalState((prev)=>({...prev,type,isOpen:true}))
        
    }
    useEffect(()=>{
       if(error) alert(error.message)
    },[error])
    // const handleClose = () => {
    //     setAuthModalState((prev) => ({ ...prev, isOpen: false }));
    // };

    if (!authModal.isOpen) return null;
    return <section className="bg-gray-50 dark:bg-gray-900">
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
       
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Create an account
                </h1>
                <form  onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
                <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                        <input onChange={handleChange} type="displayName" name="displayName" id="displayName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john" required />
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input onChange={handleChange} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input onChange={handleChange} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                  
                  
                    <button type="submit" className="w-full bg-blue-700 text-white bg-primary-600 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">{loading?"Creating...":"Create"}</button>
                   <button onClick={()=>handleClick("login")}> <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Already have an account?<span className="font-medium text-primary-600 hover:underline dark:text-primary-500 text-blue-700">Login here</span>
                    </p></button>
                </form>
            </div>
        </div>
    </div>
  </section>
}
export default Signup;