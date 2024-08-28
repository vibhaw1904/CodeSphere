"use client"

import React from "react";
import ProblemTable from "./ProblemTable";
import { motion } from "framer-motion";

const ProblemCard: React.FC = () => {
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
        className="text-3xl font-bold mb-6 text-blue-400"
      >
        Problem List
      </motion.h1>
      <ProblemTable />
    </motion.div>
  );
};

export default ProblemCard;