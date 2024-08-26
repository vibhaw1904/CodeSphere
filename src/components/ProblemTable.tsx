"use client";

import { auth, firestore } from "@/firebase/firebase";
import { DBProblem } from "@/utils/types/problem";
import {
  collection,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BsCheckCircle } from "react-icons/bs";
import { DiVim } from "react-icons/di";

type Problem = {
  id: string;
  title: string;
  difficulty: string;
  category: string;
  link?: string;

};

const ProblemsTable: React.FC = () => {
  const [currentPage,setCurrentPage]=useState(1);
  const pageSize=8;
  const {problems,totalProblems} = useGetProblems(pageSize,currentPage);
  const solvedProblem = useGetSolvedProblems();
  const totalPages = Math.ceil(totalProblems / pageSize);
  console.log("solved:",solvedProblem)

  const handlePrev=()=>{
    if(currentPage>1){
      setCurrentPage(currentPage-1)
    }
  }
  const handleNext=()=>{
    if(currentPage<totalPages){
      setCurrentPage(currentPage+1);
    }
  }

  return (
    <div>

   
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="min-w-full bg-gray-900 text-sm">
        <thead className="bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Difficulty
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Category
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {problems.map((problem, idx) => {
            const difficultyColor =
              problem.difficulty === "Easy"
                ? "text-green-400"
                : problem.difficulty === "Medium"
                ? "text-yellow-400"
                : "text-red-400";
            return (
              <tr
                className={`${
                  idx % 2 === 0 ? "bg-gray-900" : "bg-gray-800"
                } hover:bg-gray-700 transition-colors`}
                key={problem.id}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  {solvedProblem?.includes(problem.id) && (
                    <BsCheckCircle className="text-green-400" size={18} />
                  )}{" "}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {problem.link ? (
                    <Link
                      href={problem.link}
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                      target="_blank"
                    >
                      {problem.title}
                    </Link>
                  ) : (
                    <Link
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                      href={{
                        pathname: `/pracproblems/${problem.id}`,
                        query: { id: problem.id },
                      }}
                    >
                      {problem.title}
                    </Link>
                  )}
                </td>
                <td
                  className={`px-6 py-4 whitespace-nowrap font-medium ${difficultyColor}`}
                >
                  {problem.difficulty}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                  {problem.category}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    <div className="mt-4 flex justify-between items-center">
        <button 
          onClick={handlePrev} 
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button 
          onClick={handleNext} 
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProblemsTable;

function useGetProblems(pageSize:number=10,page:number=1):  { problems: DBProblem[], totalProblems: number } {
  const [problems, setProblems] = useState<DBProblem[]>([]);
  const[totalProblems,setTotalProblems]=useState(0);

  useEffect(() => {
    const getProblems = async () => {
      const q = query(
        collection(firestore, "problems"),
        orderBy("order", "asc"),
        limit(pageSize),
        startAfter((page-1)*pageSize)
      );
      const querySnapshot = await getDocs(q);
      const temp: DBProblem[] = [];
      querySnapshot.forEach((doc) => {
        temp.push({ id: doc.id, ...doc.data() } as DBProblem);
      });
      setProblems(temp);
      const countSnapShot=await getCountFromServer(collection(firestore,"problems"));
    setTotalProblems(countSnapShot.data().count)
    };

    
    getProblems();
  }, [pageSize,page]);

  return {problems,totalProblems};
}

function useGetSolvedProblems() {
  const [solvedProblem, setSOlvedProblem] = useState<string[]>([]);
  const [user] = useAuthState(auth);
  useEffect(() => {
    const getSolvedProblems = async () => {
      const userRef = doc(firestore, "users", user!.uid);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        setSOlvedProblem(userDoc.data().solvedProblems);
      }
    };
    if (user) getSolvedProblems();
    if (!user) setSOlvedProblem([]);
  }, [user]);
  return solvedProblem;
}
