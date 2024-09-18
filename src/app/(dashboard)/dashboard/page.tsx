"use client";

import ProblemsTable from '@/components/ProblemTable';
import React, { useEffect, useState } from 'react';

const DashboardPage = () => {
  const [windowWidth, setWindowWidth] = useState(0);



    useEffect(() => {

        if (typeof window !== 'undefined') {

            setWindowWidth(window.innerWidth);

        }

    }, []);
  return (
    <div>
      <ProblemsTable />
    </div>
  );
};

export default DashboardPage;
