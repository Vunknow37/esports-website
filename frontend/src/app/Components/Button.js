"use client";
import React from 'react'

export default function Button( props 
 ) {
  return (
    <div>
      <button onClick={()=>{
        window.location.href=props.Link;
      }} className='bg-transparent font-lexend font-black hover:bg-white transition-all duration-300 hover:text-black mr-5 mt-20 text-white border-[1px] py-[20.3px] px-[39.8px]'>{props.title}</button>
    </div>
  )
}
