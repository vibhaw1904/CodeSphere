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
    <table className="min-w-full bg-white/5">
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
              : problem.difficulty === "Medium" ||"medium"
              ? "text-yellow-500"
              : "text-red-500";
          return (
            <tr
              className={`${idx % 2 === 1 ? "bg-gray-800" : ""}`}
              key={problem.id}
            >
              <td className="px-4 ml-3 py-4 text-green-500 font-medium whitespace-nowrap">
                <BsCheckCircle fontSize={"18"} width={"18"} />
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
