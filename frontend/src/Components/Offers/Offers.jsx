import React from 'react'
import './Offers.css'
import { Link } from 'react-scroll';
import exclusive_image from '../Assests/exclusive_image.png'

const Offers = () => {
  return (
    <div className='offers'>
        <div className="offers-left">
            <h1>Exclusive</h1>
            <h1>Offers For You</h1>
            <p>ONLY ON BEST SELLER PRODUCTS</p>
            <Link to="NewCollections" spy={true} smooth={true} offset={-70} duration={500}>
                    <button className='offerCheck'>CHECK NOW</button>
                </Link> 
        </div>
        <div className="offers-right">
            <img src={exclusive_image} alt=""/>
        </div>
    </div>
  )
}

export default Offers