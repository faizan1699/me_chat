import React from 'react';

import Navbar from '@/app/components/headers/navbar';

const Main = ({ children }) => {
    return (
        <div id="body">
            <div className='main_pages_body'>
                <Navbar />
            </div>
            {children}
        </div>
    )
}

export default Main
