import React from 'react'
import heroimg1 from '../assets/heroimg1.png'
import businessImg from '../assets/business.webp'
import customerImg from '../assets/customer.png'
import TimeWatch from '../assets/timeWatch.png'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const navigate = useNavigate();
  return (
    <>
    <div className="">

      <div className="Hero-Section bg-cyan-950 text-amber-50 flex justify-between py-4 ">
        <div className="left-div flex flex-col justify-center  px-7 ">
          <h1 className=' text-4xl font-bold w-[75%]'>The Easiest Way to Book Local Services Instantly.</h1>
          <p>Discover. Book. Done.</p>
          <button onClick={()=>{navigate('/Allservices')}} className=' border border-amber-50 w-fit p-2 text-amber-50 my-3 cursor-pointer'>Get Services</button>
        </div>

        <div className="right-div flex justify-center items-center w-[50vw]">
          <img className='' src={heroimg1} alt="" />
        </div>
      </div>
      <div className="UseOfBusinesses flex justify-between items-center p-3">
        <div className="left w-[60%]">
          <h1 className=' text-2xl font-bold'>For Small Businesses/ Service Providers</h1>
        <p className=''>SwiftServe acts as your digital storefront and automated administrative assistant all in one. By signing up, independent professionals and local shop owners gain access to a secure, private dashboard where they can instantly list their services, set clear pricing, and define appointment durations. The platform generates a unique, shareable public profile link for each business, allowing owners to easily accept direct bookings from social media or WhatsApp. Instead of wasting time on tedious back-and-forth messaging, entrepreneurs can seamlessly track incoming appointments and manage their entire daily schedule in real time.</p>
        </div>

        <div className="right">
          <img className=' w-[60%]' src={businessImg} alt="" />
        </div>  
      </div>


      <div className="UseOfCustomer flex justify-between flex-row-reverse items-center p-3">

        <div className="left w-[60%]">
          <h1 className=' text-2xl font-bold'>For Customers</h1>
        <p className=''>Finding and booking trusted local talent has never been easier or faster. SwiftServe offers a centralized marketplace where users can explore a diverse array of neighborhood businesses, transparently compare service options, and view upfront pricing before making a commitment. Once a customer finds the right provider, a clean and intuitive booking form lets them pick an ideal date and time to lock in their appointment instantly. With no registration barriers required to browse or book, clients enjoy a frictionless, on-demand scheduling experience that fits perfectly into their busy lives.</p>
        </div>

         <div className="right">
          <img className=' w-[60%]' src={customerImg} alt="" />
        </div>
      </div>


      <div className="Performance-Analysis bg-cyan-950 text-amber-50 p-5 flex justify-between items-center gap-3 border-b">

        <div className="">
          <h1>Businesses Registered Already</h1>
          <p className=' text-3xl'>{'30,000+'}</p>
        </div>

        <div className="">
          <h1 className=' flex justify-center items-center gap-3.5'> <i className=" text-3xl fa-solid fa-infinity"></i> Free For Customers Anytime</h1>
        </div>

        <div className="flex justify-center items-center flex-col">
          <div className="flex items-center gap-3.5">
             <i className=" text-3xl fa-solid fa-location-crosshairs"></i>
          <h1 className=''> We'll Add Tracking System Very Soon</h1>
          </div>
          <p className='text-[10px]'>So, you all will be directly find the nearest services</p>
        </div>

        <div className="flex justify-center items-center flex-col">
          <div className="flex items-center gap-3.5">
             <img src={TimeWatch} className='invert' width={50} alt="" />
          <h1 className=' flex justify-center items-center gap-3.5'>Save Your Time by Booking the Servies</h1>
          </div>
        </div>

      </div>

      <div className="Services-locations bg-cyan-950 text-amber-50 flex min-h-[40vh] justify-center items-center p-5">
        <p className=' font-bold'>Don't Have Any Provider Right Now..</p>
      </div>


      <div className="query-form p-3">
        <div className=" w-[100%] flex flex-col">

          <form className=' flex flex-col gap-2.5 w-[30%] p-2 my-4 py-7' action="">
             <p className=' text-3xl font-bold'>Query Form/ Suggestion Form</p>
            <input className=' border p-2 rounded-2xl' type="text" placeholder='Enter Your Name' />
            <input className=' border p-2 rounded-2xl' type="text" placeholder='Enter Your Email'/>
            <textarea className=' border p-4 rounded-2xl' rows={2} name="message" id="" placeholder='Enter your Suggestion/Query'></textarea>
            <button className=' border p-2 rounded-3xl bg-cyan-950 text-amber-50 cursor-pointer'>Submit</button>
          </form>
        </div>
      </div>


    </div>
  
    </>
  )
}

export default Home
