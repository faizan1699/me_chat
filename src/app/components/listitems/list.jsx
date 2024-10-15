"use client"

import { useEffect, useState } from "react";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const ListItems = ({ navigation }) => {

    const currentPath = usePathname();
    const endlength = currentPath.length;
    const path = currentPath.slice(1, endlength);
    const x = path.charAt(0).toUpperCase() + path.slice(1);

    const [selectedLink, setSelectedLink] = useState(x);

    return (
        <>
            {navigation && navigation.map((item) => {
                const isSelected = item.name === selectedLink;
                return (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={`relative text-sm leading-6 no-underline mb_nav_list ${isSelected ? "font-semibold text-white" : "text-gray-500"
                            }`}
                        onClick={() => setSelectedLink(item.name)}
                    >
                        {item.name}
                        {isSelected ? (
                            <motion.div className="absolute -bottom-[1px] left-0 right-0 h-[1px]">
                                <svg width="37" height="8" viewBox="0 0 37 8" fill="none">
                                    <motion.path
                                        d="M1 5.39971C7.48565 -1.08593 6.44837 -0.12827 8.33643 6.47992C8.34809 6.52075 11.6019 2.72875 12.3422 2.33912C13.8991 1.5197 16.6594 2.96924 18.3734 2.96924C21.665 2.96924 23.1972 1.69759 26.745 2.78921C29.7551 3.71539 32.6954 3.7794 35.8368 3.7794"
                                        stroke="#fff"
                                        strokeWidth="auto"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        initial={{
                                            strokeDasharray: 50.20591735839844,
                                            strokeDashoffset: 100.20591735839844,
                                        }}
                                        animate={{
                                            strokeDashoffset: 2,
                                        }}
                                        transition={{
                                            duration: 2,
                                        }}
                                    />
                                </svg>
                            </motion.div>
                        ) : null}
                    </Link>
                );
            })}
        </>
    )
}
