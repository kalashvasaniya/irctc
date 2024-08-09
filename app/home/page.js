"use client"
import { useEffect, useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const [trains, setTrains] = useState([]);

  useEffect(() => {
    fetchUser();
    fetchTrain();
  }, []);

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
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    }
  };

  const fetchTrain = async () => {
    try {
      const response = await fetch('/api/train');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Received data:", data);

      if (data && data.length > 0) {
        setTrains(data);
      } else {
        console.error("No train data available");
      }
    } catch (error) {
      console.error('Error fetching train data:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <div className="text-sky-400">
      <nav className="fixed py-6 w-full bg-black z-50">
        <div className="container flex items-center justify-between mx-auto px-8 md:px-14 lg:px-20 w-full">
          <div className='flex flex-row space-x-2'>
            <div className="text-lg font-semibold">Welcome to IRCTC,</div>
            <div className="text-lg font-semibold text-gray-200 hover:text-white underline-offset-2 underline decoration-sky-400">
              {name}
            </div>
            {email === "kalashvasaniya@gmail.com" && (
              <div className="text-base font-semibold text-center font-mono px-10 text-red-500">Admin Panel</div>
            )}
          </div>

          <div className="hidden md:flex space-x-12 items-center text-gray-400">
            <button onClick={logout}
              className="p-2 px-4 text-lg rounded-sm text-white font-bold transition delay-150 bg-red-500 hover:bg-red-600 duration-300">Logout</button>
          </div>
        </div>
      </nav>

      {email === "kalashvasaniya@gmail.com" ? (
        <div className="pt-24">
          <div className=""> {/* Admin Panel Content */}</div>
        </div>
      ) : (
        <div className="pt-24">
          {trains.length > 0 ? (
            trains.map((train, index) => (
              <div key={index} className="mb-4">
                <div>Source: {train.source || 'N/A'}</div>
                <div>Destination: {train.destination || 'N/A'}</div>
                <div>Number of Trains: {train.num_of_trains || 'N/A'}</div>
                <div>Number of Seats: {train.num_of_seats || 'N/A'}</div>
                <div>Departure Time: {train.departure_time || 'N/A'}</div>
                <div>Arrival Time: {train.arrival_time || 'N/A'}</div>
                <div>Train Number: {train.train_number || 'N/A'}</div>
                <div>Train Type: {train.train_type || 'N/A'}</div>
                <div>Status: {train.status || 'N/A'}</div>
              </div>
            ))
          ) : (
            <div>No trains available</div>
          )}
        </div>
      )}
    </div>
  );
}
