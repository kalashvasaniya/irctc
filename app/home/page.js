"use client"
import { useEffect, useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const [trains, setTrains] = useState([]);

  const [formData, setFormData] = useState({
    source: '',
    destination: '',
    num_of_trains: '',
    num_of_seats: '',
    departure_time: '',
    arrival_time: '',
    train_number: '',
    train_type: '',
    status: ''
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/train', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Train added successfully:', data);
        setFormData({
          source: '',
          destination: '',
          num_of_trains: '',
          num_of_seats: '',
          departure_time: '',
          arrival_time: '',
          train_number: '',
          train_type: '',
          status: ''
        });
      } else {
        console.error('Failed to add train');
      }
    } catch (err) {
      console.error('Error submitting form:', err);
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
          <div>
            <div className="text-2xl font-semibold text-center">Add Train</div>
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
              <input type="text" name="source" placeholder="Source" value={formData.source} onChange={handleChange} className="p-2 px-4 mt-4 w-96 border border-gray-300 rounded-sm" required />
              <input type="text" name="destination" placeholder="Destination" value={formData.destination} onChange={handleChange} className="p-2 px-4 mt-4 w-96 border border-gray-300 rounded-sm" required />
              <input type="number" name="num_of_trains" placeholder="Number of Trains" value={formData.num_of_trains} onChange={handleChange} className="p-2 px-4 mt-4 w-96 border border-gray-300 rounded-sm" required />
              <input type="number" name="num_of_seats" placeholder="Number of Seats" value={formData.num_of_seats} onChange={handleChange} className="p-2 px-4 mt-4 w-96 border border-gray-300 rounded-sm" required />
              <input type="time" name="departure_time" placeholder="Departure Time" value={formData.departure_time} onChange={handleChange} className="p-2 px-4 mt-4 w-96 border border-gray-300 rounded-sm" required />
              <input type="time" name="arrival_time" placeholder="Arrival Time" value={formData.arrival_time} onChange={handleChange} className="p-2 px-4 mt-4 w-96 border border-gray-300 rounded-sm" required />
              <input type="text" name="train_number" placeholder="Train Number" value={formData.train_number} onChange={handleChange} className="p-2 px-4 mt-4 w-96 border border-gray-300 rounded-sm" required />
              <input type="text" name="train_type" placeholder="Train Type" value={formData.train_type} onChange={handleChange} className="p-2 px-4 mt-4 w-96 border border-gray-300 rounded-sm" required />
              <input type="text" name="status" placeholder="Status" value={formData.status} onChange={handleChange} className="p-2 px-4 mt-4 w-96 border border-gray-300 rounded-sm" required />
              <button type="submit" className="p-2 px-4 mt-4 w-96 text-lg rounded-sm text-white font-bold transition delay-150 bg-sky-400 hover:bg-sky-500 duration-300">Add Train</button>
            </form>
          </div>
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
    </div >
  );
}
