import React, { useContext, useEffect, useState } from 'react'
import './CartItems.css'
import remove_icon from '../Assests/cart_cross_icon.png'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
// import { Link } from 'react-router-dom';


const CartItems = () => {
    const [userId, setUserId] = useState('');
    const [wishlist, setWishlist] = useState([]);
    // const history = useHistory();

    const imageObjects = {
        1: require('../Assests/Screenshot 2023-11-28 000536.png'),
        2: require('../Assests/Screenshot 2023-11-28 000745.png'),
        3: require('../Assests/Screenshot 2023-11-28 000944.png'),
        4: require('../Assests/Screenshot 2023-11-28 103020.png'),
        5: require('../Assests/Screenshot 2023-11-28 001806.png'),
        6: require('../Assests/Group 1000001747.png'),
        7: require('../Assests/Screenshot 2023-12-03 001213.png'),
        8: require('../Assests/Screenshot 2023-11-28 183733.png'),
        9: require('../Assests/Screenshot 2023-11-28 183828.png'),
        10: require('../Assests/Screenshot 2023-12-03 000459.png'),
        11: require('../Assests/Screenshot 2023-12-03 001542.png'),

    };

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
                        fetchWishlist(userId1);
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
        calculateTotal()
    }, []);

    const fetchWishlist = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:8000/users/${userId}/wishlist`, {
            });
            console.log("order", response.data)
            setWishlist(response.data);
        } catch (error) {
            console.error("Error fetching wishlist:", error);
        }
    };

    const calculateTotal = () => {
        let total = 0;
        wishlist.forEach(item => {
            total += item.price * item.quantity;
        });
        return total.toFixed(2);
    };

    const retrieveImageById = (id) => {
        return imageObjects[id] || null; // Return the image if found, null otherwise
    };

    // Inside the deleteItem function
    const deleteItem = async (userId, itemId, index) => {
        try {
            await axios.post(`http://localhost:8000/wishlist/delete`, {
                userId: userId,
                itemId: itemId
            });
            const updatedWishlist = [...wishlist];
            updatedWishlist.splice(index, 1);
            setWishlist(updatedWishlist);
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    // Inside the incrementQuantity function
    const increaseQuantity = async (userId, itemId, index) => {
        try {
            const response = await axios.post(`http://localhost:8000/wishlist/increment`, {
                userId: userId,
                itemId: itemId
            });
            //console.log("check", response);
            const updatedItem = response.data;
            const updatedWishlist = [...wishlist];
            updatedWishlist[index] = updatedItem;
            setWishlist(updatedWishlist);
        } catch (error) {
            console.error("Error incrementing quantity:", error);
        }
    };

    // Inside the decrementQuantity function
    const decreaseQuantity = async (userId, itemId, index) => {
        try {
            const response = await axios.post(`http://localhost:8000/wishlist/decrement`, {
                userId: userId,
                itemId: itemId
            });
            const updatedItem = response.data;
            const updatedWishlist = [...wishlist];
            updatedWishlist[index] = updatedItem;
            setWishlist(updatedWishlist);
        } catch (error) {
            console.error("Error decrementing quantity:", error);
        }
    };

    const handleProceedToCheckout = () => {
        const totalAmount = calculateTotal();
        console.log(totalAmount);
    
        if (totalAmount == 0.00) {
            alert("Please add some items to the wishlist first.");
        } else {
            console.log(totalAmount);
            // Navigate to address page with totalAmount as state
            window.location.href = `/address?totalAmount=${totalAmount}`;
        }
    };
    

    //const{getTotalCartAmount,all_product,cartItems,removeFromCart} = useContext(ShopContext);
    return (
        <div className='cartitems'>
            <div className="cartitems-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {wishlist.map((item, index) => (
                <div key={item.itemId} className="cartitems-format cartitems-format-main">
                    <img src={retrieveImageById(item.itemId)} alt="" className='carticon-product-icon' />
                    <p>{item.title}</p>
                    <p>${item.price}</p>
                    <div className="cartitems-quantity-container">
                        <button className='cartitems-quantity-btn' onClick={() => decreaseQuantity(userId, item.itemId, index)}>-</button>
                        <span className='cartitems-quantity'>&nbsp;&nbsp;{item.quantity}&nbsp;&nbsp;</span>
                        <button className='cartitems-quantity-btn' onClick={() => increaseQuantity(userId, item.itemId, index)}>+</button>
                    </div>
                    <p>${item.price * item.quantity}</p>

                    <img className='cartitems-remove-icon' src={remove_icon} onClick={() => deleteItem(userId, item.itemId, index)} alt="" />
                </div>
            ))}
            <hr />
            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>Cart Totals</h1>
                    <div>
                        <div className="cartitems-total-item">
                            <p>Subtotal</p>
                            <p>Rs.{calculateTotal()}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3>Total</h3>
                            <h3>Rs.{calculateTotal()}</h3>
                        </div>
                    </div>
                    {/* <Link to='/address'><img className='heart' src={heart} alt="" /></Link>
                       <button onClick={handleProceedToCheckout}>PROCEED TO CHECKOUT</button>
                    <Link to='/Signup'><button className="login">Signup</button></Link> */}
                    
                       <button onClick={handleProceedToCheckout}>PROCEED TO CHECKOUT</button>
                    
                </div>
                <div className="cartitems-promocode">
                    <p>If you have a promo code, Enter it here</p>
                    <div className="cartitems-promobox">
                        <input type="text" placeholder='promo code' />
                        <button>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItems