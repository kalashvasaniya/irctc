"use client";
import { useEffect, useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [admin, setadmin] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const storedEmail = localStorage.getItem('token');
      if (!storedEmail) {
        window.location.href = '/';
      } else {
        setEmail(storedEmail);
        try {
          const response = await fetch(`/api/searchUser?email=${storedEmail}`);
          const data = await response.json();
          if (data.success) {
            setName(data.name);
            setadmin(data.admin);
          } else {
            console.error(data.error);
          }
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      }
    };

    fetchUser();
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  }

  return (
    <div className="text-sky-400">
      <nav class="fixed py-6 w-full bg-black z-50">
        <div class="container flex items-center justify-between mx-auto px-8 md:px-14 lg:px-20 w-full">

          <div className='flex flex-row space-x-1'>
            <div className="text-lg font-semibold">Welcome to IRCTC,</div>
            <div class="text-lg font-semibold text-gray-200 hover:text-white underline-offset-2 underline decoration-sky-400">
              {name}</div>
          </div>

          <div class="hidden md:flex space-x-12 items-center text-gray-400">
            <button onClick={logout}
              class="p-2 px-4 text-lg rounded-sm text-white font-bold transition delay-150 bg-red-500  hover:bg-red-600 duration-300">Logout</button>
          </div>
        </div>
      </nav>

      {email === "kalashvasaniya@gmail.com" ? (
        <div className="pt-24">
          <div className="">
            <div className="text-xl font-semibold text-center font-mono">Admin Panel</div>
            <div className="text-lg font-semibold text-center font-mono">You are an admin</div>
          </div>
        </div>
      ) : (
        <div className="pt-24">
          <div className="text-xl font-semibold text-center font-mono">User Panel</div>
        </div>
      )}
    </div>
  );
}
