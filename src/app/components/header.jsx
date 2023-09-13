import React from 'react'
import Image from 'next/image'
import tv from '../../../public/images/tv.png';
import imdb from '../../../public/images/imdb.png';
import rt from '../../../public/images/tomatoes.png';
import { AiOutlineSearch  } from "react-icons/ai";
import { AiFillPlayCircle  } from "react-icons/ai";
import { PiEqualsBold } from "react-icons/pi";

export default function header() {
  return (
    <div>
        <header className='relative px-[70px]  w-[100%] h-[600px] '>
            <nav className='flex flex-row justify-between w-[100%] h-[80px]  items-center '>
                <span className='flex flex-row gap-2 items-center'>
                    <Image src={tv} alt="logo"/>
                    <h4>MovieBox</h4>
                </span>
                <span className='flex items-center w-[525px] h-[36px] bg-transparent border-white border-2 rounded-[8px] px-4 justify-between'>
                    <input className='bg-transparent w-[95%] border-none outline-none' type="text" placeholder='what do you want to watch?' />
                    <AiOutlineSearch/>
                </span>
                <span className='flex flex-row items-center gap-4'>
                    <h4>Sign In</h4>
                    <span className='bg-[#BE123C] flex items-center justify-center text-white rounded-[100px] w-[36px] h-[36px]'>
                        <PiEqualsBold/>
                    </span>
                </span>
            </nav>
            <div className=' mt-20 w-[300px] flex flex-col gap-[16px]'> 
                <h2 className='text-[48px] leading-[56px] font-bold'>John Wick 3: <br />Parabellum</h2>
                <div className=' flex flex-row gap-5 text-[12px]'> 
                    <span className='flex flex-row items-center gap-2'>
                        <Image src={imdb} alt="imdb"/>
                        <h4>86.0/100</h4>
                    </span>
                    <span className='flex flex-row items-center gap-2'>
                        <Image src={rt} alt="rotten"/>
                        <h4>97%</h4>
                    </span>
                </div>
                <p className='text-[14px]'>John Wick is on the run after killing a member of the international assassins' guild, and with a $14 million price tag on his head, he is the target of hit men and women everywhere.</p>
                <button className='flex items-center justify-center gap-2 w-[169px] h-[36px] text-white bg-[#BE123C] text-[14px] rounded-[6px]'><span className='text-[20px]'><AiFillPlayCircle/></span>WATCH TRAILER</button>
            </div>
        </header>
    </div>
  )
}
