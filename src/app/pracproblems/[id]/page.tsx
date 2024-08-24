"use client";

import CodeSpace from '@/components/CodeSpace/CodeSpace';
import { questions } from '@/utils/questions';
import { Problem } from '@/utils/types/problem';
import React from 'react';
import { notFound, useParams } from 'next/navigation';

const ProblemPage: React.FC = () => {
  const params = useParams();
  const pid = params.id as string;
  const problem = questions[pid];

  if (!problem) {
    notFound(); 
    return null; 
  }

 
  return (
    <div className='text-white'>
      <CodeSpace problem={problem} />
    </div>
  );
}

export default ProblemPage;
