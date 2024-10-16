"use client";

import React, { createContext, useEffect, useState } from 'react';
import Main from '../main/main';
import Chat from '@/app/pages/chat/page';

export const islogincontext = createContext();

const CommonLayout = ({ children }) => {
    const [islogin, setIsLogin] = useState(null);

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
                {islogin === null && <div>Loading...</div>}
                {islogin === false && <Main>{children}</Main>}
                {islogin === true && <Chat>{children}</Chat>}
            </islogincontext.Provider>
        </div>
    );
}

export default CommonLayout;
