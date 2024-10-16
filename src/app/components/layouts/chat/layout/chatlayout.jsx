
import React from 'react';

import ChatNav from '../components/chat_nav/nav'
import Chats from '../components/chat_users/chats'

const ChatLayout = () => {

    return (

        <div className='flex'>
            <ChatNav />
            <Chats />
        </div>

    )

}

export default ChatLayout
