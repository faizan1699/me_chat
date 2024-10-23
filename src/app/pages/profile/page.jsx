"use client";

import React, { useContext, useEffect } from 'react';
import { isMeContext } from '@/app/components/layouts/common/commonlayout';
import moment from 'moment';
import Image from 'next/image';
import dummy from "../../assets/imgs/dummy.png";

import Prevpage from '@/app/common/prevpage/prevpage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenClip } from '@fortawesome/free-solid-svg-icons';

import { useRouter } from 'next/navigation';

const Profile = () => {

    const router = useRouter();
    const { me } = useContext(isMeContext);

    if (me === null) {
        return <p>Please reload your page.</p>;
    } else { }
  
    return (
        <div className="flex justify-center flex-col items-center h-screen">

            <Prevpage />

            {me && (

                <div class="bg-white max-w-2xl shadow overflow-hidden sm:rounded-lg">

                    <div class="px-4 py-5 sm:px-6 flex justify-between items-center ">
                        <h3 class="text-2xl leading-6 font-black hover:text-gray-500">
                            My profile
                        </h3>
                        <div class="relative inline-block group" onClick={() => router.push("/profile/edit")} >
                            <p className="text-xl hover:text-gray-500">
                                <FontAwesomeIcon icon={faPenClip} />
                            </p>
                            <div className="absolute left-0 transform -translate-x-1/2 mt-2 hidden group-hover:block bg-gray-50 text-gray-400 text-sm p-2 rounded shadow-lg">
                                edit-profile
                            </div>
                        </div>
                    </div>

                    <div className='flex hover:bg-gray-50 rounded-full min-h-40 justify-center items-center'>
                        <Image src={me.avatar ? me.avatar : dummy} className='rounded-full' alt="img name" width={100} height={100} />
                    </div>

                    <div class="border-t border-gray-200">
                        <dl>
                            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">
                                    Full name :
                                </dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {me.username ? me.username : "name not available"}
                                </dd>
                            </div>
                        </dl>
                        <dl>
                            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">
                                    Email :
                                </dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {me.email ? me.email : "email not available"}
                                </dd>
                            </div>
                        </dl>
                        <dl>
                            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">
                                    Account Status :
                                </dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {me.isuserverified === true ? "Verified" : "Not Verfied" || !me.isuserverified && "Account status not available"}
                                </dd>
                            </div>
                        </dl>
                        <dl>
                            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">
                                    Joining Date :
                                </dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {moment(me.createdat).format('LLLL')}
                                </dd>
                            </div>
                        </dl>

                    </div>
                </div>
            )}
        </div>
    )
}

export default Profile
