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
      router.push('/dashboard')
    });

    return () => unsubscribe();
  }, [router, auth]);

  // Return a loading indicator or null while checking auth state
  return <div>Loading...</div>;
}