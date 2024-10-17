import Image from 'next/image';
import React from 'react';

const Chats = () => {
    return (
        <>
            <div className="h-screen py-8 overflow-y-auto bg-white border-l border-r sm:w-64 w-60 dark:bg-gray-900 dark:border-gray-700">
                <h2 className="px-5 text-lg font-medium text-gray-800 dark:text-white">Accounts</h2>

                <div className="mt-8 space-y-4">
                    <button className="flex items-center w-full px-5 py-2 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 gap-x-2 focus:outline-none">
                        <div className="relative">
                            <Image width={50} height={50} className="object-cover w-8 h-8 rounded-full" src="" alt="image" />
                            <span className="h-2 w-2 rounded-full bg-emerald-500 absolute right-0.5 ring-1 ring-white bottom-0"></span>
                        </div>

                        <div className="text-left rtl:text-right">
                            <h1 className="text-sm font-medium text-gray-700 capitalize dark:text-white">Junior REIS</h1>

                            <p className="text-xs text-gray-500 dark:text-gray-400">56.6 Followers</p>
                        </div>
                    </button>
                </div>

            </div>
        </>
    )
}

export default Chats
