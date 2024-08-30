"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '../firebase/firebase'
export default function Page() {
  const router = useRouter();
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user||user) {
        router.push('/dashboard');
      } 
    });

    return () => unsubscribe();
  }, [router]);

  // Return null or a loading indicator while checking auth state
  return null;
}