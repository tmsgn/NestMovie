import React from 'react'
import NavBar from '../components/Navbar'
const Tvshows = () => {
  return (
    <div>
      <NavBar />
       <div className='flex space-x-2 justify-center items-center bg-[rgba(0, 0, 0, 0.897)] h-screen dark:invert'>
        <div className='h-8 w-8 bg-white rounded-full animate-bounce' style={{ animationDelay: '0s' }}></div>
        <div className='h-8 w-8 bg-white rounded-full animate-bounce' style={{ animationDelay: '0.2s' }}></div>
        <div className='h-8 w-8 bg-white rounded-full animate-bounce' style={{ animationDelay: '0.4s' }}></div>
      </div>
    </div>
  )
}

export default Tvshows