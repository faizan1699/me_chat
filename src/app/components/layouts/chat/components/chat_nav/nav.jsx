"use client"

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

import logo from "@/app/assets/logo/logo.png"

import { islogincontext } from '../../../common/commonlayout';
import Logout from '@/app/common/logout/logout';

const ChatNav = () => {


  const [openmenu, seTopenMenu] = useState(false);

  const handleToggleMenu = () => {
    seTopenMenu(!openmenu);
  }

  return (
    <div>
      <aside className="flex">
        <div className="flex justify-between flex-col items-center w-16 h-screen py-8 space-y-8 bg-white dark:bg-gray-900 dark:border-gray-700">
          <div>
            <Link href="/">
              <Image
                width={50}
                height={50}
                className="w-auto h-6"
                src={logo}
                alt="logo" />
            </Link>

            <a href="/" className="p-1.5 text-gray-500 focus:outline-nones transition-colors duration-200 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800 hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
            </a>

          </div>
          <div className="relative">
            <div onClick={handleToggleMenu}>
              <span className="absolute -inset-1.5"></span>
              <span className="sr-only">Open user menu</span>
              <img
                className="h-8 w-8 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </div>

            {openmenu && (
              <div className="absolute mb-4 bottom-full z-10 w-48 rounded-md bg-white py-1 px-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
                <Link href="/me" onClick={handleToggleMenu} className="block px-4 py-2 text-sm text-gray-700">Your Profile</Link>
                <Logout />
              </div>
            )}
          </div>


        </div>


      </aside>
    </div>
  )
}

export default ChatNav
