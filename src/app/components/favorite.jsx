import React, { useState } from 'react'
import { AiOutlineHeart  } from "react-icons/ai";
import { AiFillHeart  } from "react-icons/ai";
export default function Favorite() {
    // To retrieve the 'movies' variable from local storage:
//const storedMovies= localStorage.getItem('movies');

// Parse the JSON string back to an array
//const Movies = JSON.parse(storedMovies) || [];
    const [clickFavorite, setClickFavorite] = useState(false)
    const [favorite, addFavorite] = useState([])
    const toggleFavorite = () => {
        // Movies.map((movie) => {
        // // Check if the movie is already in the favorites list
        // const isFavorite = favorite.some((favMovie) => favMovie.id === movie.id);
    
        // if (isFavorite) {
        //   // If it's already a favorite, remove it from the favorites list
        //   addFavorite((prevFavorites) =>
        //     prevFavorites.filter((favMovie) => favMovie.id !== movie.id)
        //   );
        // } else {
        //   // If it's not a favorite, add it to the favorites list
        //   addFavorite((prevFavorites) => [...prevFavorites, movie]);
        //   console.log(favorite)
        // }})
    
        // Toggle the favorite icon
        setClickFavorite((prevState) => !prevState);
      }
  return (
    <div className='md:text-[30px] xsm:text-[16px]  ' onClick={toggleFavorite}>
        {clickFavorite ?( <span className='text-red-600'><AiFillHeart/></span>) : <AiOutlineHeart/>}
    </div>
  )
}
