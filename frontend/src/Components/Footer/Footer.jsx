import React from 'react'
import './Footer.css'
import logo from '../Assests/elevate_logo.png'
import instagram_logo from '../Assests/instagram_icon.png'
import facebook_logo from '../Assests/facebook.png'

const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer-logo">
            <img src={logo} alt=""/>
            <p>ELEVATE</p>
        </div>
        <ul className='footer-links'>
            <li><a href='#'>Company</a></li>
            <li><a href='#'>Products</a></li>
            <li><a href='#'>Offices</a></li>
            <li><a href='#'>About</a></li>
            <li><a href='#'>Contact</a></li>
        </ul>
        <div className="footer-social-icon">
            <div className="footer-icons-container">
                <a href='https://www.instagram.com/elevate1sanar_vibra/'><img src={instagram_logo} alt=""/></a>
            </div>
            <div className="footer-icons-container">
                <a href='https://m.facebook.com/profile.php?id=61559018962978'><img src={facebook_logo} alt=""/></a>
            </div>
        </div>
        <div className="footer-copyright">
            <hr />
            <p>Copyright @ 2024 - All Rights Reserved</p>
        </div>
    </div>
  )
}

export default Footer