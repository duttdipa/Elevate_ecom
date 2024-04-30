// import React, { useState, useEffect } from 'react';
// import axios from 'axios';


// const RejectedReqScreen = () => {

//   const [rejectedRequests, setRejectedRequests] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         fetchRejectedRequests();
//     }, []);

//     const fetchRejectedRequests = async () => {
//         try {
//             const response = await axios.get('http://localhost:8000/products');
//             const rejectedProducts = response.data.filter(product => product.status === 'rejected');
//             setRejectedRequests(rejectedProducts);
//             setLoading(false);
//         } catch (error) {
//             console.error('Error fetching rejected requests:', error);
//         }
//     };
//   return (
//     <div>
//       <h1>Hello Admin,</h1>
//       <h2>Welcome to Elevate!</h2>
//       <h3>Product Requests:</h3>
//       {loading ? (
//         <p>Loading...</p>
//       ) : rejectedRequests.length === 0 ? (
//         <p>No Add Product requests Yet!</p>
//       ) : (
//         <ul>
//           {rejectedRequests.map((request) => (
//             <li key={request._id}>
//               <h3>{request.name}</h3>
//               <p>Price: ${request.price}</p>
//               <p>Color: {request.color}</p>
//               <p>Size: {request.size}</p>
//               {request.RequestedBy && (
//                 <p>Requested By: {request.RequestedBy.name} ({request.RequestedBy.email})</p>
//               ) }
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default RejectedReqScreen

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RejectedReqScreen = () => {
    const [rejectedRequests, setRejectedRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRejectedRequests();
    }, []);

    const fetchRejectedRequests = async () => {
        try {
            const response = await axios.get('http://localhost:8000/products');
            const rejectedProducts = response.data.filter(product => product.status === 'rejected');
            setRejectedRequests(rejectedProducts);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching rejected requests:', error);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h3>Product Requests Rejected :</h3>
            {loading ? (
                <p>Loading...</p>
            ) : rejectedRequests.length === 0 ? (
                <p>No Add Product requests Yet!</p>
            ) : (
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {rejectedRequests.map((request) => (
                        <li key={request._id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                            <h3 style={{ marginTop: 0 }}>{request.name}</h3>
                            <p>Price: ${request.price}</p>
                            <p>Color: {request.color}</p>
                            <p>Size: {request.size}</p>
                            {request.RequestedBy && (
                                <p>Requested By: {request.RequestedBy.name} ({request.RequestedBy.email})</p>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default RejectedReqScreen;
