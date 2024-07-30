"use client"
import React from "react";
// import { problems } from "@/Problems/problem"; // Import your problems data
import ProblemTable from "./ProblemTable";

const ProblemCard: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-800 rounded-lg shadow-md mt-10 backdrop-blur">
      <h1 className="text-2xl font-bold text-white mb-4">Problem List</h1>
      <ProblemTable />
    </div>
  );
};

export default ProblemCard;
