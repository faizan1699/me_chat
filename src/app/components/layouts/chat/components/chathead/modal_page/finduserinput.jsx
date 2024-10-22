"use client";

import React, { useContext, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faSearch } from '@fortawesome/free-solid-svg-icons';
import { isMeContext } from '@/app/components/layouts/common/commonlayout';
import { showAlert } from '@/app/components/alert/alert';

import axios from 'axios';
;

const radioContainerClasses = "flex space-x-2 p-2";
const radioDivClasses = "flex items-center w-full ps-4 border border-gray-200 rounded dark:border-gray-700 cursor-pointer";
const radioInputClasses = "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:border-gray-600";
const radioLabelClasses = "w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300";
const formContainerClasses = "p-4 md:p-5";
const labelClasses = "block mb-2 text-sm font-medium text-gray-900 dark:text-white";
const inputClasses = "border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white";
const buttonClasses = "w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800";

const FindUser = () => {

    const { me } = useContext(isMeContext);

    const [adduserlaod, setAdduserLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [searchBy, setSearchBy] = useState("email");
    const [friend, setFriend] = useState(null);

    const [inputValue, setInputValue] = useState({
        username: "",
        email: ""
    });

    const handleInputValue = (e) => {
        const { name, value } = e.target;
        setInputValue({
            ...inputValue, [name]: value
        });
    };

    const handleRadioChange = (e) => {
        setSearchBy(e.target.value);
    };

    const handleDivClick = (id) => {
        document.getElementById(id).click();
    };

    const handleFindUser = async (e) => {

        e.preventDefault();
        const { email, username } = inputValue;
        const payload = searchBy === "email" ? { email } : { username };

        if (email || username) {
            setLoading(true);
            try {
                const api = await axios.post("/api/users/finduser", payload);
                setFriend(api?.data?.user_data || null);
            } catch (error) {
                showAlert("info", "Info", error?.response?.data?.message || "An error occurred", 5000);
            }
            finally {
                setLoading(false);
            }
        } else {
            showAlert("warning", `${searchBy === "email" ? "Email" : "Username"} required`, "Please fill in the input", 5000);
        }
    };

    const handleAddFriend = async () => {

        const myid = me.id;

        const chatsdata = {
            members: [friend.id, myid],
            id: friend.id,
        }

        setAdduserLoading(true);

        try {
            const adduser = await axios.post("/api/", chatsdata);
            setShowDialouge(false);
            showAlert("success", "User Added", adduser?.data?.message, 3000);
            console.log("add user data", adduser);
            setChats((prevChats) => [...prevChats, adduser?.data?.newChat]);
        }
        catch (error) {
            showAlert("warning", "an issue occur", error?.response?.data?.message, 5000);
            console.log(error?.response?.data?.message);
        }
        finally {
            setAdduserLoading(false);
        }

    }
    return (


        <>
            <div className={radioContainerClasses}>
                <div onClick={() => handleDivClick('radio_div_1')} className={radioDivClasses}>
                    <input id='radio_div_1' onChange={handleRadioChange} type="radio" value="email" name="search-by" className={radioInputClasses} checked={searchBy === "email"} />
                    <label htmlFor="radio_div_1" className={radioLabelClasses}>By Email</label>
                </div>
                <div onClick={() => handleDivClick('radio_div_2')} className={radioDivClasses}>
                    <input id='radio_div_2' onChange={handleRadioChange} type="radio" value="username" name="search-by" className={radioInputClasses} checked={searchBy === "username"} />
                    <label htmlFor="radio_div_2" className={radioLabelClasses}>By Username</label>
                </div>
            </div>

            <div className={formContainerClasses}>
                <form onSubmit={handleFindUser} className="space-y-4" method='post' autoComplete='off'>
                    {searchBy === "email" ? (
                        <>
                            <label htmlFor="email" className={labelClasses}>Add user email here</label>
                            <input type="email" onChange={handleInputValue} name="email" value={inputValue.email} className={inputClasses} autoComplete='new_user' placeholder="john@gmail.com" />
                        </>
                    ) : (
                        <>
                            <label htmlFor="username" className={labelClasses}>Add username here</label>
                            <input type="text" onChange={handleInputValue} name="username" value={inputValue.username} className={inputClasses} autoComplete='new_username' placeholder="John Doe" />
                        </>
                    )}


                    {friend && (
                        <div className="flex items-center hover:bg-gray-900 bg-gray-800 my-2 p-2 py-3 rounded-lg">
                            {/* <div className="mr-2">
                                <Image
                                    src={friend?.avatar}
                                    width={50}
                                    height={50}
                                    className="rounded-full"
                                    style={{ maxHeight: 50, maxWidth: 50, minHeight: 50, minWidth: 50, display: "block" }}
                                    alt={`friend img`}
                                    loading="lazy"
                                />
                            </div> */}

                            <div className="flex flex-col w-full">
                                <p className="font-bold text-white">{friend?.username}</p>
                                <p className="text-sm text-gray-500">{friend?.email}</p>
                            </div>

                            <div onClick={handleAddFriend} className='rounded-full bg-white text-gray-800 hover:text-gray:900 px-1'>
                                <button type="button" className="">
                                    {adduserlaod ?
                                        (<span className='text-red-600 font-semibold'>Loading</span>)
                                        : (<><FontAwesomeIcon icon={faAdd} /> </>)}
                                </button>

                            </div>


                        </div>
                    )}

                    <div className="">

                        <button type="submit" className={`bg-indigo-800 hover:bg-indigo-700 ${buttonClasses}`}>
                            {loading ? "Loading pls wait" : <><FontAwesomeIcon icon={faSearch} /> Find user</>}

                        </button>
                    </div>
                </form>
            </div>
        </>

    );
}

export default FindUser;