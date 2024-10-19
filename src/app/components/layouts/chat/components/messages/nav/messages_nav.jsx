"use client";

import Link from 'next/link';
import React, { useContext, useState } from 'react';

import dummy from "../../../../../../assets/imgs/dummy.png"
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';


const MessageNav = () => {

    return (

        <nav className={`bg-gray-100 min-w-[360px] `}>
            <div className="mx-auto px-2 sm:px-3 lg:px-8">
                <div className="relative flex h-14 items-center justify-between">


                    <div className="flex items-center justify-center justify-start">


                        <div className="flex-shrink-0">
                            <Image width={70} height={70} className="w-12 h-12 rounded-full" src={dummy} alt="Neil image" />
                        </div>
                        <div className="flex-1 min-w-0 ms-4 ">
                            <p className="text-lg font-medium">
                                chats
                            </p>
                            <p className="text-sm font-medium">
                                email@windster.com
                            </p>
                        </div>

                    </div>
                    <div className="absolute right-0 flex items-center">
                        <FontAwesomeIcon className='text-2xl' icon={faEllipsisV} />
                    </div>
                </div>
            </div>

        </nav >


    )
}

export default MessageNav
