import React from 'react'
import { Link } from 'react-scroll';
import './Hero.css'
import img1 from '../Assests/img1.jpeg'
import img2 from '../Assests/img2.jpeg'
import img3 from '../Assests/img3.jpeg'
import img4 from '../Assests/img4.jpeg'


const Hero = () => {
  return (
    <div className='hero'>
        <img className='hero-left' src = {img1} alt="" />
        <div className="hero-middle">
            <img src={img3} alt="" />
            <p className='ultimate'>ULTIMATE</p>
            <p className='sale'>SALE</p>
            <p className='newcollection'>NEW COLLECTION</p>
            <div className="hero-shop-btn">
                <Link to="Popular" spy={true} smooth={true} offset={-70} duration={500}>
                    <button className='shop'>SHOP</button>
                </Link>            
          </div>
            <img src={img4} alt="" />
        </div>
        <img className='hero-right' src={img2} alt="" />

    </div>
  )
}

export default Hero