"use client"
import React from 'react'
import './page.css'
import {handler} from "next-auth/react"


export default function page() {
  return (
<body className="h-screen ">
    <form action={handler} className='flex backdrop-blur-lg border-[1px] w-[60%] rounded-lg p-10 h-96 my-[23%]  mx-auto flex-col'>
        
        <button type="submit" className='bg-purple-700 font-lexend font-black hover:bg-white transition-all duration-300 hover:text-black m-auto text-white  py-[10px] px-[30%]'>Sign in With Google
      </button>
        <button type="submit" className='bg-purple-700 font-lexend font-black hover:bg-white transition-all duration-300 hover:text-black m-auto text-white  py-[10px] px-[30%]'>Sign in With Discord
      </button>
        
        
        
        
        <button type="submit" className='bg-purple-700 font-lexend font-black hover:bg-white transition-all duration-300 hover:text-black m-auto text-white  py-[10px] px-[30%]'>Using Email
      </button>
    </form>

</body>
  

  
      

  )
}
