// import React, { useContext, useState, useEffect } from "react";
// import './Navbar.css'
// import AsyncStorage from "@react-native-async-storage/async-storage"
// import axios from 'axios'

// // import logo from '../Assests/logo.png'
// import logo from '../Assests/elevate_logo.png'
// import heart from '../Assests/heart-regular.svg'
// import cart from '../Assests/cart.svg'
// import plus from  '../Assests/plus.png'
// import { Link ,useLocation} from "react-router-dom";
// // import { ShopContext } from "../../Context/ShopContext";

// const Navbar = () => {
//     const [userId, setUserId] = useState('');
//     const [menu, setMenu] = useState("shop");
//     const [tokenExists, setTokenExists] = useState(false);
//     const [wishlist, setWishlist] = useState([]);
//     //const { getTotalCartItems } = useContext(ShopContext);

//     const location = useLocation();

//   // Set the menu based on the current route path
//   useEffect(() => {
//     const path = location.pathname.split('/')[1];
//     setMenu(path || 'shop');
//   }, [location.pathname]);

//     const handleExploreMore = (category) => {
//         setMenu(category);
//       };

//     useEffect(() => {
//         const fetchUser = async () => {
//             try {
//                 const token = await AsyncStorage.getItem('authToken');

//                 if (token) {
//                     const [header, payload, signature] = token.split('.');

//                     const decodedPayload = decodeURIComponent(escape(atob(payload)));

//                     const decoded = JSON.parse(decodedPayload);
//                     //console.log("see1->>", decoded.userId);

//                     if (decoded && decoded.userId) {
//                         const userId1 = decoded.userId;
//                         setUserId(userId1);
//                         fetchWishlist(userId1);
//                         setTokenExists(true);
//                     } else {
//                         console.error('Decoded token or userId is undefined');
//                     }
//                 } else {
//                     console.error('Token is undefined or empty');
//                 }
//             } catch (error) {
//                 console.error('Error fetching or decoding token:', error);
//             }
//         };

//         fetchUser();
//         // Check login status when component mounts
//         fetchWishlist(userId);
//     }, []);

//     useEffect(() => {
//         fetchWishlist(userId);
//     }, [wishlist]);

//     const fetchWishlist = async (userId) => {
//         try {
//             const response = await axios.get(`http://localhost:8000/users/${userId}/wishlist`, {
//             });
//             console.log("order", response.data)
//             setWishlist(response.data);
//         } catch (error) {
//             console.error("Error fetching wishlist:", error);
//         }
//     };

//     const handleLogout = async () => {
//         try {
//             await AsyncStorage.removeItem("authToken");
//             setTokenExists(false);
//         } catch (err) {
//             console.log("error message", err);
//         }
//     };

//     return (
//         <div className="navbar">
//             <div className="nav-logo">
//                 <img src={logo} alt="" />
//                 <p>ELEVATE</p>
//             </div>
//             <ul className="nav-menu">
//                 <li onClick={() => { setMenu("shop") }}><Link style={{ textDecoration: 'none' }} to='/'>Home</Link>{menu === "shop" ? <hr /> : <></>}</li>
//                 <li onClick={() => { setMenu("furnitures") }}><Link style={{ textDecoration: 'none' }} to='/furnitures'>Furnitures</Link>{menu === "furnitures" ? <hr /> : <></>}</li>
//                 <li onClick={() => { setMenu("accessories") }}><Link style={{ textDecoration: 'none' }} to='/accessories'>Accessories</Link>{menu === "accessories" ? <hr /> : <></>}</li>
//                 <li onClick={() => { setMenu("wallpaintings") }}><Link style={{ textDecoration: 'none' }} to='/wallpaintings'>WallPaintings</Link>{menu === "wallpaintings" ? <hr /> : <></>}</li>
//                 <li onClick={() => { setMenu("clock") }}><Link style={{ textDecoration: 'none' }} to='/clock'>Clock</Link>{menu === "clock" ? <hr /> : <></>}</li>
//                 <li onClick={() => { setMenu("homedecor") }}><Link style={{ textDecoration: 'none' }} to='/homedecor'>HomeDecor</Link>{menu === "homedecor" ? <hr /> : <></>}</li>

//             </ul>
//             <div className="nav-login-cart">
//                 {tokenExists ? (
//                     <>
//                         <Link to='/cart'><img className='cart' src={cart} alt="" /></Link>
//                         <div className="nav-cart-count-cart">{wishlist.length}</div>
//                         <img className='plus' src={plus} alt="" onClick={() => setShowPopup(true)} /> 
//                         <button className="logout" onClick={handleLogout}>Logout</button>
//                     </>
//                 ) : (
//                     <>
//                         <Link to='/cart'><img className='heart' src={heart} alt="" /></Link>
//                         <div className="nav-cart-count-heart">0</div>
//                         <Link to='/Signup'><button className="login">Signup</button></Link>
//                     </>
//                 )}
//             </div>
//         </div>
//     )
// }


// export default Navbar





import React, { useContext, useState, useEffect } from "react";
import './Navbar.css'
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from 'axios'
import logo from '../Assests/elevate_logo.png'
import heart from '../Assests/heart-regular.svg'
import cart from '../Assests/cart.svg'
import plus from '../Assests/plus.png'
import { Link, useLocation } from "react-router-dom";
// import { ShopContext } from "../../Context/ShopContext";

