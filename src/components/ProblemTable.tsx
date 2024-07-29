"use client"
import { firestore } from "@/firebase/firebase";
import { log } from "console";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsCheckCircle } from "react-icons/bs";
type Problem = {
  id: string;
  title: string;
  difficulty: string;
  category: string;
  link?: string;
};

type ProblemsTableProps = {
  problems: Problem[];
};

const ProblemsTable: React.FC<ProblemsTableProps> = () => {

  const problems=useGetProblems();
  // console.log(problems)
  return (
    <table className="min-w-full bg-white/5 ">
      <thead>
        <tr>
        <th className="px-4 py-2 text-left text-gray-500">Status</th>

          <th className="px-4 py-2 text-left text-gray-500">Title</th>
          <th className="px-4 py-2 text-left text-gray-500">Difficulty</th>
          <th className="px-4 py-2 text-left text-gray-500">Category</th>
        </tr>
      </thead>
      <tbody className="text-white">
        {problems.map((problem, idx) => {
          const difficultyColor =
            problem.difficulty === "Easy"
              ? "text-green-500"
              : problem.difficulty === "Medium"
              ? "text-yellow-500"
              : "text-red-500";
          return (
            <tr
              className={`${idx % 2 === 1 ? "bg-gray-800" : ""}`}
              key={problem.id}
            >
              <td className="px-4 ml-3 py-4 text-green-500 font-medium whitespace-nowrap">              <th><BsCheckCircle fontSize={"18"} width={'18'}/></th>
              </td>
              <td className="px-4 py-2">
                {problem.link ? (
                  <Link
                    href={problem.link}
                    className="hover:text-blue-600 cursor-pointer"
                    target="_blank"
                  >
                    {problem.title}
                  </Link>
                ) : (
                  <Link
                    className="hover:text-blue-600 cursor-pointer"
                    href={`/pracproblems/${problem.id}`}
                  >
                    {problem.title}
                  </Link>
                )}
              </td>
              <td className={`px-4 py-2 ${difficultyColor}`}>
                {problem.difficulty}
              </td>
              <td className="px-4 py-2">{problem.category}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ProblemsTable;

function  useGetProblems(){
  const [problems,setProblems]=useState([]);
  useEffect(()=>{
    const getProblems=async()=>{
      const q=query(collection(firestore,"problems"),orderBy("order","asc"))
      const querySnapshot = await getDocs(q);
      const temp:any=[];   
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
       temp.push({id:doc.id,...doc.data()});
       setProblems(temp)
      });
      
     }
    getProblems();
  },[])
  return problems;
}