import React from 'react';

const inputclass = "w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-1.5 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow";

const MessagesInput = () => {
    return (
        <div className="w-full max-w-sm min-w-[250px]">
            <input className={inputclass} placeholder="search user from here..." />
        </div>

    )
}

export default MessagesInput
