import { useContext, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import { AuthContext } from '../Contexts/AuthContext';

const Profiles = () => {
    const router = useNavigate();
    const {userInfo,getAuthenticatedUser } = useContext(AuthContext);

    


    useEffect(() => {
       getAuthenticatedUser();
    }, [])

    return (
        <div className="flex items-center h-full justify-center">
            <div className="flex flex-col">
                <h2 className="text-3xl md:text-6xl text-white text-center"> Who is is watching?</h2>
                <div className="flex items-center justify-center gap-8 mt-10">
                    <div onClick={() => router('/')}>
                        <div className="group flex-row w-44 mx-auto">
                            <div 
                                className="
                                 w-44
                                 h-44
                                 rounded-md
                                 flex
                                 items-center
                                 justify-center
                                 border-2
                                 border-transparent
                                 group-hover: cursor-pointer
                                 group-hover:border-white
                                 overflow-hidden
                                "
                            >
                                <img src="/images/default-blue.png" />

                            </div>
                            <div className="mt-4 text-green-400 text-center group-hover:text-white">
                                {userInfo.username}
                                {console.log(userInfo.username)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profiles;