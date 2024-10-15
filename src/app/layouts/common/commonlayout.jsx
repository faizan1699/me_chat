import React from 'react';

import Main from '../main/main';
import Chatlayout from '../chat/chatlayout';

const CommonLayout = ({ children }) => {
    return (
        <div>
            <Main children={children} />
            <Chatlayout children={children} />
        </div>
    )
}

export default CommonLayout
