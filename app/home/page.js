"use client"
import { useEffect } from 'react';

export default function Home() {

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            window.location.href = '/';
        }
    }, []);
    
  return (
    <div className="text-pink-500">IRCTC done</div>
  );
}
