import React from 'react'
import MessageNav from './nav/messages_nav'
import UserMessages from './messages/user_messages'
import MessagesInput from './inputs/messages_input'

const Messages = () => {
    return (

        <div className='flex flex-col justify-between w-full h-screen pb-4'>
         
            <MessageNav />

            <div className="flex flex-col overflow-hidden">

                <div className="overflow-y-auto rounded-lg">
                    <UserMessages />
                </div>

                <MessagesInput />

            </div>

        </div>


    )
}

export default Messages
