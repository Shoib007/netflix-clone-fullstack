import React, { useState, useContext } from 'react';
import { AiOutlinePlus, AiOutlineCheck } from 'react-icons/ai'
import { AuthContext } from '../Contexts/AuthContext';

const FavoriteButton = ({ movieId }) => {
  const { AddFavoriteMovies, RemoveFavoriteMovie, updateFavoriteMovies} = useContext(AuthContext);
  const [favorite, setFavorite] = useState(localStorage.getItem('favoriteMovies')?.split(',')?.includes(movieId) ? true : false)
  const Icon =  favorite ? AiOutlineCheck : AiOutlinePlus;

  const toggleFavorite = () => {
    if (!favorite) {
      AddFavoriteMovies(movieId);
      setFavorite(!favorite);
    } else {
      RemoveFavoriteMovie(movieId);
      setFavorite(!favorite);
    }
    updateFavoriteMovies(); // Call the updateFavoriteMovies function
  }



  return (
    <div onClick={toggleFavorite} className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-netural-300">
      <Icon className="text-white" size={30} />
    </div>
  )
}

export default FavoriteButton;