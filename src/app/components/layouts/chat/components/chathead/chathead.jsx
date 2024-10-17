import React, { useContext } from 'react'
import { chatTypeContext } from '../../layout/chatlayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { faMagento } from '@fortawesome/free-brands-svg-icons';

const ChatHead = () => {

    const { chattype } = useContext(chatTypeContext);

    const handleAddChat = () => {
        console.log("add");
    }
    const handleCreateGroup = () => {
        console.log("addد");
    }

    return (
        <div className='py-3'>
            <span className='flex justify-between text-2xl font-bold'>{chattype === 1 ? "Chats" : "Groups"}
                <span>
                    <button className='text-[18px]' onClick={chattype === 1 ? handleAddChat : handleCreateGroup}>
                        <FontAwesomeIcon className='hover:text-red-500' icon={chattype === 1 ? faAdd : faMagento} />
                    </button>
                </span>
            </span>

            

        </div>
    )
}

export default ChatHead
