import { firestore } from '@/firebase/firebase';
import { DBProblem, Problem } from '@/utils/types/problem';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { AiFillDislike, AiFillLike } from 'react-icons/ai';
import { BsCheck2Circle } from 'react-icons/bs';

type ProblemDescriptionProps = {
    problem:Problem
};

const ProblemDescription: React.FC<ProblemDescriptionProps> = ({problem}) => {
   
  const {currentProblem,difficultyClass,loading}=  useGetProblem(problem.id);

    return (
        <div className="bg-dark-layer-1">
            {/* TAB */}
            <div className="flex h-11 w-full items-center pt-2 bg-dark-layer-2 text-white overflow-x-hidden">
                <div className="bg-dark-layer-1 rounded-t-[5px] px-5 py-[10px] text-xs cursor-pointer">
                    Description
                </div>
            </div>

            <div className="flex px-0 py-4 h-[calc(100vh-94px)] overflow-y-auto">
                <div className="px-5">
                    <div className="w-full">
                        <div className="flex space-x-4">
                            <div className="flex-1 mr-2 text-lg text-white font-medium">{currentProblem?.title}</div>
                        </div>
                        <div className="flex items-center mt-3">
                            <div className={`inline-block rounded-[21px] bg-opacity-[.15] px-2.5 py-1 text-xs font-medium capitalize ${difficultyClass}`}>
                                {currentProblem?.difficulty}
                            </div>
                            <div className="flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-dark-gray-6">
                                <AiFillLike className="text-dark-blue-s" />
                                <span className="text-xs">{currentProblem?.likes}</span>
                            </div>
                            <div className="flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-dark-gray-6">
                                <AiFillDislike className="text-dark-blue-s" />
                                <span className="text-xs">{currentProblem?.dislikes}</span>
                            </div>
                        </div>

                        <div className="text-white text-sm mt-4">
                            <div dangerouslySetInnerHTML={{ __html: problem.problemStatement }} />
                        </div>

                        {/* Examples */}
                        <div className="mt-4">
                            {problem.examples.map((example, index) => (
                                <div key={example.id}>
                                    <p className="font-medium text-white">Example {index + 1}:</p>
                                    {example.img&&<>
                                    <img src={example.img} alt="example" className='mt-2'/>
                                    </>}
                                    <div className="example-card bg-dark-layer-3 p-3 rounded-md mt-2">
                                        <pre>
                                            <strong className="text-white">Input: </strong>{example.inputText}
                                            <br />
                                            <strong>Output:</strong> {example.outputText} <br />
                                            {example.explanation && (
                                                <>
                                                    <strong>Explanation:</strong> {example.explanation}
                                                </>
                                            )}
                                        </pre>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Constraints */}
                        <div className="my-8 pb-4">
                            <div className="text-white text-sm font-medium">Constraints:</div>
                            <ul className="text-white ml-5 list-disc">
                                <div dangerouslySetInnerHTML={{ __html: problem.constraints }} />
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProblemDescription;


function useGetProblem(problemId:string){
    const [currentProblem,setCurrentProblem]=useState<DBProblem | null>(null);
    const[loading,setLoading]=useState<boolean>(true)
     const [difficultyClass,setDifficultyClass]=useState<string>("");
    useEffect(()=>{
        const getCurrentProb=async()=>{
            setLoading(true);
            const docref=doc(firestore,"problems",problemId);
            const docSnap=await getDoc(docref);
            if(docSnap.exists()){
                setLoading(false);
          const problem=docSnap.data();
setCurrentProblem({id:docSnap.id,...problem} as DBProblem);

setDifficultyClass(
    problem.difficulty==="Easy"?"bg-olive text-olive":problem.difficulty==="Medium"?"bg-dark-yellow text-dark-yellow":
    "bg-red-500 text-red-500"
)
            }
        }

        getCurrentProb();
    },[problemId])
    return {loading,currentProblem,difficultyClass}
}
