
import React, { Children, useContext } from 'react'

import { chatTypeContext } from '../../layout/chatlayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { faMagento } from '@fortawesome/free-brands-svg-icons';
import { isModalContext } from '../../../common/commonlayout';

import FindUser from './modal_page/finduserinput';
import Modal from '@/app/common/modal/modal';
import MbNav from '../chat_nav/mbnav';

const ChatHead = () => {

    const { chattype } = useContext(chatTypeContext);
    const { isOpen, setIsOpen } = useContext(isModalContext);


    const handleAddChat = () => {
        setIsOpen(true);
    }
    const handleCreateGroup = () => {
        console.log("addد");
    }

    return (
        <>
            <Modal title="Search your chats users " ><FindUser /></Modal>
            <div className='py-3'>
                <span className='flex justify-between text-2xl font-bold'>{chattype === 1 ? "Chats" : "Groups"}
                    <span>
                        <button className='text-[18px]' onClick={chattype === 1 ? handleAddChat : handleCreateGroup}>
                            <FontAwesomeIcon className='hover:text-red-500' icon={chattype === 1 ? faAdd : faMagento} />
                        </button>
                    </span>
                </span>

                <div className="w-full max-w-sm min-w-[250px] mt-3">
                    <input className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-1.5 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="search user from here..." />
                </div>

                <div className='d-none-lg mt-2'><MbNav /></div>
            </div>
        </>
    )
}

export default ChatHead
