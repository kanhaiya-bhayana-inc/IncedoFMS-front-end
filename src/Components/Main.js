import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar/Navbar'
import Footer from './Footer/Footer'

export default function Main() {
  
  return (
    <>
    <Navbar />
    <div className='text-center ' style={{backgroundColor:'#FFFFFF',minHeight:'87.6vh'}}>
    <Outlet />
    </div>
    <Footer />
    </>
    
  )
}
