'use client';
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import tv from '../../../../public/images/tv.png';
import imdb from '../../../../public/images/imdb.png';
import rt from '../../../../public/images/tomatoes.png';
import { AiOutlineHome  } from "react-icons/ai";
import { PiTelevisionLight  } from "react-icons/pi";
import { LuVideo } from "react-icons/lu";
import { IoCalendarOutline } from "react-icons/io5";
import Link from 'next/link';




export default function page() {
    
    const [selectedMovie, setSelectedMovie] = useState([]);
    const IMG_URL = 'https://image.tmdb.org/t/p/w500'
    const API_KEY = 'api_key=73014d3d6afb77d4c6482499395d4e95'
    // const router = useRouter();
    // const {id} = router.query
    
    const {id} = useParams();
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MzAxNGQzZDZhZmI3N2Q0YzY0ODI0OTkzOTVkNGU5NSIsInN1YiI6IjY0ZmY2NGYwMmRmZmQ4MDEwMDE0ODVhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EJYLY68pCva5JCfyJBBcL8LURWMBALPHHPwsz73IpDE'
        }
      };

      // useEffect (() => {
      // fetch(`https://api.themoviedb.org/3/movie/${id}?${API_KEY}`, options)
      //   .then(response => response.json())
      //   .then(data => {
      //       setSelectedMovie(data.results.find((x) => x.id === id));
      //       })
      //   .catch(err => console.error(err));})

      //   if (!selectedMovie){
      //       return (
      //         <>
      //           Not found
      //         </>
      //       )
      //     }

      useEffect(() => {
        const fetchMovieDetails = async () => {
          try {
            const url = `https://api.themoviedb.org/3/movie/${id}?${API_KEY}&language=en-US`;
            const response = await fetch(url);
    
            if (!response.ok) {
              throw new Error(`Failed to fetch movie details. Status code: ${response.status}`);
            }
    
            const data = await response.json();
            setSelectedMovie(data); // Set the entire movie object, not just a property
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchMovieDetails(); // Call the fetchMovieDetails function
    
      }, [id]); // Include 'id' as a dependency to re-fetch when the ID changes
      const posterPath = selectedMovie.poster_path
      ? `https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`
      : '/../../../../public/images/poster.png';

      const releaseDate = new Date(selectedMovie.release_date);
      const utcReleaseDate = releaseDate.toUTCString();
    
  return (
    <div className='w-[100vw] h-[100vh] bg-black flex flex-row' >
        <div className='xsm:hidden h-[100vh] md:flex flex-col items-center lg:w-[20%] md:w-[30%] bg-[#242424] rounded-tr-[24px] rounded-br-[24px] pt-6 '>
          <span className='cursor-pointer w-[80%] flex flex-row  justify-around items-center text-[24px] font-semibold'>
                    <Image src={tv} alt="logo" width='50' height='50'/>
                    <h4>MovieBox</h4>
          </span>
        <nav className='flex flex-col gap-20 mt-24 w-[100%] items-center'>
          <Link href='../'>
          <span className='cursor-pointer flex flex-row items-center gap-3 w-[100%] justify-center h-[86px]'>
            <AiOutlineHome/>
            <h3>Home</h3>
          </span>
          </Link>
          <span className='bg-[#be123d3b] flex flex-row items-center justify-center gap-3 border-r-2 border-[#be123c] w-[100%]  h-[86px]'>
            <LuVideo/>
              <h3>Movies</h3>
          </span>
          <span className='flex flex-row items-center gap-3 w-[100%] justify-center h-[86px]'>
           <PiTelevisionLight/>
           <h3>Tv Series</h3>
          </span>
          <span className='flex flex-row items-center gap-3 w-[100%] justify-center h-[86px]'>
          <IoCalendarOutline/>
          <h3>Upcoming</h3>
          </span>
        </nav>
        </div>
        <div className='w-[100%] flex flex-col md:px-16 xsm:px-0 items-center '>
            <div className='w-[100%] h-[70vh] overflow-hidden flex items-center justify-center  border-white border-4 md:rounded-[24px] xsm:rounded-[4px] md:mt-6 xsm:mt-0'>
              <Image  className='xsm:w-[100%] xsm:h-[100%]' src={posterPath} width='1100' height='100'/>
            </div>
            <div className='mt-3 flex flex-col gap-4 xsm:px-8 md:px-0'>
              <span className='flex md:flex-row xsm:flex-col gap-6 items-center md:justify-between xsm:justify-center'>
              <h2 data-testid='movie-title' className='md:text-[30px] xsm:text-[18px]'>Title: {selectedMovie.title}</h2>
              <p className='md:text-[20px] xsm:text-[12px] text-center' data-testid='movie-release-date'>Release Date: {utcReleaseDate}</p>
              <p className='md:text-[20px] xsm:text-[12px]'data-testid='movie-runtime'>Runtime: {selectedMovie.runtime}mins</p>
              </span>
              <p data-testid='movie-overview' className='leading-8'>{selectedMovie.overview}</p>
            </div>
        </div>
    </div>
  )
}
