import React from 'react'
import "./Hero.css"
import Button from '../Button'

export default function Hero() {
  return (
    <div className='font-lexend HeroBg pl-[8.2%] py-[9%] size-contain flex-col flex '>
      <h1 className="font-black sm:text-[2.5rem] text-[2rem] text-white font-lexend leading-none">IT'S</h1>
      <h1 className="playtime sm:text-[5rem] text-[4rem] font-lexend leading-none">PLAYTIME</h1>
      <div className='flex flex-row'>
        <Button title="VIEW EVENTS" Link="/events" />
        <Button title="CONTACT US" Link="/contact"/>
      </div>
    </div>
  )
}
