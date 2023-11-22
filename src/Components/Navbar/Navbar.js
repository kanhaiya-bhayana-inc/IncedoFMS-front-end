import React, { useState } from 'react'
import styles from './Navbar.module.css'
import LogoImg from '../../images/cloudIcon.png'

export default function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("userpassword");
    window.location = "/";
  }


  return (
    <nav className={"navbar navbar-expand-lg sticky-top shadow p-2 bg-white rounded " + styles.navbarMainSection} >
      {/* <a className='mb-1' href='/'></a> */}
      <a className={"navbar-brand  " + styles.textColorLogo} style={{ "marginLeft": "10px" }} href="/dashboard"><img src={LogoImg} className='mb-1' alt='homeimage' height='20px' />&nbsp;Cloud-FMS</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          {
            (localStorage.getItem("username") && localStorage.getItem("userpassword")) ?
              <>
                <li className="nav-item active">
                  <a className={"nav-link " + styles.textColor} href="/dashboard">Home</a>
                </li>
                <li className="nav-item">
                  <a className={"nav-link " + styles.textColor} href="/fms">FileDetails</a>
                </li>
              </> : ""
          }

          {!(localStorage.getItem("username") && localStorage.getItem("userpassword")) ?
            <li className="nav-item">
              <a className={"nav-link " + styles.textColor} href="/login">Login</a>
            </li> : ""
          }
          {/* <li className="nav-item">
            <a className={"nav-link " + styles.textColor} href="/test">Testing</a>
          </li> */}
        </ul>

      </div>
      <ul className='navbar-nav'>
        {(localStorage.getItem("username") && localStorage.getItem("userpassword")) ?
          <>
            <li className="nav-item">
              <p className='mt-2' >Hey, Admin</p>
            </li>
            <li className="nav-item">
              <a className={"nav-link "} onClick={handleLogout} href="/">Logout</a>
            </li>
          </> :
          ""
        }
      </ul>
    </nav>
  )
}