const Navbar = () => {
    const [userId, setUserId] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [color, setColor] = useState('');
    const [size, setSize] = useState('');
    const [menu, setMenu] = useState("shop");
    const [tokenExists, setTokenExists] = useState(false);
    const [wishlist, setWishlist] = useState([]);
    const [showPopup, setShowPopup] = useState(false); // State to manage popup visibility
    const [popupInputs, setPopupInputs] = useState({ // State to manage input values
        name: '',
        price: '',
        color: '',
        size: ''
    });

    const location = useLocation();

    // Set the menu based on the current route path
    useEffect(() => {
        const path = location.pathname.split('/')[1];
        setMenu(path || 'shop');
    }, [location.pathname]);

    // const handleExploreMore = (category) => {
    //     setMenu(category);
    // };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = await AsyncStorage.getItem('authToken');

                if (token) {
                    const [header, payload, signature] = token.split('.');

                    const decodedPayload = decodeURIComponent(escape(atob(payload)));

                    const decoded = JSON.parse(decodedPayload);

                    if (decoded && decoded.userId) {
                        const userId1 = decoded.userId;
                        setUserId(userId1);
                        fetchWishlist(userId1);
                        setTokenExists(true);
                        console.log("userid",userId1)
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
        fetchWishlist(userId);
    }, []);

    useEffect(() => {
        fetchWishlist(userId);
    }, [wishlist]);

    const fetchWishlist = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:8000/users/${userId}/wishlist`, {});
            setWishlist(response.data);
        } catch (error) {
            console.error("Error fetching wishlist:", error);
        }
    };

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem("authToken");
            setTokenExists(false);
        } catch (err) {
            console.log("error message", err);
        }
    };

    const handlePopupSubmit = async () => {
        // Validate inputs
        if (!popupInputs.name || !popupInputs.price || !popupInputs.color || !popupInputs.size) {
            alert("Please fill in all fields.");
            return;
        }
        // Handle submission logic here, e.g., send data to server, etc.
        console.log("Popup inputs:", popupInputs);
        setName(popupInputs.name)
        setPrice(popupInputs.price)
        setColor(popupInputs.color)
        setSize(popupInputs.size)

        // const formData = new FormData();
        // formData.append('name', name);
        // formData.append('price', parseFloat(price));
        // formData.append('color', color);
        // formData.append('size', size);
        // formData.append('userId', userId);
        // try {
        //     console.log("form-->", JSON.stringify(formData))
        //     axios.post('http://localhost:8000/api/products', JSON.stringify(formData), {
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }
        //     });

        const productData = {
            name: name,
            price: parseFloat(price),
            color: color,
            size: size,
            userId: userId
        };

        try {
            console.log("productData-->", productData); // Log productData object
            const response = await axios.post('http://localhost:8000/api/products', productData, {
                headers: {
                    'Content-Type': 'application/json' // Set content type to application/json
                }
            });
            console.log("Response:", response.data); // Log response data


            // Clear input values
            setPopupInputs({
                name: '',
                price: '',
                color: '',
                size: ''
            });
            // Close the popup
            setShowPopup(false);
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <div className="navbar">
            <div className="nav-logo">
                <img src={logo} alt="" />
                <p>ELEVATE</p>
            </div>
            <ul className="nav-menu">
                <li onClick={() => { setMenu("shop") }}><Link style={{ textDecoration: 'none' }} to='/'>Home</Link>{menu === "shop" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("furnitures") }}><Link style={{ textDecoration: 'none' }} to='/furnitures'>Furnitures</Link>{menu === "furnitures" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("accessories") }}><Link style={{ textDecoration: 'none' }} to='/accessories'>Accessories</Link>{menu === "accessories" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("wallpaintings") }}><Link style={{ textDecoration: 'none' }} to='/wallpaintings'>WallPaintings</Link>{menu === "wallpaintings" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("clock") }}><Link style={{ textDecoration: 'none' }} to='/clock'>Clock</Link>{menu === "clock" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("homedecor") }}><Link style={{ textDecoration: 'none' }} to='/homedecor'>HomeDecor</Link>{menu === "homedecor" ? <hr /> : <></>}</li>
            </ul>
            <div className="nav-login-cart">
                {tokenExists ? (
                    <>
                        <Link to='/cart'><img className='cart' src={cart} alt="" /></Link>
                        <div className="nav-cart-count-cart">{wishlist.length}</div>
                        <img className='plus' src={plus} alt="" onClick={() => setShowPopup(true)} />
                        <button className="logout" onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to='/cart'><img className='heart' src={heart} alt="" /></Link>
                        <div className="nav-cart-count-heart">0</div>
                        <Link to='/Signup'><button className="login">Signup</button></Link>
                    </>
                )}
            </div>

            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <span className="close" style={{ color: 'black' }} onClick={() => setShowPopup(false)}>&times;</span>
                        <h2>Add New Item</h2>
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" value={popupInputs.name} onChange={(e) => setPopupInputs({ ...popupInputs, name: e.target.value })} required />
                        <label htmlFor="price">Price:</label>
                        <input type="number" id="price" value={popupInputs.price} onChange={(e) => setPopupInputs({ ...popupInputs, price: e.target.value })} required />
                        <label htmlFor="color">Color:</label>
                        <input type="text" id="color" value={popupInputs.color} onChange={(e) => setPopupInputs({ ...popupInputs, color: e.target.value })} required />
                        <label htmlFor="size">Size:</label>
                        <input type="text" id="size" value={popupInputs.size} onChange={(e) => setPopupInputs({ ...popupInputs, size: e.target.value })} required />
                        <button onClick={handlePopupSubmit}>Submit</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Navbar





