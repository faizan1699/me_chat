"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { showAlert } from '@/app/components/alert/alert';
import axios from 'axios';
import { ResendUserVerificationEmail } from '@/app/services/api/auth/resend_email/resendemail';


const Login = () => {

    const [loading, setLoading] = useState(false);
    const [emailloading, setEmailLoading] = useState(false);
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    })

    const handleInputChange = (e) => {

        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        })

    }

    const handleLogin = async (e) => {

        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post("/api/users/auth/login", inputs);
            showAlert('success', 'Account Created', response?.data?.message, 4000);
            // router.push("/");
        }
        catch (error) {
            console.log(error)
            if (error.response.status == 310) {
                showAlert('info', 'Unverified', error?.response?.data?.message, 4000);
            } else {
                showAlert('error', 'Error', error?.response?.data?.message, 4000);
            }
        }
        finally {
            setLoading(false);
        }
    }

    const forget_password = () => {
        router.push("forgetpassword");
    }

    const handleResendEmail = async () => {

        const { email } = inputs;
        setEmailLoading(true);
        
        try {
            const response = await axios.post("/api/users/email/resend_verifiy_user", email);
            showAlert("success", "Mail sent", response?.data?.message);
        } catch (error) {
            showAlert("error", "Mail not send", error?.response?.data?.message);
        } finally {
            setEmailLoading(false);
        }
    }

    return (

        <div className="flex items-center justify-center h-screen shadow-lg">
            <div className="mx-auto max-w-md w-full py-6 px-8 bg-zinc-100 hover:bg-zinc-200 rounded shadow-xl">
                <h3 className='text-3xl font-black text-gray-600 text-center mb-6'>Login</h3>
                <form onSubmit={handleLogin} method="post">
                    <div className='mb-6'>
                        <label htmlFor="email" className="block text-gray-800 font-bold">Email:</label>
                        <input
                            type="email"
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
                            autoComplete='current-password'
                        />
                        <span className="flex justify-end">
                            <p className="text-sm font-thin text-gray-800 hover:underline mt-2 inline-block hover:text-indigo-600" onClick={forget_password} >Forget Password</p>
                        </span>
                    </div>
                    <button type="submit" className="cursor-pointer py-2 px-4 block mt-6 bg-indigo-500 text-white font-bold w-full text-center rounded">
                        Continue {loading ? "...." : ""}
                    </button>
                </form>
                <div onClick={handleResendEmail}>
                    <button type="submit" className="cursor-pointer py-2 px-4 block mt-6 bg-indigo-700 text-white font-bold w-full text-center rounded">
                        Resend Email Verification {emailloading ? "...." : ""}
                    </button>
                </div>

                <span className="flex justify-center">
                    <Link href="/register" className="text-center font-black text-sm font-thin text-gray-800 hover:underline mt-4 inline-block hover:text-indigo-600">Not have account ? create one</Link>
                </span>
            </div>
        </div>

    )
}

export default Login
