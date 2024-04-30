// import React, { useContext, useState } from 'react'
// import './ProductDisplay.css'
// import star_icon from "../Assests/star_icon.png";
// import star_dull_icon from "../Assests/star_dull_icon.png"
// import { ShopContext } from '../../Context/ShopContext';
// import sofa2 from '../Assests/Screenshot 2023-11-28 001234.png'

// const ProductDisplay = (props) => {
//     const {product} = props;
//     const {addToCart} = useContext(ShopContext);
//     const [hasAddedToCart, setHasAddedToCart] = useState(false);

//     const handleAddToCart = () => {
//         if (!hasAddedToCart) {
//             addToCart(product.id);
//             setHasAddedToCart(true);
//         }
//     };

//   return (
//     <div className='productdisplay'>
        // <div className="productdisplay-left">
        //     <div className="productdisplay-img-list">
        //         <img src={product.image} alt="" />
        //         <img src={product.image} alt="" />
        //         <img src={product.image} alt="" />
        //         <img src={product.image} alt="" />
        //     </div>


//             {/* <div id="carouselExampleFade" class="carousel slide carousel-fade">
//             <div class="carousel-inner">
//                 <div class="carousel-item active">
//                     <img src={sofa2} class="d-block w-100" alt=""/>
//                 </div>
//                 <div class="carousel-item">
//                     <img src={sofa2} class="d-block w-100" alt=""/>
//                 </div>
//                 <div class="carousel-item">
//                     <img src={sofa2} class="d-block w-100" alt=""/>
//                 </div>
//             </div>
//                 <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
//                     <span class="carousel-control-prev-icon" aria-hidden="true"></span>
//                     <span class="visually-hidden">Previous</span>
//                 </button>
//                 <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
//                     <span class="carousel-control-next-icon" aria-hidden="true"></span>
//                     <span class="visually-hidden">Next</span>
//                 </button>
//             </div> */}
    

        //     <div className="productdisplay-img">
        //         <img className='productdisplay-main-img' src={product.image} alt="" />
        //     </div>
        // </div>
        // <div className="productdisplay-right">
        //     <h1>{product.name}</h1>
        //     <div className="productdisplay-right-star">
        //         <img src={star_icon} alt="" />
        //         <img src={star_icon} alt="" />
        //         <img src={star_icon} alt="" />
        //         <img src={star_icon} alt="" />
        //         <img src={star_dull_icon} alt="" />
        //         <p>12203 ratings</p>
        //     </div>
        //     <div className="productdisplay-right-prices">
        //         <div className="productdisplay-right-price-old">₹{product.old_price}</div>
        //         <div className="productdisplay-right-price-new">₹{product.new_price}</div>
        //     </div>
        //     <div className="productdisplay-right-description">
        //         A lightweight, usually knitted, pullover shirt, close-fitting and with
        //         a round neckline and short sleeves, worn as an undershirt or outer garment.
        //     </div>
//             <div className="productdisplay-right-qty">
//                 <label for='qty'>Qty : </label>
//                 <select id='qty'>
//                         <option value='1'>1</option>
//                         <option value='2'>2</option>
//                         <option value='3'>3</option>
//                         <option value='4'>4</option>
//                         <option value='5'>5</option>
//                         <option value='6'>6</option>
//                         <option value='7'>7</option>
//                         <option value='8'>8</option>
//                         <option value='9'>9</option>
//                         <option value='10'>10</option>
//                 </select>
//             </div>
//             <div className="addcart">
//                 <button onClick={handleAddToCart} disabled={hasAddedToCart} className={hasAddedToCart ? 'added-to-cart' : ''}>
//                         {hasAddedToCart ? 'ADDED TO CART' : 'ADD TO CART'}
//                 </button>
//             </div>
//                 {/* <button onClick={()=>{addToCart(product.id)}}>ADD TO CART</button> */}
//             <p className='productdisplay-right-category'><span>Category :</span>Women, T-Shirt, Crop-Top</p>
//             <p className='productdisplay-right-category'><span>Tags :</span>Modern, Latest</p>
//         </div>
//     </div>
//   )
// }

// export default ProductDisplay
//--------------------------------------------------------------
// import React, { useContext, useState } from 'react';
// import './ProductDisplay.css';
// import star_icon from "../Assests/star_icon.png";
// import star_dull_icon from "../Assests/star_dull_icon.png";
// import { ShopContext } from '../../Context/ShopContext';

