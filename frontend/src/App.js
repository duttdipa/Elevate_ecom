// import './App.css';
// import Navbar from './Components/Navbar/Navbar';
// import { BrowserRouter,Routes,Route } from 'react-router-dom';
// import Shop from './Pages/Shop';
// import ShopCategory from './Pages/ShopCategory';
// import Product from './Pages/Product';
// import Cart from './Pages/Cart';
// import Signup from './Pages/Signup';
// import Footer from './Components/Footer/Footer';
// import men_banner from './Components/Assests/banner_mens.png'
// import women_banner from './Components/Assests/banner_women.png'
// import kids_banner from './Components/Assests/banner_kids.png'
// import Login from './Pages/Login';
// import Reviews from './Pages/Reviews';
// import Address from './Components/Address/Address';
// import OrderConfirmation from './Components/OrderConfirmation/OrderConfirmation';
// import AdminScreen from './Components/AdminScreen/AdminScreen';
// import NavAdmin from './Components/NavAdmin/NavAdmin';
// import AcceptedReqScreen from './Components/AcceptedReqScreen/AcceptedReqScreen';
// import RejectedReqScreen from './Components/RejectedReqScreen/RejectedReqScreen';


// function App() {
//   return (
//     <div>
//       <BrowserRouter>
//       <Navbar/> 
//       {/* <NavAdmin/> */}
//       <Routes>
//         <Route path='/' element={<Shop/>}/>
//         <Route path='/furnitures' element={<ShopCategory banner={men_banner} category="furnitures"/>}/>
//         <Route path='/accessories' element={<ShopCategory banner={women_banner} category="accessories"/>}/>
//         <Route path='/wallpaintings' element={<ShopCategory banner={kids_banner} category="wallpaintings"/>}/>
//         <Route path='/clock' element={<ShopCategory banner={kids_banner} category="clock"/>}/>
//         <Route path='/homedecor' element={<ShopCategory banner={kids_banner} category="homedecor"/>}/>
// <Route path='/product' element={<Product/>}>
//   <Route path=':productId' element={<Product/>}/>
// </Route>
//         <Route path='/cart' element={<Cart/>}/>
//         <Route path='/login' element={<Login/>}/>
//         <Route path='/Signup' element={<Signup/>}/>
//         <Route path='/reviews' element={<Reviews/>}/>
//         <Route path ='/address' element={<Address/>}/>
//         <Route path='/orderconfirmation' element={<OrderConfirmation/>}/>
//         </Routes>
//         <Routes>
//         <Route path='/adminscreen' element={<AdminScreen/>}/>
//         <Route path ='/acceptedreqscreen' element={<AcceptedReqScreen/>}/>
//         <Route path ='/rejectedreqscreen' element={<RejectedReqScreen/>}/>
//       </Routes>
//       <Footer />
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;

import './App.css';
import Navbar from './Components/Navbar/Navbar';
import NavAdmin from './Components/NavAdmin/NavAdmin';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import Signup from './Pages/Signup';
import Footer from './Components/Footer/Footer';
import men_banner from './Components/Assests/banner_mens.png';
import women_banner from './Components/Assests/banner_women.png';
import kids_banner from './Components/Assests/banner_kids.png';
import Login from './Pages/Login';
import Reviews from './Pages/Reviews';
import Address from './Components/Address/Address';
import OrderConfirmation from './Components/OrderConfirmation/OrderConfirmation';
import AdminScreen from './Components/AdminScreen/AdminScreen';
import AcceptedReqScreen from './Components/AcceptedReqScreen/AcceptedReqScreen';
import RejectedReqScreen from './Components/RejectedReqScreen/RejectedReqScreen';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Shop />
              </>
            }
          />
          <Route
            path="/furnitures"
            element={
              <>
                <Navbar />
                <ShopCategory banner={men_banner} category="furnitures" />
              </>
            }
          />
          <Route
            path="/accessories"
            element={
              <>
                <Navbar />
                <ShopCategory banner={women_banner} category="accessories" />
              </>
            }
          />
          <Route
            path="/wallpaintings"
            element={
              <>
                <Navbar />
                <ShopCategory banner={kids_banner} category="wallpaintings" />
              </>
            }
          />
          <Route
            path="/clock"
            element={
              <>
                <Navbar />
                <ShopCategory banner={kids_banner} category="clock" />
              </>
            }
          />
          <Route
            path="/homedecor"
            element={
              <>
                <Navbar />
                <ShopCategory banner={kids_banner} category="homedecor" />
              </>
            }
          />
          <Route
            path="/cart"
            element={
              <>
                <Navbar />
                <Cart />
              </>
            }
          />

          <Route
            path="/login"
            element={
              <>
                <Navbar />
                <Login />
              </>
            }
          />

          <Route
            path="/cart"
            element={
              <>
                <Navbar />
                <Cart />
              </>
            }
          />

          <Route
            path="/Signup"
            element={
              <>
                <Navbar />
                <Signup />
              </>
            }
          />

          <Route
            path="/reviews"
            element={
              <>
                <Reviews />
                <Cart />
              </>
            }
          />

          <Route
            path="/address"
            element={
              <>
                <Navbar />
                <Address />
              </>
            }
          />

          <Route
            path="/orderconfirmation"
            element={
              <>
                <Navbar />
                <OrderConfirmation />
              </>
            }
          />

          <Route
            path="/product/:productId"
            element={
              <>
                <Navbar />
                <Product/>
              </>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/address" element={<Address />} />
          <Route path="/orderconfirmation" element={<OrderConfirmation />} />

          {/* Admin Routes */}
          <Route
            path="/adminscreen"
            element={
              <>
                <NavAdmin />
                <AdminScreen />
              </>
            }
          />
          <Route
            path="/acceptedreqscreen"
            element={
              <>
                <NavAdmin />
                <AcceptedReqScreen />
              </>
            }
          />
          <Route
            path="/rejectedreqscreen"
            element={
              <>
                <NavAdmin />
                <RejectedReqScreen />
              </>
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
