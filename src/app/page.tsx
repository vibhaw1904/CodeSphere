"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '../firebase/firebase';

export default function HomePage() {
  const router = useRouter();
  const auth = getAuth(app);
  const [windowWidth, setWindowWidth] = useState(0);



    useEffect(() => {

        if (typeof window !== 'undefined') {

            setWindowWidth(window.innerWidth);

        }

    }, []);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/dashboard');
      } else {
        router.push('/auth');
      }
    });

    return () => unsubscribe();
  }, [router, auth]);
  
  return <div>Loading...</div>; // Simple loading indicator
}
