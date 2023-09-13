"use client";
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import tv from '../../public/images/tv.png';
import imdb from '../../public/images/imdb.png';
import rt from '../../public/images/tomatoes.png';
import poster from '../../public/images/poster.png';
import stranger from '../../public/images/stranger.png';
import { AiOutlineSearch  } from "react-icons/ai";
import { AiFillPlayCircle  } from "react-icons/ai";
import { AiOutlineRight  } from "react-icons/ai";
import { PiEqualsBold } from "react-icons/pi";
import { LiaImdb } from "react-icons/lia";
import  Header from'./components/header';
import Loader from './components/loader';
import { AiOutlineHome  } from "react-icons/ai";
import { FaFacebookSquare  } from "react-icons/fa";
import { FaInstagram  } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { PiTelevisionLight  } from "react-icons/pi";
import { LuVideo } from "react-icons/lu";
import { IoCalendarOutline } from "react-icons/io5";
import Link from 'next/link';
import Favorite from './components/favorite';



const page = () => {
    
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [searchResults, setSearchResults] = useState([])
    const [isloading, setIsLoading] = useState(false)
    const [sidebar, showSideBar] = useState(false)


    

    const toggleSideBar = () => {
        showSideBar(!sidebar);

        if(!sidebar) {
            document.body.style.overflow = 'hiddden';
        }else{
            document.body.style.overflow ='auto';
        }
    }
    
    const API_KEY = 'api_key=73014d3d6afb77d4c6482499395d4e95'
    const BASE_URL = 'https://api.themoviedb.org/3'
    const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY
    const IMG_URL = 'https://image.tmdb.org/t/p/w500'
    const searchURL = BASE_URL + '/search/movie?'+API_KEY

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MzAxNGQzZDZhZmI3N2Q0YzY0ODI0OTkzOTVkNGU5NSIsInN1YiI6IjY0ZmY2NGYwMmRmZmQ4MDEwMDE0ODVhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EJYLY68pCva5JCfyJBBcL8LURWMBALPHHPwsz73IpDE'
        },
        params: {
            api_key:API_KEY,

        }

      };

      useEffect(() => {
       
        //localStorage.setItem('movies', JSON.stringify(movies));
        // const storedMovies = localStorage.getItem('movies');
        // if (storedMovies) {
        //   setMovies(JSON.parse(storedMovies));
          fetch(API_URL, options)
            .then(response => response.json())
            .then(data => {
                // localStorage.setItem('movies', JSON.stringify(data.results.slice(0,10)));
                setMovies(data.results.slice(0,10));
                })

            .catch(err => setError('failed to fetch movie data', err));

            
        })

        const handleInputChange = (e) => {
            setInputValue(e.target.value);
            console.log(searchResults)
        }
        
        // Function to handle search srequests
        const handleSubmit = (e) => {
            e.preventDefault();
            

              if (inputValue) {
                setIsLoading(true);
                   const searchQueryURL = searchURL+'&query='+inputValue
                   fetch(searchQueryURL)
                   .then((response) => response.json())
                   .then((data) => {
                        setSearchResults(data.results)
                        setMovies(data.results);//update search results state
                        setIsLoading(false)
                        setError(null);
                   })
                   .catch((err) => {
                    setSearchResults([]); //clear search results
                    setIsLoading(false);
                    setError('Failed to fetch search results', err)
                   })
              }
            
            console.log('Input Value:', inputValue);
        }
        //onst moviesJSON = JSON.stringify(movies)
        //localStorage.setItem('movies', moviesJSON)
        
        const posterPath = movies.poster_path
        ? `https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`
        : '/../../../../public/images/poster.png';


  return (
    <div className={`${sidebar ? 'sm:overflow-hidden' : 'overscroll-auto'} w-[100vw] h-[100vh] flex flex-row `}>
        <div className={`${sidebar ? 'sm:flex overflow-none' : 'hidden'} h-[100vh]  flex-col items-center sm:w-[100%] md:w-[20%] bg-[#000000] rounded-tr-[24px] rounded-br-[24px] pt-6 absolute z-[3] xsm:hidden`}>
          <span onClick={toggleSideBar} className='cursor-pointer w-[80%] flex flex-row  justify-around items-center text-[24px] font-semibold'>
                    <Image src={tv} alt="logo" width='50' height='50'/>
                    <h4>MovieBox</h4>
          </span>
        <nav className='flex flex-col gap-20 mt-24 w-[100%] items-center'>
          <Link href='../'>
          <span className='bg-[#be123d3b] border-[#be123c] flex flex-row items-center justify-center gap-3 w-[20vw] border-r-2 h-[86px]'>
            <AiOutlineHome/>
            <h3>Home</h3>
          </span>
          </Link>
          <span className=' flex flex-row items-center justify-center gap-3   w-[100%]  h-[86px]'>
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
        <Image className='absolute bg-contain w-[100vw] ' src={poster} alt="poster"/>
        <div className={`w-[100vw] h-[50vh]`}>
        <header className='relative xsm:px-3 lg:px-[70px]  w-[100%] xsm:h-[320px] md:h-[400px] lg:h-[600px] '>
            <nav className='flex flex-row justify-between w-[100%] md:h-[80px] xsm:h-[60px]  items-center '>
                <span onClick={toggleSideBar} className='flex flex-row gap-2 items-center'>
                    <Image className='md:w-[50px] md:h-[50px] xsm:w-[30px] xsm:h-[30px]'src={tv} alt="logo"/>
                    <h4 className='xsm:hidden md:block'>MovieBox</h4>
                </span>
                <span onChange={handleInputChange} className='flex items-center xsm:w-[200px] md:w-[525px] md:h-[36px] bg-transparent border-white border-2 rounded-[8px] px-4 justify-between'>
                    <input className='placeholder:text-[10px] bg-transparent w-[95%] border-none outline-none xsm:text-[12px] md:text-[16px]' type="text" placeholder='what do you want to watch?' />
                    <span onClick={handleSubmit}>
                    <AiOutlineSearch/>
                    </span>
                    
                </span>
                <span className='xsm:hidden sm:flex flex-row items-center md:gap-4 sm:gap-2 '>
                    <h4 className='sm:text-[12px] md:text-[16px]'>Sign In</h4>
                    <span className='bg-[#BE123C] flex items-center justify-center text-white rounded-[100px] md:w-[36px] md:h-[36px] sm:w-[28px] sm:h-[28px]'>
                        <PiEqualsBold/>
                    </span>
                </span>
            </nav>
            <div className=' lg:mt-20 md:mt-5 xsm:mt-4 md:w-[300px] xsm:w-[200px] flex flex-col lg:gap-[16px] xsm:gap-[14px] md:gap-[12px] '> 
                <h2 className='xsm:text-[20px] sm:text-[24px] md:text-[40px] md:leading-[42px] lg:text-[48px] lg:leading-[56px] xsm:leading-[20px] sm:leading-[26px] font-bold'>John Wick 3: <br />Parabellum</h2>
                <div className=' flex flex-row md:gap-5 xsm:gap-2  xsm:text-[10px] md:text-[12px]'> 
                    <span className='flex flex-row items-center xsm:gap-2 md:gap-2'>
                        <Image src={imdb} alt="imdb"/>
                        <h4>86.0/100</h4>
                    </span>
                    <span className='flex flex-row items-center gap-2'>
                        <Image src={rt} alt="rotten"/>
                        <h4>97%</h4>
                    </span>
                </div>
                <p className='xsm:text-[10px] sm:text-[12px] md:text-[12px] lg:text-[14px] md:w-auto xsm:w-[100%] '>John Wick is on the run after killing a member of the international assassins' guild, and with a $14 million price tag on his head, he is the target of hit men and women everywhere.</p>
                <button className='flex items-center justify-center gap-2 lg:w-[169px] xsm:w-[120px] xsm:h-[28px] lg:h-[36px] text-white bg-[#BE123C] lg:text-[14px] xsm:text-[10px] rounded-[6px]'><span className='text-[20px]'><AiFillPlayCircle/></span>WATCH TRAILER</button>
            </div>
        </header>
        <section className=' xsm:mt-0 sm:mt-8 lg:mt-20 md:mt-2 xsm:px-[10px] lg:px-[70px]   w-[100vw] '>
            <article className='flex flex-col text-white ' >
                <div className='flex flex-row justify-between items-center w-[100%] '>
                    <h2 className='sm:text-[18px] xsm:text-[14px]  md:text-[36px] font-bold'>Featured Movie</h2>
                    <h4 className='flex flex-row items-center md:text-[18px] xsm:text-[12px]  text-[#f6577f] gap-2'>see more <span className='md:text-[20px] xsm:text-[10px]'><AiOutlineRight/></span></h4>
                </div>
                <div className='xsm:mt-3 md:mt-[44px] grid xsm:grid-cols-2 lg:grid-cols-5 md:grid-cols-3 xsm:gap-[30px] md:gap-[40px]   '>
                    {/* loop through all the movies */}
                    {/* Display either top movies or search results */}
            {isloading ? (
                    <Loader/>
            ) : (
            searchResults.length > 0
              ? (Object.values(searchResults).map((movie) => (
                
                  
                <figure data-testid='movie-card' key={movie.id} className='relative bg-[#BE123C] shadow-2xl xsm:w-[120px] md:w-[220px] md:h-[490px] xsm:h-[250px] sm:h-[280px] sm:w-[170px] rounded-[6px] text-white'>
                <span className='absolute z-[2] right-2 top-2'>
                <Favorite /></span>
           <div className='delay-75 xsm:w-[120px] md:w-[220px] md:h-[370px] sm:w-[170px] sm:h-[190px] xsm:h-[160px]'>
           <Link href={`/movie/${movie.id}`}>
               <Image data-testid='movie-poster' className=' bg-contain md:h-[370px] md:w-[220px] sm:w-[170px] sm:h-[190px]  xsm:h-[160px] xsm:w-[120px]' src={movie.poster_path
? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
: '/../../public/images/poster.png'}  width='220' height='370' alt="poster"/> </Link>
           </div>
          
           <span className='flex flex-col p-2 md:gap-3 xsm:gap-1 font-semibold md:text-[18px] xsm:text-[13px]'>
               <h3 data-testid='movie-title'>Title: {movie.title.length > 20 ? (movie.title.slice(0,20)) : movie.title}</h3>
               <h4 data-testid='movie-release-date' className='md:text-[18px] xsm:text-[12px]'>Released: {movie.release_date}</h4>
           </span>
       </figure>
                 
              ))
                )
              : (
                // Display movies
                (Object.values(movies)).map((movie) => (
                        // movie card
                        
                        <figure data-testid='movie-card' key={movie.id} className='relative bg-[#BE123C] shadow-2xl xsm:w-[120px] md:w-[220px] md:h-[490px] xsm:h-[250px] sm:h-[280px] sm:w-[170px] rounded-[6px] text-white'>
                             <span className='absolute z-[2] right-2 top-2'>
                             <Favorite /></span>
                        <div className='delay-75 xsm:w-[120px] md:w-[220px] md:h-[370px] xsm:h-[160px] sm:w-[170px] sm:h-[190px]'>
                        <Link href={`/movie/${movie.id}`}>
                            <Image data-testid='movie-poster' className='sm:w-[170px] sm:h-[190px]  bg-contain md:h-[370px] md:w-[220px]  xsm:h-[160px] xsm:w-[120px]' src={movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : '/../../public/images/poster.png'}  width='220' height='370' alt="poster"/> </Link>
                        </div>
                       
                        <span className='flex flex-col p-2 md:gap-3 xsm:gap-1 font-semibold md:text-[18px] xsm:text-[13px]'>
                            <h3 data-testid='movie-title'>Title: {movie.title.length > 20 ? (movie.title.slice(0,20)) : movie.title}</h3>
                            <h4 data-testid='movie-release-date' className='md:text-[18px] xsm:text-[12px]'>Released: {movie.release_date}</h4>
                        </span>
                    </figure>
                   
              ))
                    )
                )}
                </div>
            </article>
        </section>
        <footer className='w-[100%] h-[40vh] bg-black mt-10 flex justify-center'>
            <article className='flex flex-col items-center justify-center md:gap-12 xsm:gap-6'>
                <div className='flex flex-row items-center md:text-[24px] xsm:text-[16px] md:gap-12 xsm:gap-6'>
                  <span>
                      <FaFacebookSquare/>
                  </span>
                  <span>
                      <FaInstagram/>
                  </span>
                  <span>
                      <FaTwitter/>
                  </span>
                  <span>
                      <FaYoutube/>
                  </span>
                </div>
                <div className='md:text-[24px] xsm:text-[12px] flex md:flex-row xsm:flex-col items-center  justify-center md:gap-4 xsm:gap-1'>
                  <p>Conditions of Use</p>
                  <p>Privacy & Policy</p>
                  <p>Press Room</p>
                </div>
                <p className='md:text-[24px] xsm:text-[12px]'>&copy; 2023 MovieBox by Henry Mishael</p>
            </article>
        </footer>
        </div>
    </div>
  )
}

export default page