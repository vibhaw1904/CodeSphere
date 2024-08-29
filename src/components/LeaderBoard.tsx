"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaTrophy, FaMedal } from 'react-icons/fa';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { firestore } from '@/firebase/firebase';

interface LeaderboardEntry {
  rank: number;
  username: string;
  score: number;
  avatar: string;
}

const Leaderboard: React.FC = () => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      const leadUsers = await getLeadUsers();
      const formattedData = leadUsers.map((user, index) => ({
        rank: index + 1,
        username: user.displayName,
        score: user.points,
        avatar: user.avatar || "https://example.com/default-avatar.jpg"
      }));
      setLeaderboardData(formattedData);
    };

    fetchLeaderboardData();
  }, []);

 

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
        Leaderboard
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
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Rank</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">User</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {leaderboardData.map((entry, index) => (
              <motion.tr
                key={entry.username}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={index % 2 === 0 ? "bg-gray-800" : "bg-gray-750"}
              >
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {entry.rank === 1 && <FaTrophy className="text-yellow-400 mr-2" />}
                    {entry.rank === 2 && <FaMedal className="text-gray-400 mr-2" />}
                    {entry.rank === 3 && <FaMedal className="text-orange-400 mr-2" />}
                    <span className="font-medium">{entry.rank}</span>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {/* <img className="h-10 w-10 rounded-full mr-3" src={entry.avatar} alt={`${entry.username}'s avatar`} /> */}
                    <div className="font-medium">{entry.username}</div>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-blue-400 font-bold">
                  {entry.score}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
};

export default Leaderboard;
const getLeadUsers = async () => {
    const q = query(
      collection(firestore, "users"),
      orderBy("points", 'desc'),
      limit(10)
    );
    const querySnapshot = await getDocs(q);
    const users:any = [];
    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });
    return users;
  };