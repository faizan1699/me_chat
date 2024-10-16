import React, { useContext } from 'react';

import Navbar from '../../headers/navbar';

import { islogincontext } from '../common/commonlayout';

const Main = ({ children }) => {

    const { islogin } = useContext(islogincontext);

    return (

        <div id="body">
            {(islogin === undefined || islogin === null || islogin === false) && <Navbar />}
            {children}
        </div >
    )
}

export default Main
