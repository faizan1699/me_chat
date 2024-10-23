
import React from 'react';

import { faBackward } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/navigation';
import { faArrowAltCircleLeft } from '@fortawesome/free-regular-svg-icons';

const Prevpage = () => {

    const router = useRouter();

    const handleGotoPrevpage = () => {
        router.back();
    }

    return (
        <div className='px-3 w-full pt-2 pb-4 text-1xl'>
            <button className='text-gray-300 hover:text-gray-700' onClick={handleGotoPrevpage}>
                <FontAwesomeIcon icon={faArrowAltCircleLeft} /> go to previous page
            </button>
        </div>
    )
}

export default Prevpage
