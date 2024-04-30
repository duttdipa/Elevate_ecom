// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './AcceptedReqScreen.css';
// import logo from '../Assests/elevate_logo.png'
// import { Link } from 'react-router-dom';

// const AcceptedReqScreen = () => {

//     const [acceptedRequests, setAcceptedRequests] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         fetchAcceptedRequests();
//     }, []);

//     const fetchAcceptedRequests = async () => {
//         try {
//             const response = await axios.get('http://localhost:8000/products');
//             const acceptedProducts = response.data.filter(product => product.status === 'accepted');
//             setAcceptedRequests(acceptedProducts);
//             setLoading(false);
//         } catch (error) {
//             console.error('Error fetching accepted requests:', error);
//         }
//     };

//   return (
//     <div className='admin-accepted'>
//       <div className='virtual-nav'>
//         <h1>Hello Admin,</h1>
//         {/* <div className='virtual-links'>
//           <Link to ='/adminscreen'><button>Requests</button></Link>
//           <Link to ='/rejectedreqscreen'><button>Rejected Requests</button></Link>
//         </div> */}
//       </div>
//       <h2>Welcome to Elevate!</h2>
//       <div className='accepted-all-requests'>
//         <h3>Product Requests</h3>
//         <div className='requests'>
//           {loading ? (
//             <p>Loading...</p>
//           ) : acceptedRequests.length === 0 ? (
//             <p>No Add Product requests Yet!</p>
//           ) : (
//             <ul>
//               {acceptedRequests.map((request) => (
//                 <li key={request._id}>
//                   <h3>{request.name}</h3>
//                   <p>Price: ₹{request.price}</p>
//                   <p>Color: {request.color}</p>
//                   <p>Size: {request.size}</p>
//                   {request.RequestedBy ? (
//                     <p>Requested By: {request.RequestedBy.name} ({request.RequestedBy.email})</p>
//                   ) : (
//                     <p>Requested By: Unknown</p>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AcceptedReqScreen

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../Assests/elevate_logo.png';
import { Link } from 'react-router-dom';

const AcceptedReqScreen = () => {
    const [acceptedRequests, setAcceptedRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAcceptedRequests();
    }, []);

    const fetchAcceptedRequests = async () => {
        try {
            const response = await axios.get('http://localhost:8000/products');
            const acceptedProducts = response.data.filter(product => product.status === 'accepted');
            setAcceptedRequests(acceptedProducts);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching accepted requests:', error);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ marginTop: '20px' }}>
                <h3>Product Requests Accepted : </h3>
                <div style={{ marginTop: '10px' }}>
                    {loading ? (
                        <p>Loading...</p>
                    ) : acceptedRequests.length === 0 ? (
                        <p>No Add Product requests Yet!</p>
                    ) : (
                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                            {acceptedRequests.map((request) => (
                                <li key={request._id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                                    <h3 style={{ marginTop: 0, marginBottom: '5px' }}>{request.name}</h3>
                                    <p style={{ margin: '5px 0' }}>Price: ₹{request.price}</p>
                                    <p style={{ margin: '5px 0' }}>Color: {request.color}</p>
                                    <p style={{ margin: '5px 0' }}>Size: {request.size}</p>
                                    {request.RequestedBy ? (
                                        <p style={{ margin: '5px 0' }}>Requested By: {request.RequestedBy.name} ({request.RequestedBy.email})</p>
                                    ) : (
                                        <p style={{ margin: '5px 0' }}>Requested By: Unknown</p>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AcceptedReqScreen;
