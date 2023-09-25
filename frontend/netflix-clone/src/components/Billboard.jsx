import React, { useEffect, useState } from 'react';
import {AiOutlineInfoCircle} from 'react-icons/ai'
import PlayButton from './PlayButton';
import axios from 'axios';


const Billboard = () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const [Movie, setMovie] = useState({
        id : '',
        title: '',
        description: '',
        videoUrl: '',
        thumbnailUrl: '',
        genre: '',
        duration: '',
    })


    useEffect(() => {
        axios.get(`${BASE_URL}/api/allmovies`)
        .then((res) => {
            console.log("From Billboard");
            let ind = Math.floor(Math.random() * res.data.length);
            setMovie(res.data[ind]);
        })
        .catch((err) => {
            console.log(err.message);
        })
    }, [])



    return (
        <div className='relative h-[56.25vw]'>
            <video className='
             w-full 
             h-[56.25vw]
             object-cover
             brightness-[60%]
            '
                autoPlay
                muted
                loop
                poster={Movie?.thumbnailUrl} src={Movie?.videoUrl}>
            </video>

            <div className='absolute top-[30%] md:top-[40%] ml-4 md:ml-16'>
                <p className='text-white text-1xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl'>
                    {Movie?.title}
                </p>
                <p className='text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl'>
                    {Movie?.description}
                </p>
                <div className='flex flex-row items-center mt-3 md:mt-4 gap-3'>
                    <PlayButton movieId={Movie?.id}/>
                    <button className='
                    bg-white 
                    text-white 
                    bg-opacity-30 
                    rounded-md 
                    py-1 md:py-2 
                    px-2 md:px-4 
                    w-auto 
                    text-xs lg:text-lg 
                    font-semibold 
                    flex flex-row items-center 
                    hover:bg-opacity-20 
                    transition'
                    onClick={ () => {}}
                    >
                    <AiOutlineInfoCircle className="mr-1"/>
                    More Info</button>
                </div>
            </div>
        </div>
    )
}

export default Billboard;