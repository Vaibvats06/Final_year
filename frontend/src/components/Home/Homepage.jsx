import React from 'react'
import HomeImg from '../../assets/homeimg.png'
import { Link } from 'react-router-dom'

const Homepage = () => {
  return (
    <div className="min-h-screen bg-white">
      
      <div className="pt-20 px-6 overflow-y-auto">
        <div className='flex justify-between items-center pr-30 pt-10 '>
          <div className='min-w-[1/2] flex flex-col  pl-25 '>
            <p className='text-6xl font-semibold mb-5 text-[#0046FF]'>Smart Attendance <br />System with AI <br />Face Recognition</p>
            <p className='text-2xl mb-5'>Mark your attendance instantly with AI-<br />powered face recognition.</p>
            <p className='text-2xl mb-5'>Secure • Fast • Reliable</p>

            <div className='flex space-x-10'>
              <Link to={'create-account'} className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl bg-[#0046FF] text-white rounded-md w-65">Create Organisation</Link>
              <Link to={'/login'} className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl rounded-md  bg-[#0046FF] text-white w-60">Login</Link>
            </div>
          </div>
          <div className='min-w-[1/2]'>
            <img src={HomeImg} alt="homeing" className='w-[500px] rounded-xl'/>
          </div>  
        </div>
        </div>
      
    </div>
  )
}

export default Homepage