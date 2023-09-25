import { AuthContext } from './AuthContext'
import axios from 'axios'
import { useEffect, useState, useCallback } from 'react'

const AuthProvider = (prop) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const [Movies, setMovies] = useState([{}]);
    const [userInfo, setUserInfo] = useState({});


    const AddFavoriteMovies = (movieId) => {
        const movies = localStorage.getItem('favoriteMovies');
        const favoriteMovies = movies ? localStorage.getItem('favoriteMovies').split(",") : [];

        localStorage.setItem('favoriteMovies', [...favoriteMovies, movieId]);
    }

    const RemoveFavoriteMovie = (movieId) => {
        const movies = localStorage.getItem('favoriteMovies');
        const favoriteMovies = movies ? localStorage.getItem('favoriteMovies').split(",") : [];
        const newListOfFavoriteMovies = favoriteMovies.filter((movie) => {
            return movie != movieId;
        })

        localStorage.setItem('favoriteMovies', newListOfFavoriteMovies);
    }


    const updateFavoriteMovies = useCallback(() => {
        const movies = localStorage.getItem('favoriteMovies');
        console.log("Updating favorite movies....")
        const movieIds = movies ? localStorage.getItem('favoriteMovies')?.split(',') : [];
        setFavoriteMovies(Movies.filter((movie) => {
            return movieIds?.includes(movie.id);
        }));
    }, [Movies]);


    const getAuthenticatedUser = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/auth`, {
                method: 'GET',
                credentials: 'include',
            });
            const data = await response.json();
            console.log(`Authenticated`);
            console.log(data);
            setIsAuthenticated(true);
            setUserInfo(data);
        } catch (err) {
            console.log("Not Authenticated");
            setIsAuthenticated(false);
        }
    };

    const getMovies = async () => {
        await axios.get(`${BASE_URL}/api/allmovies`)
            .then((res) => {
                console.log("Getting Movies inside AuthContex")
                setMovies(res.data);
            })
            .catch((err) => console.log(err.message))
    }

    useEffect(() => {
        getAuthenticatedUser()                                                                                                                                                              
        getMovies();
    }, [])


    useEffect(() => {
        updateFavoriteMovies();
    }, [updateFavoriteMovies])




    return (
        <AuthContext.Provider value={{ isAuthenticated, favoriteMovies, AddFavoriteMovies, RemoveFavoriteMovie, updateFavoriteMovies,userInfo, getAuthenticatedUser }}>
            {prop.children}
        </AuthContext.Provider>
    )


}

export default AuthProvider;