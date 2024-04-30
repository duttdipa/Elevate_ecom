// import React, { useState } from 'react';
// import './CSS/Reviews.css'

// const Reviews = () => {
//   const [reviews, setReviews] = useState([]);
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');
//   const [rating, setRating] = useState(0);
  

//   const handleNameChange = (e) => {
//     setName(e.target.value);
//   };

//   const handleDescriptionChange = (e) => {
//     setDescription(e.target.value);
//   };

//   const handleRatingChange = (newRating) => {
//     setRating(newRating);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     setName('');
//     setDescription('');
//     setRating(0);
//   };

//   return (
//     <div className='reviews-container'>
//       <h2>Customer Reviews</h2>
//       <div className='stars'>
//           {[1, 2, 3, 4, 5].map((star) => (
//             <span key={star} onClick={() => handleRatingChange(star)} style={{ cursor: 'pointer' }}>
//               {star <= rating ? '★' : '☆'}
//             </span>
//           ))}
//         </div>
//       <form className="details" onSubmit={handleSubmit}>
//         <input type="text" placeholder="Your Name"
//           value={name}
//           onChange={handleNameChange}
//           required
//         />
//         <textarea
//           placeholder="Write your review..."
//           value={description}
//           onChange={handleDescriptionChange}
//           required
//         />
        
//         <button type="submit">Submit Review</button>
//       </form>

//       <div>
//         {reviews.map((review, index) => (
//           <div key={index}>
//             <h3>{review.name}</h3>
//             <p>{review.description}</p>
//             <p>Rating: {review.rating}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Reviews;

import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import './CSS/Reviews.css';
import { useLocation } from 'react-router-dom';

const Reviews = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(0);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const productId = searchParams.get('productId');

   console.log("check-->",productId);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      console.log("productid-->",rating)
      const response = await axios.post(`http://localhost:8000/product/${productId}/addreview`, { // Ensure the URL matches the backend endpoint
        author: name,
        comment: description,
        rating: rating,
      });
      console.log('Review added:', response.data);
      // Assuming you have navigation defined somewhere
      // navigation.goBack(); // Go back to the previous screen after adding the review
    } catch (error) {
      console.error('Error adding review:', error);
    }

    setName('');
    setDescription('');
    setRating(0);
  };

  return (
    <div className='reviews'>
      <div className="reviews-container">
        <h1>Customer Reviews</h1>
        <div className='stars'>
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} onClick={() => handleRatingChange(star)} style={{ cursor: 'pointer' }}>
                {star <= rating ? '★' : '☆'}
              </span>
            ))}
          </div>
        <form className="details" onSubmit={handleSubmit}>
          <input type="text" placeholder="Your Name" value={name} onChange={handleNameChange} required/>
          <textarea placeholder="Write your review..." value={description} onChange={handleDescriptionChange} required/>
          <button type="submit">Submit Review</button>
        </form>

        {/* <div>
          {reviews.map((review, index) => (
            <div key={index}>
              <h3>{review.name}</h3>
              <p>{review.description}</p>
              <p>Rating: {review.rating}</p>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default Reviews;
