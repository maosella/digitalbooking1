import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='absolute z-[100] h-screen w-screen -top-10 bg-primary flex-col-center text-white'>
      <h1 className='text-7xl  font-bold '> Ups! 404 not found </h1>
      <Link to='/' className='underline mt-16'> Go home</Link>
    </div>
  )
}

export default NotFound