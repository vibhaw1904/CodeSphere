"use client";

import { firestore } from "@/firebase/firebase";
import { DBProblem } from "@/utils/types/problem";
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

const ProblemsTable: React.FC = () => {
  const problems = useGetProblems();

  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="min-w-full bg-gray-900 text-sm">
        <thead className="bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Difficulty</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Category</th>
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
                className={`${idx % 2 === 0 ? "bg-gray-900" : "bg-gray-800"} hover:bg-gray-700 transition-colors`}
                key={problem.id}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <BsCheckCircle className="text-green-400" size={18} />
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
                        query: { id: problem.id }
                      }}
                    >
                      {problem.title}
                    </Link>
                  )}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap font-medium ${difficultyColor}`}>
                  {problem.difficulty}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-300">{problem.category}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProblemsTable;



function useGetProblems(): Problem[] {
  const [problems, setProblems] = useState<DBProblem[]>([]);

  useEffect(() => {
    const getProblems = async () => {
      const q = query(collection(firestore, "problems"), orderBy("order", "asc"));
      const querySnapshot = await getDocs(q);
      const temp: DBProblem[] = [];
      querySnapshot.forEach((doc) => {
        temp.push({ id: doc.id, ...doc.data() } as DBProblem);
      });
      setProblems(temp);
    };
    getProblems();
  }, []);

  return problems;
}
