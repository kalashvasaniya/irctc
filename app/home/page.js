"use client";
import { useEffect, useState } from 'react';

export default function Home() {
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            window.location.href = '/';
        } else {
            const storedEmail = localStorage.getItem('token');
            setEmail(storedEmail || 'No email found');
        }
    }, []);

    return (
        <div className="text-pink-500">
            IRCTC done
            <p>Email: {email}</p>
        </div>
    );
}