// const ProductDisplay = (props) => {
//     const { product } = props;
//     const { addToCart } = useContext(ShopContext);
//     const [hasAddedToCart, setHasAddedToCart] = useState(false);
//     const [quantity, setQuantity] = useState(1); // State to keep track of quantity

//     const handleAddToCart = () => {
//         if (!hasAddedToCart) {
//             addToCart(product.id, quantity); // Pass quantity to addToCart function
//             setHasAddedToCart(true);
//         }
//     };

//     const handleQuantityChange = (event) => {
//         setQuantity(parseInt(event.target.value)); // Update quantity when user changes it
//     };

//     return (
//         <div className='productdisplay'>
//             {/* Product display content */}
//             <div className="productdisplay-left">
//             <div className="productdisplay-img-list">
//                 {product.image && <img src={product.image} alt="" />}
//                 <img src={product.image} alt="" />
//                 <img src={product.image} alt="" />
//                 <img src={product.image} alt="" />
//             </div>
//             <div className="productdisplay-img">
//                 <img className='productdisplay-main-img' src={product.image} alt="" />
//             </div>
//         </div>
//         <div className="productdisplay-right">
//             <h1>{product.name}</h1>
//             <div className="productdisplay-right-star">
//                 <img src={star_icon} alt="" />
//                 <img src={star_icon} alt="" />
//                 <img src={star_icon} alt="" />
//                 <img src={star_icon} alt="" />
//                 <img src={star_dull_icon} alt="" />
//                 <p>12203 ratings</p>
//             </div>
//             <div className="productdisplay-right-prices">
//                 <div className="productdisplay-right-price-old">₹{product.old_price}</div>
//                 <div className="productdisplay-right-price-new">₹{product.new_price}</div>
//             </div>
//             <div className="productdisplay-right-description">
//                 A lightweight, usually knitted, pullover shirt, close-fitting and with
//                 a round neckline and short sleeves, worn as an undershirt or outer garment.
//             </div>
//             <div className="productdisplay-right-qty">
//                 <label htmlFor='qty'>Qty : </label>
//                 <select id='qty' onChange={handleQuantityChange} value={quantity}>
//                     {[...Array(10).keys()].map(num => (
//                         <option key={num + 1} value={num + 1}>{num + 1}</option>
//                     ))}
//                 </select>
//             </div>
//             <div className="addcart">
//                 <button onClick={handleAddToCart} disabled={hasAddedToCart} className={hasAddedToCart ? 'added-to-cart' : ''}>
//                     {hasAddedToCart ? 'ADDED TO CART' : 'ADD TO CART'}
//                 </button>
//             </div>
//             </div>
//         </div>
//     );
// };

// export default ProductDisplay;
//----------------------------------------------

// import React, { useContext, useState,useEffect } from 'react';
// import './ProductDisplay.css';
// import star_icon from "../Assests/star_icon.png";
// import star_dull_icon from "../Assests/star_dull_icon.png";
// //import { ShopContext } from '../../Context/ShopContext';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { decode } from 'base-64';
// import axios from "axios"

// const ProductDisplay = (props) => {
//     const { product } = props;
//     //const { addToCart } = useContext(ShopContext); // Assuming you have a context variable for checking login status
//     const [hasAddedToCart, setHasAddedToCart] = useState(false);
//     const [quantity, setQuantity] = useState(1); // State to keep track of quantity
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const [userId,setUserId]=useState("")

//     useEffect(() => {
//         const fetchUser = async () => {
//             try {
//               const token = await AsyncStorage.getItem('authToken');
//               //console.log('token-->', token);
      
//               if (token) {
//                 const [header, payload, signature] = token.split('.');
      
//                 const decodedPayload = decode(payload);
      
//                 const decoded = JSON.parse(decodedPayload);
//                 //console.log("see1->>", decoded.userId);
      
//                 if (decoded && decoded.userId) {
//                   const userId1 = decoded.userId;
//                   setUserId(userId1);
//                 } else {
//                   console.error('Decoded token or userId is undefined');
//                 }
//               } else {
//                 console.error('Token is undefined or empty');
//               }
//             } catch (error) {
//               console.error('Error fetching or decoding token:', error);
//             }
//           };
      
