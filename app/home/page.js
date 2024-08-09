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

  return (
    <div className="text-pink-500">
      IRCTC done
      <p>Email: {email}</p>
      <p>Name: {name}</p>
    </div>
  );
}
