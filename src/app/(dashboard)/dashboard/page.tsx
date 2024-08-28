import ProblemCard from '@/components/ProblemCard';
import React from 'react';

type pageProps = {
    
};

const page:React.FC<pageProps> = () => {
    
    return  <div className='flex flex-col items-center justify-center min-h-screen ml-[160px]'>
    <div className='w-full max-w-3xl px-4'>
      <ProblemCard />
    </div>
  </div>
}
export default page;