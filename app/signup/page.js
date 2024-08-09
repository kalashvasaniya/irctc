"use client"
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signupMessage, setSignupMessage] = useState('');

    useEffect(() => {
        if (localStorage.getItem('token')) {
            window.location.href = '/Home';
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`/api/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            if (!res.ok) {
                throw new Error('Network response was not ok');
            }

            const json = await res.json();
            console.log('Response JSON:', json);

            if (json.success) {
                setSignupMessage('Check your inbox to verify your email');
                setName('');
                setEmail('');
                setPassword('');
                setTimeout(() => {
                    window.location.href = '/';
                }, 2000);
            } else {
                setSignupMessage('Check your inbox to verify your email');
                setName('');
                setEmail('');
                setPassword('');
                setTimeout(() => {
                    window.location.href = '/';
                }, 2000);
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };


    const handleChange = (e) => {
        const { name, value } = e.target
        if (name === 'name') {
            setName(value);
        } else if (name === 'email') {
            setEmail(value)
        } else if (name === 'password') {
            setPassword(value)
        }

    }

    return (
        <>
            <div className="">
                <div className="md:block hidden">
                </div>
                <section className="bg-black pt-24 h-screen">
                    <div className="flex flex-col items-center justify-center px-6 mx-auto mt-20">
                        <button className="flex flex-col items-center pb-5">
                            <span className="self-center text-4xl font-bold text-sky-400">REGISTER</span>
                        </button>
                        {signupMessage && (
                            <p className="text-green-400 md:text-xl text-lg font-bold underline underline-offset-1">{signupMessage}</p>
                        )}
                        <form onSubmit={handleSubmit} className="w-full sm:max-w-md p-8">

                            <div className="relative z-0 w-full mb-6 group">
                                <div className="relative z-0 w-full mb-6 group">
                                    <input value={name} onChange={handleChange} type="text" name="name" id="name"
                                        className="lowercase block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-sky-400 peer"
                                        placeholder=" " minLength={3} maxLength={12}
                                        required />
                                    <label htmlFor="name"
                                        className="peer-focus:font-medium absolute text-sm text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-sky-400  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 truncate">Name</label>
                                </div>
                            </div>

                            <div className="relative z-0 w-full mb-6 group">
                                <input value={email} onChange={handleChange} type="email" name="email" id="email"
                                    className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-sky-400  peer"
                                    placeholder=" "
                                    required />
                                <label
                                    htmlFor="email"
                                    className="peer-focus:font-medium absolute text-sm text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-sky-400  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                            </div>

                            <div className="relative z-0 w-full mb-6 group">
                                <input value={password} onChange={handleChange} type="password" name="password" id="password"
                                    className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-sky-400  peer"
                                    placeholder=" " minLength={5}
                                    required />
                                <label
                                    htmlFor="password"
                                    className="peer-focus:font-medium absolute text-sm text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-sky-400  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                            </div>

                            <div className="flex flex-col w-full">
                                <button style={{ backgroundColor: '#00B2FF' }}
                                    type="submit"
                                    className="text-white mt-3 bg-sky-400 hover:bg-sky-500 focus:ring-4 focus:outline-none focus:ring-sky-400  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center hover:scale-105 transition ease-in-out delay-150 duration-300">
                                    Sign Up
                                </button>
                            </div>
                        </form>
                    </div>
                </section >
            </div >

        </>
    )
}

export default Signup
