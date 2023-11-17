import React from 'react'
import styles from './Navbar.module.css'

export default function Navbar() {
  return (
    <nav className={"navbar navbar-expand-lg sticky-top shadow p-2 bg-white rounded " +  styles.navbarMainSection} >
      <a className={"navbar-brand  "+ styles.textColorLogo} style={{"marginLeft":"20px"}} href="/">Incedo-FMS</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a className={"nav-link "+styles.textColor} href="/">Home</a>
          </li>
          <li className="nav-item">
            <a className={"nav-link "+styles.textColor} href="/fms">Fms</a>
          </li>
          <li className="nav-item">
            <a className={"nav-link "+styles.textColor} href="/test">Testing</a>
          </li>
          
        </ul>
      </div>
    </nav>
  )
}
