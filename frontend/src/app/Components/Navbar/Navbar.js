"use client";
import Image from 'next/image'
import React, { useState } from 'react'
import logo from "../../../../public/assets/image 20.svg"
import  "./Navbar.css"
import menu from "../../../../public/assets/menu.png"


const navArray = [
    {
    title : "EVENTS" , 
    link : "/events"
} , 
    {
    title : "MEDIA" , 
    link : "/media"
} , 
    {
    title : "TEAMS" , 
    link : "/teams"
} , 
    {
    title : "ABOUT US" , 
    link : "/about"
} , 
    {
    title : "LOGIN" , 
    link : "/api/auth/signin"
} , 

]

export default function Navbar() {
  const [open  , setOpen] = useState(true)
  return (
    <div className='bg-[#101010] justify-between md:pl-24 md:pr-10 p-7 flex flex-col md:flex-row  font-lexend align-middle w-full m-auto  '>
      <div className='flex flex-row justify-between'>
      <Image
      src={menu} 
      alt="menu"
      className={`w-10 h-10 relative top-9 invert md:hidden transition-all duration-500 ${!open ? "rotate-90" : "rotate-0"}`}
      onClick={()=>setOpen(!open)}
      />

      <Image
      src={logo}
      alt = "Logo"
      className='sm:mx-auto my-10 md:m-0'
      />
      </div>
      {/* mobile */}
      <div className={`md:hidden flex flex-col overflow-hidden transition-all duration-500 ${open?"h-0":"h-56"} `}>
      {
        
          navArray.map((navLink  , i ) => {
            if(i!=4)
              return (

                <a key={i} href={navLink.link} className='navlinkStyle my-5 ml-5 tracking-widest '>
                    {navLink.title}
                </a>
              )
            else
                return(
                  

                  <button onClick={()=>{
                    window.location.href="/api/auth/signin";
                  }} className='bg-purple-700 font-lexend font-black hover:bg-white transition-all duration-300 hover:text-black m-auto text-white  py-[10px] px-[60px]'>LOGIN
                  </button>
                  
              )

          }
)  
      }

      </div>
      {/* desktop */}
      <div className='md:flex flex-row md:m-10 m-auto my-10 hidden'>
      {
        
        navArray.map((navLink  , i ) => {
          if(i!=4)
            return (

              <a key={i} href={navLink.link} className='navlinkStyle my-5 ml-5 tracking-widest '>
                  {navLink.title}
              </a>
            )
          else
              return(
                <button onClick={()=>{
                  window.location.href="/api/auth/signin";
                }} className='bg-purple-700 tracking-widest ml-10 font-lexend font-black hover:bg-white transition-all duration-300 text-sm hover:text-black m-auto text-white  py-[5px] px-[30px]'>LOGIN
                </button>
                
            )

        }
)  
    }

      </div>
      
      

    </div>
  )
}
