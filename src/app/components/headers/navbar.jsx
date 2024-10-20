"use client";

import Link from 'next/link';
import React, { useContext, useState } from 'react';

import logo from "@/app/assets/logo/logo.png"
import Image from 'next/image';
import { ListItems } from '../listitems/list';
import { islogincontext } from '../layouts/common/commonlayout';
import { useRouter } from 'next/navigation';

const navigation = [
    { name: "Home", href: "/home", },
    { name: "About", href: "/about", },
    { name: "Privacy", href: "/privacy-policy" },
    { name: "Login", href: "/login", },
    { name: "Register", href: "/register" }
];

const Navbar = () => {

    // const { islogin } = useContext(islogincontext);
    const router = useRouter();
    const [openmenu, seTopenMenu] = useState(false);
    const [mbmenu, setMbmenu] = useState(false);

    const handleLogoClick = () => {
        if (document.referrer && document.referrer.includes(window.location.origin)) {
            router.back();
        } else {
            router.push('/');
        }
    };


    return (

        <nav className={`bg-gray-800`}>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-14 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">

                        <button onClick={() => setMbmenu(!mbmenu)} type="button" className="h-full relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                            <span className="absolute -inset-0.5"></span>
                            <span className="sr-only">Open main menu</span>

                            <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>

                            <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">

                        <div onClick={handleLogoClick} className="flex flex-shrink-0 items-center">
                            <Image
                                src={logo}
                                width={40}
                                height={40}
                                alt="logo"
                            />
                        </div>

                        <div className="mt-2 w-full  hidden sm:ml-6 sm:block ">
                            <div className="flex gap-8 justify-center items-center">
                                <ListItems navigation={navigation} />
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <button type="button" className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5"></span>
                            <span className="sr-only">View notifications</span>
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                            </svg>
                        </button>


                        {/* <div className="relative ml-3">
                            <div onClick={() => seTopenMenu(!openmenu)}>
                                <button type="button" className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                    <span className="absolute -inset-1.5"></span>
                                    <span className="sr-only">Open user menu</span>
                                    <Image width={50} height={50} className="h-8 w-8 rounded-full" src="" alt="" />
                                </button>
                            </div>

                            {openmenu &&
                                <div onClick={() => seTopenMenu(!openmenu)} className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
                                    <Link href="/" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-1">Settings</Link>
                                </div>}
                        </div> */}

                    </div>
                </div>
            </div>


            {mbmenu && <div onClick={() => setTimeout(() => { setMbmenu(false) }, 1000)} className="sm:hidden  h-full" id="mobile-menu">
                <div className="flex flex-col items-center justify-center space-y-1 px-2 pb-3 pt-2">
                    <ListItems navigation={navigation} />
                </div>
            </div>}
        </nav >

    )
}

export default Navbar
