"use client";
import { useEffect } from 'react';
import Login from './login/page';
import Image from 'next/image';

export default function Home() {
  useEffect(() => {
    if (localStorage.getItem('token')) {
      window.location.href = '/home';
    }
  }, []);

  return (
    <div className="w-screen h-screen relative">
      <div className="absolute inset-0 fade">
        <Image className='object-cover w-full h-full' src="/train.jpg" alt="IRCTC" layout="fill" />
        <div className="relative">
          <Login />
        </div>
      </div>

    </div>


  );
}
