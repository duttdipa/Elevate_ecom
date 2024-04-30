// import React, { createContext, useState } from 'react';
// import all_product from '../Components/Assests/all_product';



// export const ShopContext = createContext(null);

// const getDefaultCart = ()=>{
//     let cart = {};
//     for (let index = 0; index < all_product.length+1; index++){
//         cart[index] = 0;
//     }
//     return cart;
// }


// const ShopContextProvider = (props) => {

//     const [cartItems,setCartItems] = useState(getDefaultCart());
    
//     const addToCart = (itemId) =>{
//         setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}));
//         console.log(cartItems);
//     }

//     const removeFromCart = (itemId) =>{
//         setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
//     }


//     const getTotalCartAmount = () => {
//         let totalAmount = 0;
//         for(const item in cartItems)
//         {
//             if(cartItems[item]>0)
//             {
//                 let itemInfo = all_product.find((product)=>product.id===Number(item));
//                 totalAmount += itemInfo.new_price * cartItems[item];
//             }
//         }
//         return totalAmount;
//     }

//     const getTotalCartItems = () =>{
//         let totalItem = 0;
//         for(const item in cartItems)
//         {
//            if(cartItems[item]>0)
//            {
//             totalItem += cartItems[item];
//            } 
//         }
//         return totalItem;
//     }

//     const contextValue = {getTotalCartItems,getTotalCartAmount,all_product,cartItems,addToCart,removeFromCart};

//     return(
//         <ShopContext.Provider value={contextValue}>
//             {props.children}
//         </ShopContext.Provider>
//     )
// }

// export default ShopContextProvider;

// import React, { createContext, useState } from 'react';
// import all_product from '../Components/Assests/all_product';

// export const ShopContext = createContext(null);

// const getDefaultCart = () => {
//     let cart = {};
//     for (let index = 0; index < all_product.length + 1; index++) {
//         cart[index] = 0;
//     }
//     return cart;
// };

// const ShopContextProvider = (props) => {

//     const [cartItems, setCartItems] = useState(getDefaultCart());

//     const addToCart = (itemId, quantity) => { // Modify addToCart to accept quantity
//         setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + quantity }));
//         console.log(cartItems);
//     };

//     const removeFromCart = (itemId) => {
//         setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
//     };

//     const getTotalCartAmount = () => {
//         let totalAmount = 0;
//         for (const item in cartItems) {
//             if (cartItems[item] > 0) {
//                 let itemInfo = all_product.find((product) => product.id === Number(item));
//                 totalAmount += itemInfo.new_price * cartItems[item];
//             }
//         }
//         return totalAmount;
//     };

//     const getTotalCartItems = () => {
//         let totalItem = 0;
//         for (const item in cartItems) {
//             if (cartItems[item] > 0) {
//                 totalItem += cartItems[item];
//             }
//         }
//         return totalItem;
//     };

//     const contextValue = { getTotalCartItems, getTotalCartAmount, all_product, cartItems, addToCart, removeFromCart };

//     return (
//         <ShopContext.Provider value={contextValue}>
//             {props.children}
//         </ShopContext.Provider>
//     );
// };

// export default ShopContextProvider;

import React, { createContext, useState } from 'react';
import all_product from '../Components/Assests/all_product';

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < all_product.length + 1; index++) {
        cart[index] = 0;
    }
    return cart;
};

const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(getDefaultCart());
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to keep track of user login status

    const addToCart = (itemId, quantity) => { // Modify addToCart to accept quantity
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + quantity }));
        console.log(cartItems);
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item));
                totalAmount += itemInfo.new_price * cartItems[item];
            }
        }
        return totalAmount;
    };

    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    };

    const setLoginStatus = () => {
        setIsLoggedIn(true);
    };

    const contextValue = { 
        getTotalCartItems, 
        getTotalCartAmount, 
        all_product, 
        cartItems, 
        addToCart, 
        removeFromCart,
        isLoggedIn, // Include isLoggedIn in the context value
        setLoginStatus // Function to set isLoggedIn state
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
