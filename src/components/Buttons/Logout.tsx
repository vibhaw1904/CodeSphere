import { auth } from '@/firebase/firebase';
import React from 'react';
import { useSignOut } from 'react-firebase-hooks/auth';
import { FiLogOut } from 'react-icons/fi';
type LogoutProps = {
    
};

const Logout:React.FC<LogoutProps> = () => {
    const[signout,loading,error]=useSignOut(auth);

    const handleSignout=async()=>{
        await signout();
    }

    return <button onClick={handleSignout} className='backdrop-blur-md cursor-pointer rounded text-blue-500  text-lg bg-gray-700 w-8 p-2'>
<FiLogOut />
    </button>
}
export default Logout;