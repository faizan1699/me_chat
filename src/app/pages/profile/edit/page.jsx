"use client"

import React, { useContext, useEffect, useState } from 'react'
import { isMeContext } from '@/app/components/layouts/common/commonlayout';
import { showAlert } from '@/app/components/alert/alert';
import { useRouter } from 'next/navigation';

import Prevpage from '@/app/common/prevpage/prevpage'
import dummy from "../../../assets/imgs/dummy.png";
import Image from 'next/image';
import axios from 'axios';

const inputclass = "bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5";

const EditProfile = () => {

    const router = useRouter();
    const { me } = useContext(isMeContext);

    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState({
        username: me?.username || "",
        newemail: me?.email || "",
        bio: me?.bio || "",
    });

    useEffect(() => {
        if (me) {
            setInput({
                username: me?.username || "",
                avatar: me?.avatar || "",
                email: me?.email || "",
                bio: me?.bio || "",
            })
        }

    }, [me])

    const handleInputchange = (e) => {
        const { name, value } = e.target;

        setInput({
            ...input,
            [name]: value
        })

    }
    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log("aaa")
        try {

            const api = await axios.post("/api/users/profile/update", input);
            showAlert("success", "profile updated", api?.data?.message, 8000);
            localStorage.setItem("islogedin", JSON.stringify(false));
            router.push("/login");
        } catch (error) {
            showAlert("error", "something went wrong", error?.response?.data?.message, 5000);
        } finally {
            setLoading(false);
        }

    }

    return (
        <>
            <Prevpage />

            <div className="flex justify-center">
                <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
                    <h2 className="text-center text-3xl text-gray-400 font-bold">Edit profile</h2>

                    <div className="grid max-w-2xl mx-auto mt-8">
                        <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">

                            <Image className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                                src={me?.avatar ? me?.avatar : dummy}
                                alt="user avatar"
                                priority
                            />

                            <div className="flex flex-col space-y-5 sm:ml-8 w-full">
                                <button type="button"
                                    className="py-3.5 px-7 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200 ">
                                    Change picture
                                </button>
                                <button type="button"
                                    className="py-3.5 px-7 text-base font-medium text-indigo-900 focus:outline-none bg-white rounded-lg border border-indigo-200 hover:bg-indigo-100 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-indigo-200 ">
                                    Delete picture
                                </button>
                            </div>
                        </div>

                        <div className="items-center mt-8 sm:mt-14 text-[#202142]">
                            <form method="POST" onSubmit={handleUpdateProfile}>

                                <div className="w-fu">
                                    <label htmlFor="username"
                                        className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">
                                        username : </label>
                                    <input
                                        type="text"
                                        name="username"
                                        value={input.username || ""}
                                        className={inputclass}
                                        onChange={handleInputchange}
                                        placeholder="Your first name"
                                    />
                                </div>
                                <div className="w-fu">
                                    <label htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">
                                        email : </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={input.email || ""}
                                        className={inputclass}
                                        onChange={handleInputchange}
                                        placeholder="me@mail.com"
                                    />
                                </div>
                                <div className="w-fu">
                                    <label htmlFor="bio"
                                        className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">
                                        username : </label>
                                    <input
                                        type="text"
                                        name="bio"
                                        value={input.bio || ""}
                                        className={inputclass}
                                        onChange={handleInputchange}
                                        placeholder="i am ...."
                                    />
                                </div>


                                <div className="w-full mt-4">
                                    <button type="submit"
                                        className="text-white bg-indigo-700  hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">
                                        Update profile  {loading ? "...." : ""}
                                    </button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default EditProfile
