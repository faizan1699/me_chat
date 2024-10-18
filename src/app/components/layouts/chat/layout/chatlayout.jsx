"use client";

import React, { createContext, useState } from 'react';

import ChatNav from '../components/chat_nav/nav'
import Chats from '../components/chats/chats'
import Messages from '../components/messages/messages';

export const chatTypeContext = createContext();

const ChatLayout = () => {

    const [chattype, setChatType] = useState(1);

    return (

        <chatTypeContext.Provider value={{ chattype, setChatType }}>

            <div className='flex'>
                <div className='d-none-mb'><ChatNav /></div>
                <Chats />
                <Messages />
            </div>

        </chatTypeContext.Provider>

    )

}

export default ChatLayout
