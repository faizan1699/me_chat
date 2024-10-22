"use client";

import React, { createContext, useEffect, useState } from 'react';
import Navbar from '../../headers/navbar';
import axios from 'axios';

export const islogincontext = createContext();
export const isModalContext = createContext();
export const isMeContext = createContext();

const CommonLayout = ({ children }) => {
    const [islogin, setIsLogin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [me, setMe] = useState(null);

    useEffect(() => {
        const isLogged = JSON.parse(localStorage.getItem("islogedin"));
        setIsLogin(isLogged);
        setLoading(false);
    }, []);

    useEffect(() => {
        if (loading) return; // Avoid fetching user data while loading
        if (!me) {
            getUserdata();
        }
    }, [loading, me]);

    const getUserdata = async () => {
        try {
            const api = await axios.get("/api/users/profile/me");
            console.log("from common", api?.data?.me);
            setMe(api?.data?.me);
        } catch (error) {
            console.log(error?.response?.data?.message);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <islogincontext.Provider value={{ islogin, setIsLogin }}>
            <isModalContext.Provider value={{ isOpen, setIsOpen }}>
                <isMeContext.Provider value={{ me, setMe }}>
                    <div id='app_body'>
                        {!islogin && <Navbar />}
                        <div>{children}</div>
                    </div>
                </isMeContext.Provider>
            </isModalContext.Provider>
        </islogincontext.Provider>
    );
};

export default CommonLayout;
