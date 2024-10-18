"use client"

import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useState } from 'react';

import logo from "@/app/assets/logo/logo.png";
import dummy from "@/app/assets/imgs/dummy.png";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Logout from '@/app/common/logout/logout';
import { faMessage } from '@fortawesome/free-regular-svg-icons';
import { faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { chatTypeContext } from '../../layout/chatlayout';

const listItemclass = "text-1xl text-center hover:text-white mt-2xl font-bold hover:bg-gray-400 px-1 rounded";

const MbNav = () => {

    const { setChatType } = useContext(chatTypeContext);
    const [openmenu, seTopenMenu] = useState(false);

    const handleToggleMenu = () => {
        seTopenMenu(!openmenu);
    }

    return (



        <div className="flex justify-between items-center w-full bg-gray-50 ">

            <p onClick={() => setChatType(1)} className='text-1xl text-center hover:text-white mt-2xl font-bold hover:bg-gray-400 px-1 rounded'>
                Chats
            </p>
            <p onClick={() => setChatType(2)} className={listItemclass}>
                Groups
            </p>

            <div className="relative">
                <div onClick={handleToggleMenu}>
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">Open user menu</span>
                    <Image
                        width={50}
                        height={50}
                        className="h-8 w-8 rounded"
                        src={dummy}
                        alt="img"
                    />
                </div>

                {openmenu && (
                    <div className="absolute right-0 transform z-10  block bg-white rounded-md shadow-lg p-2" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
                        <Link href="/profile" onClick={handleToggleMenu} className="block py-1 px-2 rounded-lg mb-2 text-sm bg-gray-200 ">Your Profile</Link>
                        <Logout w="24" />
                    </div>
                )}
            </div>

        </div>

    )
}

export default MbNav
