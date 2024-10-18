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

const ChatNav = () => {

  const { setChatType } = useContext(chatTypeContext);
  const [openmenu, seTopenMenu] = useState(false);

  const handleToggleMenu = () => {
    seTopenMenu(!openmenu);
  }

  return (

    <aside className="flex">

      <div className="flex justify-between flex-col items-center w-14 h-screen py-8 space-y-8 bg-gray-50 border-r-2">

        <div className=''>
          <div className="flex justify-center">
            <Link href="/">
              <Image
                width={40}
                height={40}
                className="w-auto"
                src={logo}
                alt="logo" />
            </Link>
          </div>

          <div className="mt-[50px] border-t-2 border-red-200">

            <p onClick={() => setChatType(1)} className='text-1xl mt-4 text-center hover:text-white mt-2xl hover:bg-gray-400 p-2 rounded  bg-gray-300'>
              <FontAwesomeIcon icon={faMessage} />
            </p>

            <p onClick={() => setChatType(2)} className='text-1xl mt-4 text-center hover:text-white mt-2xl hover:bg-gray-400 p-2 rounded  bg-gray-300'>
              <FontAwesomeIcon icon={faUserGroup} />
            </p>
          </div>

        </div>

        <div className="relative">
          <div onClick={handleToggleMenu}>
            <span className="absolute -inset-1.5"></span>
            <span className="sr-only">Open user menu</span>
            <Image
              width={50}
              height={50}
              className="h-8 w-8 rounded-full"
              src={dummy}
              alt="img"
            />
          </div>

          {openmenu && (
            <div className="absolute mb-4 bottom-full z-10 w-48 rounded-md bg-white py-1 px-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
              <Link href="/profile" onClick={handleToggleMenu} className="block px-4 py-2 text-sm text-gray-700">Your Profile</Link>
              <Logout />
            </div>
          )}
        </div>

      </div>


    </aside>

  )
}

export default ChatNav
