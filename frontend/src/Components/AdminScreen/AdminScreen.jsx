// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AdminScreen = () => {
//   const [loading, setLoading] = useState(true);
//   const [productRequests, setProductRequests] = useState([]);

//   useEffect(() => {
//     // Simulate fetching product requests data
//     fetchProductRequests();
//   }, []);

//   const fetchProductRequests = async () => {
//     try {
//         const response = await axios.get('http://localhost:8000/products');
//         const requestedProducts = response.data.filter(product => product.status === 'requested');
//         console.log('here',requestedProducts)
//         setProductRequests(requestedProducts);
//         setLoading(false);
//     } catch (error) {
//         console.error('Error fetching product requests:', error);
//         }
//     };

//   return (
//     <div>
//       <h1>Hello Admin,</h1>
//       <h2>Welcome to Elevate!</h2>
//       <h3>Product Requests:</h3>
//       {loading ? (
//         <p>Loading...</p>
//       ) : productRequests.length === 0 ? (
//         <p>No Add Product requests Yet!</p>
//       ) : (
//         <ul>
//           {productRequests.map((request) => (
//             <li key={request._id}>
//               <h3>{request.name}</h3>
//               <p>Price: ${request.price}</p>
//               <p>Color: {request.color}</p>
//               <p>Size: {request.size}</p>
//               {request.RequestedBy ? ( // Check if requestedby exists before accessing its properties
//                 <p>Requested By: {request.RequestedBy.name} ({request.RequestedBy.email})</p>
//               ) : (
//                 <p>Requested By: Unknown</p> // Handle case where requestedby is undefined
//               )}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default AdminScreen;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminScreen.css'
import { Link } from 'react-router-dom';
import logo from '../Assests/elevate_logo.png'

const AdminScreen = () => {
  const [loading, setLoading] = useState(true);
  const [productRequests, setProductRequests] = useState([]);

  useEffect(() => {
    // Fetch product requests data
    fetchProductRequests();
  }, []);

  const fetchProductRequests = async () => {
    try {
      const response = await axios.get('http://localhost:8000/products');
      const requestedProducts = response.data.filter(product => product.status === 'requested');
      setProductRequests(requestedProducts);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product requests:', error);
    }
  };

  const acceptRequest = async (productId, requesterEmail, productName) => {
    try {
      await axios.post(`http://localhost:8000/products/${productId}/accept`, { status: 'accepted' });
      await sendEmail(requesterEmail, 'Request for ' + productName + ' Accepted', 'Congratulations!! Your request has been accepted.');
      fetchProductRequests(); // Refresh the product list
    } catch (error) {
      console.error('Error accepting product request:', error);
    }
  };

  const declineRequest = async (productId, requesterEmail, productName) => {
    try {
      await axios.post(`http://localhost:8000/products/${productId}/reject`, { status: 'rejected' });
      await sendEmail(requesterEmail, 'Request for ' + productName + ' Rejected', 'Unfortunately! Your request has been rejected. Donot loose hope.. You can request again if you think it was a mistake...');
      fetchProductRequests(); // Refresh the product list
    } catch (error) {
      console.error('Error declining product request:', error);
    }
  }

  const sendEmail = async (toEmail, subject, text) => {
    try {
      const response = await axios.post('http://localhost:8000/send-email', {
        toEmail,
        subject,
        text
      });
      console.log('Email sent successfully:', response.data);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
    <div className='admin'>
      <div className='virtual-nav'>
        <h1>Hello Admin,</h1>
        {/* <div className='virtual-links'>
          <Link to ='/acceptedreqscreen'><button>Accepted Requests</button></Link>
          <Link to ='/rejectedreqscreen'><button>Rejected Requests</button></Link>
        </div> */}
      </div>
      <h2>Welcome to Elevate!</h2>
      <div className='all-requests'>
        <h3>Product Requests</h3>
        <div className='requests'>
          {loading ? (
            <p>Loading...</p>
          ) : productRequests.length === 0 ? (
            <p>No Add Product requests Yet!</p>
          ) : (
            <ul>
              {productRequests.map((request) => (
                <li key={request._id}>
                  <h3>{request.name}</h3>
                  <p>Price:  ₹{request.price}</p>
                  <p>Color:  {request.color}</p>
                  <p>Size:  {request.size}</p>
                  {request.RequestedBy ? (
                    <p>Requested By:  {request.RequestedBy.name} ({request.RequestedBy.email})</p>
                  ) : (
                    <p>Requested By: Unknown</p>
                  )}
                  <div className='acceptrej'>
                    <button  onClick={() => acceptRequest(request._id, request.RequestedBy.email, request.name)} style={{ backgroundColor: 'green', color: 'white' }}>Accept</button>
                    <button  onClick={() => declineRequest(request._id, request.RequestedBy.email, request.name)} style={{ backgroundColor: 'red', color: 'white' }}>Reject</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminScreen;
