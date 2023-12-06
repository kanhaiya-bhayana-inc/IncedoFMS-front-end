import React, { useState } from 'react'
import styles from './Navbar.module.css'
import LogoImg from '../../images/cloudIcon.png'
import { Link } from 'react-router-dom';

export default function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("userpassword");
    window.location = "/";
  }


  return (
    <nav className={"navbar navbar-expand-lg sticky-top shadow p-2 bg-white rounded " + styles.navbarMainSection} >
      {/* <a className='mb-1' href='/'></a> */}
      <Link className={"navbar-brand  " + styles.textColorLogo} style={{ "marginLeft": "10px" }} to="/dashboard"><img src={LogoImg} className='mb-1' alt='homeimage' height='20px' />&nbsp;Cloud-FMS</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          {
            (localStorage.getItem("username") && localStorage.getItem("userpassword")) ?
              <>
                <li className="nav-item active">
                  <Link className={"nav-link " + styles.textColor} to="/dashboard">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className={"nav-link " + styles.textColor} to="/fms">FileDetails</Link>
                </li>
                <li className="nav-item">
                  <Link className={"nav-link " + styles.textColor} to="/about">AboutUs</Link>
                </li>
              </> : ""
          }

          {!(localStorage.getItem("username") && localStorage.getItem("userpassword")) ?
            <li className="nav-item">
              <Link className={"nav-link " + styles.textColor} to="/login">Login</Link>
            </li> : ""
          }
          {/* <li className="nav-item">
            <a className={"nav-link " + styles.textColor} to="/test">Testing</a>
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
              <Link className={"nav-link "} onClick={handleLogout} to="/">Logout</Link>
            </li>
          </> :
          ""
        }
      </ul>
    </nav>
  )
}
