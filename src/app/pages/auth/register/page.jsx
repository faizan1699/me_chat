"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { showAlert } from '@/app/components/alert/alert';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Register = () => {

    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: "",
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        })
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post("/api/users/auth/register", inputs);
            showAlert('success', 'Account Created', response?.data?.message, 4000);
            router.push("/login")
        }
        catch (error) {
            console.log(error)
            showAlert('error', 'Error', error?.response?.data?.message, 4000);
        }
        finally {
            setLoading(false);
        }
    }

    return (

        <div className="flex items-center justify-center h-screen shadow-lg">
            <div className="mx-auto max-w-md w-full py-6 px-8 bg-zinc-100 hover:bg-zinc-200 rounded shadow-xl">
                <h3 className='text-3xl font-black text-gray-600 text-center mb-6'>Register</h3>
                <form onSubmit={handleRegister} method="post" autoComplete='off'>
                    <div className='mb-6'>
                        <label htmlFor="email" className="block text-gray-800 font-bold">User name:</label>
                        <input
                            type="text"
                            name="username"
                            value={inputs.username}
                            onChange={handleInputChange}
                            placeholder="John Doe : "
                            className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600"
                            autoComplete='username'
                        />
                    </div>
                    <div className='mb-6'>
                        <label htmlFor="email" className="block text-gray-800 font-bold">Email:</label>
                        <input
                            type="text"
                            name="email"
                            value={inputs.email}
                            onChange={handleInputChange}
                            placeholder="Enter your email : "
                            className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600"
                            autoComplete='email'
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-800 font-bold">Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={inputs.password}
                            onChange={handleInputChange}
                            placeholder="Enter your password here : "
                            className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600"
                            autoComplete="current-password"
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
