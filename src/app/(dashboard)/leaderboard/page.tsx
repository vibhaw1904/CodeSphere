"use client";

import React from 'react';
import dynamic from 'next/dynamic';

const Leaderboard = dynamic(() => import('@/components/LeaderBoard'), { ssr: false });

const LeaderboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <Leaderboard />
    </div>
  );
};

export default LeaderboardPage;