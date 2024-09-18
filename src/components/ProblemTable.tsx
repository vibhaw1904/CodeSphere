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
import { motion } from "framer-motion";

const ProblemsTable= () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const { problems, totalProblems } = useGetProblems(pageSize, currentPage);
  const solvedProblem = useGetSolvedProblems();
  const totalPages = Math.ceil(totalProblems / pageSize);

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 md:p-8"
    >
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="text-3xl font-bold mb-6 text-center text-blue-400"
      >
        Problem List
      </motion.h1>   

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="bg-gray-800 rounded-lg shadow-lg overflow-hidden"
      >
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Title
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Difficulty
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
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
                <motion.tr
                  key={problem.id}
                  className={`${
                    idx % 2 === 0 ? "bg-gray-800" : "bg-gray-750"
                  } hover:bg-gray-700 transition-colors`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                >
                  <td className="px-4 py-4 whitespace-nowrap">
                    {solvedProblem?.includes(problem.id) && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      >
                        <BsCheckCircle className="text-green-400" size={18} />
                      </motion.div>
                    )}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
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
                    className={`px-4 py-4 whitespace-nowrap font-medium ${difficultyColor}`}
                  >
                    {problem.difficulty}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-gray-300">
                    {problem.category}
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </motion.div>

      <motion.div
        className="mt-6 flex justify-between items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-600 transition-colors"
        >
          Previous
        </button>
        <span className="text-gray-300">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-600 transition-colors"
        >
          Next
        </button>
      </motion.div>
    </motion.div>
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
