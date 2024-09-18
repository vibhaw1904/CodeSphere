"use client";

import CodeSpace from '@/components/CodeSpace/CodeSpace';
import { questions } from '@/utils/questions';
// import { Problem } from '@/utils/types/problem';
import React, { Suspense, useEffect, useState } from 'react';
import { notFound, useParams } from 'next/navigation';




const ProblemPage: React.FC = () => {
  const params = useParams();
  const pid = params.id as string;
  const problem = questions[pid];

  const [windowWidth, setWindowWidth] = useState(0);



  useEffect(() => {

      if (typeof window !== 'undefined') {

          setWindowWidth(window.innerWidth);

      }

  }, []);

  if (!problem) {
    notFound(); 
    return null; 
  }

 
  return (
    <div className='text-white'>
       <Suspense fallback={<>Loading...</>}>
       <CodeSpace problem={problem} /></Suspense>
    
    </div>
  );
}

export default ProblemPage;
