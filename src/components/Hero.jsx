import React from 'react'
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <>
        <div className='w-full h-[90vh] flex justify-center items-center'>
            <div className='text-center'>
                <h1 className='text-4xl md:text-6xl font-bold text-white-500 mb-4'>Welcome to Our Project</h1>
                <p className='text-lg md:text-xl text-gray-500 mb-6'>This is a simple hero section to showcase our project.</p>
                <Link to='/signup'>
                  <button className='px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 cursor-pointer'>
                    Get Started
                </button>
                </Link>
            </div>
        </div>
    </>
  )
}

export default Hero