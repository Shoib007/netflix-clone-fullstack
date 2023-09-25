import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";


const Watch = () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const {isAuthenticated} = useContext(AuthContext);
    const router = useNavigate()
    const {id} = useParams();
    console.log(id);

    const [movie, setMovie] = useState({
        id:'',
        title:'',
        description:'',
        videoUrl:'',
        thumbnailUrl:'',
    });

    useEffect(() => {
        axios.get(`${BASE_URL}/api/getmovie/${id}`)
        .then((res) => {
            setMovie(res.data);
        })
        .catch((err) => console.log(err))

    }, [])

    if(!isAuthenticated){
        return router('/auth')
    }

    return (
        <div className="h-screen w-screen bg-black">

            <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70">
            <AiOutlineArrowLeft onClick={() => router('/')} className = "text-white cursor-pointer" size = {40} />
            <p className="text-white text-1xl md:text-3xl font-bold">
                <span> Watching : </span>
                {movie?.title}
            </p>
            </nav>

            <video autoPlay controls src={movie.videoUrl} className="h-full w-full"></video>
        </div>
    )
}

export default Watch;
