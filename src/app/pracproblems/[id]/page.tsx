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
    notFound(); // If the problem doesn't exist, trigger a 404 page
    return null; // Return null or some fallback UI to prevent further rendering
  }

  problem.handlerFunction = problem.handlerFunction.toString();
  console.log("probelms are",problem)
  return (
    <div className='text-white'>
      <CodeSpace problem={problem} />
    </div>
  );
}

export default ProblemPage;
