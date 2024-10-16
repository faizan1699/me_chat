"use client";

import React, { createContext, useEffect, useState } from 'react';

import Main from '../main/main';
import Chat from '@/app/pages/chat/page';

export const islogincontext = createContext();

const CommonLayout = ({ children }) => {

    const [islogin, setIsLogin] = useState(false);

    return (
        <div>
            <islogincontext.Provider value={{ islogin, setIsLogin }}>
                {islogin === false && (<Main children={children} />)}
                {islogin === true && (<Chat children={children} />)}
            </islogincontext.Provider>
        </div>
    )
}

export default CommonLayout
