import React, { useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from 'axios'
import logo from '../Assests/elevate_logo.png'
import { Link, useLocation } from "react-router-dom"
import './NavAdmin.css'

const NavAdmin = () => {
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

    const handleExploreMore = (category) => {
        setMenu(category);
    };

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

    return (
        <div className="navadmin">
            <div className="nav-logo">
                <img src={logo} alt="" />
                <p>ELEVATE</p>
            </div>
            <ul className="nav-menu">
                <li onClick={() => { setMenu("requested") }}><Link style={{ textDecoration: 'none' }} to='/adminscreen'>Requests</Link>{menu === "requested" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("accepted") }}><Link style={{ textDecoration: 'none' }} to='/acceptedreqscreen'>Accepted Requests</Link>{menu === "accepted" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("rejected") }}><Link style={{ textDecoration: 'none' }} to='/rejectedreqscreen'>Rejected Requests</Link>{menu === "rejected" ? <hr /> : <></>}</li>
            </ul>
            <div className="navadmin-logout">
            <Link to='/'><button>Logout</button></Link>

            </div>
        </div>
    )
}

export default NavAdmin





