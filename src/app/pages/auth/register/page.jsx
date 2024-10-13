"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const Register = () => {

    const [loading, setLoading] = useState(false);

    const handleRegister = (e) => {
        e.preventDefault();
        console.log(e.pageX);
    }

    return (

        <div className="flex items-center justify-center h-screen shadow-lg">
            <div className="mx-auto max-w-md w-full py-6 px-8 bg-zinc-100 hover:bg-zinc-200 rounded shadow-xl">
                <h3 className='text-3xl font-black text-gray-600 text-center mb-6'>Register</h3>
                <form onClick={handleRegister} method="post" autoComplete='off'>
                    <div className='mb-6'>
                        <label htmlFor="email" className="block text-gray-800 font-bold">User name:</label>
                        <input
                            type="text"
                            name="username"
                            placeholder="John Doe : "
                            className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600"
                            autoComplete='new-username'
                        />
                    </div>
                    <div className='mb-6'>
                        <label htmlFor="email" className="block text-gray-800 font-bold">Email:</label>
                        <input
                            type="text"
                            name="email"
                            placeholder="Enter your email : "
                            className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600"
                            autoComplete='new-email'
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-800 font-bold">Password:</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password here : "
                            className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600"
                            autoComplete='new-password'
                        />
                    </div>
                    <button type="submit" className="cursor-pointer py-2 px-4 block mt-6 bg-indigo-500 text-white font-bold w-full text-center rounded">
                        Continue {loading ? "...." : ""}
                    </button>
                </form>
                <span className="flex justify-center">
                    <Link href="/login" className="text-center font-black text-sm font-thin text-gray-800 hover:underline mt-4 inline-block hover:text-indigo-600">Use existing account</Link>
                </span>
            </div>
        </div>

    )
}

export default Register
