import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const inputclass = "w-full border-0 outline-none bg-transparent text-lg  placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-1.5 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow";

const MessagesInput = () => {
    return (
        <div className="flex items-center px-3 bg-gray-200 min-h-14 h-14 w-full min-w-[350px]">

            <div className='w-full flex border border-gray-400 rounded-md bg-white'>
                <input className={inputclass} placeholder="message from here" />
                <button className='outline-none   w-12'><FontAwesomeIcon icon={faPaperPlane} /></button>
            </div>

        </div>

    )
}

export default MessagesInput
