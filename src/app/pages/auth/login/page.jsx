"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const Login = () => {

    const [loading, setLoading] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        console.log(e.pageX);
    }

    return (

        <div className="flex items-center justify-center h-screen shadow-lg">
            <div className="mx-auto max-w-md w-full py-6 px-8 bg-zinc-100 hover:bg-zinc-200 rounded shadow-xl">
                <h3 className='text-3xl font-black text-gray-300 text-center mb-6'>Login</h3>
                <form onClick={handleLogin} method="post">
                    <div className='mb-6'>
                        <label htmlFor="email" className="block text-gray-800 font-bold">Email:</label>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            placeholder="Enter your email : "
                            className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-800 font-bold">Password:</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password here : "
                            className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600"
                        />
                        <span className="flex justify-end">
                            <Link href="/" className="text-sm font-thin text-gray-800 hover:underline mt-2 inline-block hover:text-indigo-600">Forget Password</Link>
                        </span>
                    </div>
                    <button type="submit" className="cursor-pointer py-2 px-4 block mt-6 bg-indigo-500 text-white font-bold w-full text-center rounded">
                        Continue {loading ? "...." : ""}
                    </button>
                </form>
                <span className="flex justify-center">
                    <Link href="/register" className="text-center font-black text-sm font-thin text-gray-800 hover:underline mt-4 inline-block hover:text-indigo-600">Not have account ? create one</Link>
                </span>
            </div>
        </div>

    )
}

export default Login
