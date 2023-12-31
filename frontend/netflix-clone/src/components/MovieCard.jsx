import { BsFillPlayFill } from 'react-icons/bs'
import FavoriteButton from './FavoriteButton';
import {useNavigate} from 'react-router-dom'


const MovieCard = ({data}) => {
    const route = useNavigate()
    
    return (
        <div className="group bg-zinc-900 col-span relative h-[12vw]">
            <img src={data.thumbnailUrl} alt='Thumbnail' 
                className='
                  cursor-pointer
                  object-cover
                  transition
                  shadow-xl
                  rounded-md
                  group-hover:placeholder-opacity-90
                  sm:group-hover:opacity-0
                  delay-100
                  w-full
                  h-[12vw]
                '
            />
            <div className='
             opacity-0
             absolute
             top-0
             transition
             duration-200
             z-10
             invisible
             sm:visible
             delay-100
             w-full
             scale-0
             group-hover:scale-110
             group-hover:-translate-y-[6vw]
             group-hover:-translate-x-[2vw]
             group-hover:opacity-100
            '>
            
            <img src={data.thumbnailUrl} alt='Thumbnail' className='
             cursor-pointer
             object-cover
             transition
             duration
             shadow-xl
             rounded-t-md
             w-full
             h-[12vw]
            '/>

            <div className='
             z-10
             bg-zinc-800
             p-2
             lg:p-4
             absolute
             w-full
             transition
             shadow-md
             rounded-b-md
            '>

                <div className='flex flex-row items-center gap-3'>
                    <div onClick={()=> route(`/watch/${data.id}`)} 
                     className='cursor-pointer w-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300'>
                        <BsFillPlayFill size={25}/>
                    </div>
                    <FavoriteButton movieId={data.id}/>
                </div>
            
            <p className='text-green-400 font-semibold mt-4'>
                New <span className='text-white'>2023</span>
            </p>
            <div>

            </div>
            </div>

            </div>
        </div>
    )
}

export default MovieCard;