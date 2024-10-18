
import React, { useContext } from 'react';
import MyChats from './single_chats/chats';
import GroupChat from './group_chats/groupchat';
import { chatTypeContext } from '../../layout/chatlayout';
import ChatHead from '../chathead/chathead';

const Chats = () => {

    const { chattype, setChatType } = useContext(chatTypeContext);

    return (
        <div className='w-full max-w-[360px] px-2 border-r-2 h-screen'>
            <ChatHead />
            {chattype === 1 && <MyChats />}
            {chattype === 2 && <GroupChat />}
        </div>
    )
}

export default Chats