//           fetchUser();
//         // Check login status when component mounts
//         checkLoginStatus();
//     }, []);

//     const checkLoginStatus = async () => {
//         try {
//             // Retrieve login status from AsyncStorage
//             const token = await AsyncStorage.getItem('authToken');

//             if (token) {
//                 // If login status exists in AsyncStorage, update isLoggedIn state
//                 setIsLoggedIn('true');
//             }
//         } catch (error) {
//             console.error('Error retrieving login status:', error);
//         }
//     };

//     const redirectToMain = () => {
//         window.location.href = '/login'; // Redirect to the '/login' page
//       };

//     const addItemToWishlist = async () => {
//         if (isLoggedIn) {
//             if (!hasAddedToCart) {
//                 try {
//                     if (!userId) {
//                       console.error('userId is undefined');
//                       return;
//                     }
              
//                     //console.log(userId,route.params.id,"here it is check");
//                     // Now you can safely use userId
//                     const response = await axios.post("http://192.168.170.163:8000/wishlist", {
//                       userId,
//                       itemId: product.id,
//                       title:product.name,
//                       price:product.new_price,
//                     });
              
//                     setHasAddedToCart(true);
//                     console.error("Success", "Item added to wishlist successfully!");
//                     //Alert.alert("Success", "Item added to wishlist successfully!");
//                   } catch (error) {
//                     console.error("Error adding item to wishlist:", error);
//                     //Alert.alert("Error", "Failed to add item to wishlist. Please try again later.");
//                   }
//                 //addToCart(product.id, quantity); // Pass quantity to addToCart function
//             }
//         } else {
//             // Redirect to login page if not logged in
//             redirectToMain() // Replace '/login' with your login page route
//         }
//     };

//     const handleQuantityChange = (event) => {
//         setQuantity(parseInt(event.target.value)); // Update quantity when user changes it
//     };

//     const handleViewModelClick = () => {
//         window.open(product.link, '_blank'); // Open product link in a new tab
//     };

//     return (
//         <div className='productdisplay'>
//             {/* Product display content */}
//             <div className="productdisplay-left">
//                 <div className="productdisplay-img-list">
//                     {/* {product.image && <img src={product.image} alt="" />} */}
//                     <img src={product.image1} alt="" />
//                     <img src={product.image2} alt="" />
//                     <img src={product.image3} alt="" />
//                 </div>
//                 <div className="productdisplay-img">
//                     <img className='productdisplay-main-img' src={product.image} alt="" />
//                 </div>
//             </div>
//             <div className="productdisplay-right">
//                 <h1>{product.name}</h1>
//                 <div className="productdisplay-right-star">
//                     <img src={star_icon} alt="" />
//                     <img src={star_icon} alt="" />
//                     <img src={star_icon} alt="" />
//                     <img src={star_icon} alt="" />
//                     <img src={star_dull_icon} alt="" />
//                     <p>12203 ratings</p>
//                 </div>
//                 <div className="productdisplay-right-prices">
//                     <div className="productdisplay-right-price-old">₹{product.old_price}</div>
//                     <div className="productdisplay-right-price-new">₹{product.new_price}</div>
//                 </div>
//                 <div className="productdisplay-right-description">
//                     {/* A lightweight, usually knitted, pullover shirt, close-fitting and with
//                     a round neckline and short sleeves, worn as an undershirt or outer garment. */}
//                     {product.details}
//                 </div>
//                 <div className="productdisplay-right-qty">
//                     <label htmlFor='qty'>Qty : </label>
//                     <select id='qty' onChange={handleQuantityChange} value={quantity}>
//                         {[...Array(10).keys()].map(num => (
//                             <option key={num + 1} value={num + 1}>{num + 1}</option>
//                         ))}
//                     </select>
//                 </div>
//                 <div className="addcart">
//                     <div className="view3d">
//                         <button onClick={handleViewModelClick}>View as a model or in AR</button>
//                     </div>
//                     <button onClick={addItemToWishlist} disabled={hasAddedToCart} className={hasAddedToCart ? 'added-to-cart' : ''}>
//                         {hasAddedToCart ? 'ADDED TO CART' : 'ADD TO CART'}
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProductDisplay;


