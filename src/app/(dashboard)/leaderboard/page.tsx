"use client";

import Leaderboard from '@/components/LeaderBoard';
import React, { useEffect, useState } from 'react';

const LeaderboardPage = () => {
  const [windowWidth, setWindowWidth] = useState(0);



    useEffect(() => {

        if (typeof window !== 'undefined') {

            setWindowWidth(window.innerWidth);

        }

    }, []);
  return (
    <div>
      <Leaderboard />
    </div>
  );
};

export default LeaderboardPage;
