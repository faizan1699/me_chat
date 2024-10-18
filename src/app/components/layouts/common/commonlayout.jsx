"use client";

import React, { createContext, useEffect, useState } from 'react';
import Navbar from '../../headers/navbar';

export const islogincontext = createContext();

const CommonLayout = ({ children }) => {
    const [islogin, setIsLogin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const isLogged = JSON.parse(localStorage.getItem("islogedin"));
        setIsLogin(isLogged);
        setLoading(false);
    }, []);

    useEffect(() => {
        const isLogged = JSON.parse(localStorage.getItem("islogedin"));
        setIsLogin(isLogged);
        setLoading(false);
    }, [islogin]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <islogincontext.Provider value={{ islogin, setIsLogin }}>

            {!islogin && <Navbar />}

            <div>{children}</div>
            
        </islogincontext.Provider>
    );
}

export default CommonLayout;
