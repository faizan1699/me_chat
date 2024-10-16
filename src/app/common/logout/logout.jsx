
"use client"

import React, { useContext } from 'react'
import { showAlert } from '@/app/components/alert/alert';
import { islogincontext } from '@/app/components/layouts/common/commonlayout';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const Logout = () => {

    const router = useRouter();

    const { islogin, setIsLogin } = useContext(islogincontext);

    const handleLogout = async () => {
        try {
            const res = await axios.post("/api/users/auth/logout");
            localStorage.removeItem("islogedin");
            router.push("/login");
            setIsLogin(false);
            showAlert("success", "Logout", res?.data?.message, 5000);
        }
        catch (error) {
            showAlert("error", "logout error", error?.response?.data?.message, 5000)
        }
    }

    return (
        <>
            <button onClick={handleLogout} className="rounded-md bg-red-600 hover:bg-red-500 px-4 py-2 w-full leading-none text-white">Logout</button>
        </>
    )
}

export default Logout
