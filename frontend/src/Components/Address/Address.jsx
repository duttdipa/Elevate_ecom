import React, { useState, useEffect } from 'react'
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage";
import Alert from "react-dom"
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Address.css'



const Address = () => {
  const [name, setName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [street, setStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [selectedAddress, setSelectedAddress] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [userId, setUserId] = useState('')
  const [addresses, setAddresses] = useState([]);
  const location = useLocation();
  const totalAmount = new URLSearchParams(location.search).get('totalAmount');
  const [addressToSend,setAddressToSend]=useState('')


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
            fetchAddresses(userId1);
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
    fetchAddresses(userId);
  }, []);

  const fetchAddresses = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/addresses/${userId}`
      );
      const { addresses } = response.data;
      console.log("hey1", addresses)

      setAddresses(addresses);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleaddress = (address) => {
    setSelectedAddress(address)
    setAddressToSend(address)
  }

  const handleAddAddress = async () => {

    let addressToSend1;

    if (selectedAddress && selectedOption) {
      // If selectedAddress is not empty, use its details
      addressToSend1 = selectedAddress;
    } else {

      // Validation checks
      if (!name || !mobileNo || !houseNo || !street || !landmark || !postalCode || !selectedOption) {
        // If any of the required fields are empty, show an alert
        alert("Please fill in all the fields to proceed.");
        return;
      }
      // If selectedAddress is empty, use the details recently entered by the user
      addressToSend1 = {
        name,
        mobileNo,
        houseNo,
        street,
        landmark,
        postalCode
      };
    }
    setAddressToSend(addressToSend1)

    console.log("addressto send", addressToSend1)

    try {
      // Fetch the user's wishlist
      const wishlistResponse = await axios.get(`http://localhost:8000/users/${userId}/wishlist`);
      const wishlist = wishlistResponse.data;
      console.log("abc-->", wishlist)
      if(wishlist.length<1){
        alert("Your wishlist is empty. Please add some items");
        return;
      }

      if (!selectedAddress) {
        
      const address = {
        name,
        mobileNo,
        houseNo,
        street,
        landmark,
        postalCode
      }
      console.log("address", address)

      axios.post("http://localhost:8000/addresses", { userId, address }).then((response) => {
        console.log("Success", "Addresses added successfully");
        setName("");
        setMobileNo("");
        setHouseNo("");
        setStreet("");
        setLandmark("");
        setPostalCode("");

      }).catch((error) => {
        Alert.alert("Error", "Failed to add address")
        console.log("error", error)
      })
    }

      // Create the order data
      const orderData = {
        userId: userId,
        cartItems: wishlist, // Use the wishlist data instead of the cart
        totalPrice: totalAmount,
        shippingAddress: addressToSend1,
        paymentMethod: selectedOption,
      };

      // Send the order request
      const response = await axios.post(
        "http://localhost:8000/orders",
        orderData
      );
      console.log("response-->>", response)

      if (response.status === 200) {
        // Clear the wishlist after successfully creating the order
        await axios.delete(`http://localhost:8000/wishlist/${userId}`);


        console.log("Order created successfully", response.data);
        window.location.href = `/orderconfirmation`;
      } else {
        console.log("Error creating order", response.data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (

    <div className="address-page">
      <div className="address-container">
        {/* <div className="section">
          <h2>Existing Addresses</h2>
          <ul>
            {addresses.map((address) => (
              <li key={address.addressId} onClick={() => setSelectedAddress(address)}>
                {address.name}, {address.houseNo}, {address.street}, {address.landmark}, {address.postalCode}
              </li>
            ))}
          </ul>
        </div> */}

        <div className="section">
          <h2>Existing Addresses</h2>
            {addresses.map((address) => (
              <label key={address.addressId}>
                <input
                  type="radio"
                  value={address.addressId}
                  name="existingAddress"
                  onChange={() => handleaddress(address)}
                />
                {address.name}, {address.houseNo}, {address.street}, {address.landmark}, {address.postalCode}
              </label>
            ))}
            <hr />
        </div>

        {selectedAddress==='' && <div className="section">
          <h2>Add a new Address</h2>
          <div className = "inner-div">
            <input type="text" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="number" placeholder="Mobile number" value={mobileNo} onChange={(e) => {
              const inputText = e.target.value;
              if (inputText.length <= 10 && inputText.length > 0) {
                setMobileNo(inputText);
            }
            }} />
          </div>
          <div className = "inner-div">
            <input type="text" placeholder="Flat, house no, building, company" value={houseNo} onChange={(e) => setHouseNo(e.target.value)} />
            <input type="text" placeholder="Area, street, sector, village" value={street} onChange={(e) => setStreet(e.target.value)} />
          </div>
          <div className = "inner-div">
            <input type="text" placeholder="Landmark" value={landmark} onChange={(e) => setLandmark(e.target.value)} />
            <input type="number" placeholder="Pincode" value={postalCode} onChange={(e) => {
              const inputText = e.target.value;
              if (inputText.length <= 6 && inputText.length > 0) {
                setPostalCode(inputText);
            }
            }}/>
          </div>
          <hr />
        </div>}


        <div className="section">
          <h2>Select your Payment Method</h2>
          <div className='inner-radio'>
              <label>
              <input type="radio" value="Cash on Delivery" className='radio-size' checked={selectedOption === "Cash on Delivery"} onChange={() => setSelectedOption("Cash on Delivery")} />
              Cash on Delivery
            </label>
            <label>
              <input type="radio" value="UPI/Credit or debit card" className='radio-size' checked={selectedOption === "UPI/Credit or debit card"} onChange={() => setSelectedOption("UPI/Credit or debit card")} />
              UPI/ Credit or Debit card
            </label>
          </div>
          <hr />
        </div>

        <div className="section">
          <h2>Order now</h2>
          {/* <p>Shipping to <b>{addressToSend.name}</b></p> */}
          <p>Shipping to {addressToSend.name ? <b>{addressToSend.name}</b> : <b>{name}</b>}</p>
          <p><span>Tomorrow by 10pm</span> - FREE delivery with your Prime membership</p>
          <div className='pay-page fade'><p>Items : </p><p>₹{totalAmount}</p></div>
          <div className='pay-page fade'><p>Delivery : </p><p>₹0</p></div>
          <div className='pay-page'><p>Order Total: </p><p className='red'>₹{totalAmount}</p></div>
          <button onClick={handleAddAddress}>Place your order</button>
        </div>    

      </div>
    </div>
  );
};

export default Address