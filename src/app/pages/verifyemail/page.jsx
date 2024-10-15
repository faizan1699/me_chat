"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import axios from 'axios';
import Link from 'next/link';

import Image from 'next/image';
import { showAlert } from '@/app/components/alert/alert';

const EmailVerify = () => {

    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        verifyEmail();
    }, []);
    const verifyEmail = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (token) {
            setLoading(true);
            try {
                const response = await axios.post('/api/users/email/verify', { token: token });
                setMessage(response.data.message);
                router.push("/login");
                setLoading(false);
            } catch (error) {
                setMessage(error.response?.data?.message);
                setLoading(false);
            }
        } else {
            showAlert("info", "invalid link", 'Invalid verification link', 5000);
            setLoading(false);
        }
    };
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold mb-4 text-center">Email Verification</h2>
                <div className="flex justify-center">
                    {loading ?
                        (<h1>Loading</h1>)
                        : (<p className="text-center text-gray-700">{message}</p>)
                    }
                </div>
                <p className='text-center' style={{ fontSize: 12 }}><Link href="/login" className='text-red-500'>GO TO LOGIN PAGE</Link> </p>
            </div>
        </div>
    );
};

export default EmailVerify;