import React, { useContext } from 'react';

import Navbar from '../../headers/navbar';

import { islogincontext } from '../common/commonlayout';

const Main = ({ children }) => {

    const none = undefined || null || false;
    const { islogin } = useContext(islogincontext);

    return (

        <div id="body">

            {islogin == none && (
                <div className='main_pages_body'>
                    <Navbar />
                </div>
            )}

            {children}
        </div >
    )
}

export default Main
