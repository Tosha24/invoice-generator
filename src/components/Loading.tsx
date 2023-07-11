import React, { useState, useEffect } from 'react';
import { HashLoader } from 'react-spinners';

interface Props {
    message?: string;
}

const Loading = ({message} : Props) => {
    const [ishydrated, setHydrated] = useState(false);

    const quotes = [
        'The best preparation for tomorrow is doing your best today.',
        'To get rich, you have to be making money while you\'re asleep.',
        'An investment in knowledge pays the best interest',
        'The secret of getting ahead is getting started.',
        'The only limit to our realization of tomorrow will be our doubts of today.',
        'Money is usually attracted, not pursued.',
        'Don\'t let yesterday take up too much of today.',
        'In investing, what is comfortable is rarely profitable.',
        'Never give up',
        'Do or do not. There is no try.',
        'A satisfied customer is the best business strategy of all.',
        'Business opportunities are like buses, there\'s always another one coming.',
    ];

    useEffect(() => {
        setHydrated(true);
    }, []);
    
    const quote = quotes[Math.floor(Math.random() * quotes.length)];

    return (
        <div className='max-w-container flex flex-col items-center justify-center my-[35vh]'>
            <HashLoader color="#742099" />
            <div className='my-5'>
                {ishydrated ? message ? message : quote : ''}
            </div>
        </div>
    )
};

export default Loading;