import React, { useContext, useState, useEffect } from 'react';
import './ProductDisplay.css';
import star_icon from "../Assests/star_icon.png";
import star_dull_icon from "../Assests/star_dull_icon.png";
//import { ShopContext } from '../../Context/ShopContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import Alert from "react-dom"

const ProductDisplay = (props) => {
    const { product } = props;
    //const { addToCart } = useContext(ShopContext); // Assuming you have a context variable for checking login status
    const [hasAddedToCart, setHasAddedToCart] = useState(false);
    const [quantity, setQuantity] = useState(1); // State to keep track of quantity
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = await AsyncStorage.getItem('authToken');
                //console.log('token-->', token);

                if (token) {
                    const [header, payload, signature] = token.split('.');

                    const decodedPayload = decodeURIComponent(escape(atob(payload)));

                    const decoded = JSON.parse(decodedPayload);
                    //console.log("see1->>", decoded.userId);

                    if (decoded && decoded.userId) {
                        const userId1 = decoded.userId;
                        setUserId(userId1);
                        
                    } else {
                        console.error('Decoded token or userId is undefined');
                    }
                } else {
                    console.error('Token is undefined or empty');
                }
            } catch (error) {
                console.error('Error fetching or decoding token:', error);
            }
        };

        fetchUser();
        // Check login status when component mounts
        checkLoginStatus();
    }, []);

    const checkLoginStatus = async () => {
        try {
            // Retrieve login status from AsyncStorage
            const token = await AsyncStorage.getItem('authToken');

            if (token) {
                // If login status exists in AsyncStorage, update isLoggedIn state
                setIsLoggedIn(true);
            }
        } catch (error) {
            console.error('Error retrieving login status:', error);
        }
    };

    const redirectToMain = () => {
        window.location.href = '/login'; // Redirect to the '/login' page
    };

    const addItemToWishlist = async () => {
        if (isLoggedIn) {
            if (!hasAddedToCart) {
                try {
                    if (!userId) {
                        console.error('userId is undefined');
                        alert("Login first to add item!")
                        return;
                    }
                    console.log("token",userId,product.id,product.name,product.new_price)
                    const response = await axios.post("http://localhost:8000/wishlist", {
                        userId,
                        itemId: product.id,
                        title: product.name,
                        price: product.new_price,
                        quantity:quantity
                    });

                    setHasAddedToCart(true);
                    console.error("Success", "Item added to wishlist successfully!");
                } catch (error) {
                    console.error("Error adding item to wishlist:", error);
                }
                //addToCart(product.id, quantity); // Pass quantity to addToCart function
            }
        } else {
            // Redirect to login page if not logged in
            redirectToMain() // Replace '/login' with your login page route
        }
    };

    const handleQuantityChange = (event) => {
        setQuantity(parseInt(event.target.value)); // Update quantity when user changes it
    };

    const handleViewModelClick = () => {
        window.open(product.link, '_blank'); // Open product link in a new tab
    };

    return (
        <div className='productdisplay'>
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    <img src={product.image1} alt="" />
                    <img src={product.image2} alt="" />
                    <img src={product.image3} alt="" />
                </div>
                <div className="productdisplay-img">
                    <img className='productdisplay-main-img' src={product.image} alt="" />
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-star">
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_dull_icon} alt="" />
                    <p>12203 ratings</p>
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-old">₹{product.old_price}</div>
                    <div className="productdisplay-right-price-new">₹{product.new_price}</div>
                </div>
                <div className="productdisplay-right-description">
                    {product.details}
                </div>
                <div className="productdisplay-right-qty">
                    <label htmlFor='qty'>Qty : </label>
                    <select id='qty' onChange={handleQuantityChange} value={quantity}>
                        {[...Array(10).keys()].map(num => (
                            <option key={num + 1} value={num + 1}>{num + 1}</option>
                        ))}
                    </select>
                </div>
                <div className="addcart">
                    <div className="view3d">
                        <button onClick={handleViewModelClick}>View as a model or in AR</button>
                    </div>
                    <button onClick={addItemToWishlist} disabled={hasAddedToCart} className={hasAddedToCart ? 'added-to-cart' : ''}>
                        {hasAddedToCart ? 'Added To Cart' : 'Add To Cart'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDisplay;
