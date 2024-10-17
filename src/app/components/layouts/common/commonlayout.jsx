"use client";

import React, { createContext, useEffect, useState } from 'react';
import Navbar from '../../headers/navbar';

export const islogincontext = createContext();

const CommonLayout = ({ children }) => {

    const [islogin, setIsLogin] = useState(false);

    useEffect(() => {
        try {
            const isLogged = JSON.parse(localStorage.getItem("islogedin"));
            setIsLogin(isLogged);
        } catch (error) {
            console.error("Failed to parse login status:", error);
            setIsLogin(false);
        }

    }, []);

    return (
        <div>
            <islogincontext.Provider value={{ islogin, setIsLogin }}>

                {(islogin === false || islogin === null || islogin === undefined) && <Navbar />}
                <div>{children}</div>

            </islogincontext.Provider>
        </div >
    );
}

export default CommonLayout;
