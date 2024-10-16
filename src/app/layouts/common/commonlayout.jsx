"use client";

import React, { createContext, useEffect, useState } from 'react';

import Main from '../main/main';
import Chatlayout from '../chat/chatlayout';

export const islogincontext = createContext();

const CommonLayout = ({ children }) => {

    const [islogin, setIsLogin] = useState(false);

    let logedin;
    useEffect(() => {
        logedin = localStorage.getItem("islogedin");
        console.log(logedin)
        setIsLogin(logedin);
    }, [])

    useEffect(() => {
        logedin = localStorage.getItem("islogedin");
        console.log(logedin)
        setIsLogin(logedin);
    }, [islogin])

    return (
        <div>
            <islogincontext.Provider value={{ islogin, setIsLogin }}>
                {islogin === false || islogin === null || islogin === undefined ?
                    (
                        <Main children={children} />
                    )
                    : (
                        <Chatlayout children={children} />
                    )}
            </islogincontext.Provider>
        </div>
    )
}

export default CommonLayout
