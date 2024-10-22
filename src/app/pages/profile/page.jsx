"use client";

import React, { useContext, useEffect } from 'react';
import { isMeContext } from '@/app/components/layouts/common/commonlayout';
import moment from 'moment';

const Profile = () => {

    const { me } = useContext(isMeContext);

    if (me === null) {
        return <p>Please reload your page.</p>;
    }
    return (
        <div className="flex justify-center items-center h-screen">

            {me && (
                <div class="bg-white max-w-2xl shadow overflow-hidden sm:rounded-lg">
                    <div class="px-4 py-5 sm:px-6">
                        <h3 class="text-lg leading-6 font-medium text-gray-900">
                            My profile
                        </h3>
                        <p class="mt-1 max-w-2xl text-sm text-gray-500">
                            My Profile details in me_chat
                        </p>
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
                                    {me.isuserverified === true ? "Verified" : "Not Verfied" || "Account status not available"}
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
