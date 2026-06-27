import React from 'react'
import logo from '../assets/logo.png'

const footer = () => {
  return (
    <>
      <div className="footer">
      <div className="bg-gray-200 flex justify-between items-center px-4 p-6">

        <div className="left-div flex flex-col">

          <div className="logo flex  gap-2 items-center">
          <img src={logo} width={150} alt="" />
          <p className=' text-2xl font-bold'>SwiftServe</p>
        </div>

        <div className=" flex flex-col w-[40%]">
          <h1 className=' text-2xl font-bold'>Smart Scheduling for Modern Services.</h1>
          <p>Empower your clients to book appointments, view services, and reserve open slots at their favorite barbers, parlors, and shops—anytime, anywhere.</p>
          <ul className=' flex gap-2.5 py-2'>
            <li className='text-2xl cursor-pointer'><i className="fa-brands fa-instagram"></i></li>
            <li className='text-2xl cursor-pointer'><i className="fa-brands fa-facebook"></i></li>
            <li className='text-2xl cursor-pointer'><i className="fa-brands fa-square-x-twitter"></i></li>
            <li className='text-2xl cursor-pointer'><i className="fa-brands fa-linkedin"></i></li>
          </ul>
        </div>

        </div>
        
         <div className="right-div flex flex-col">

           <div className=" flex gap-6 items-center w-[40%] p-3 py-2.5">
          <div className="flex flex-col gap-3 h-full">
            <h2>Company</h2>
            <ul className='flex flex-col gap-1'>
              <li className=' cursor-pointer'>About</li>
              <li className=' cursor-pointer'>Work With Us</li>
            </ul>
          </div>
          <div className="flex flex-col gap-3 h-full">
            <h2>Product</h2>
            <ul className='flex flex-col gap-1'>
              <li className=' cursor-pointer'>Pricing</li>
              <li className=' cursor-pointer'>Features</li>
            </ul>
          </div>
          <div className="flex flex-col gap-3 h-full">
            <h2>Resources</h2>
            <ul className='flex flex-col gap-1'>
              <li className=' cursor-pointer'>Help</li>
              <li className=' cursor-pointer'>ContactForm</li>
            </ul>
          </div>
        </div>

         </div>

      </div>
      <div className=" flex justify-between items-center p-2 bg-cyan-950 text-amber-50">

        <div className="">
          <p>© {new Date().getFullYear()} SwiftServe. All rights reserved.</p>
        </div>

        <div className="  flex justify-between px-2.5 py-3">
          <ul className=' flex gap-3'>
            <li>Privacy Policies</li>
            <li>Terms</li>
            <li>Code of Conduct</li>
          </ul>
        </div>

      </div>
    </div>
    </>
  )
}

export default footer
