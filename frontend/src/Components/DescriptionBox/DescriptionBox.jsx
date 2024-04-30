

// import React, { useState, useEffect } from 'react';
// import './DescriptionBox.css';
// import { Link } from 'react-router-dom';

// const DescriptionBox = (props) => {
//   const [selectedOption, setSelectedOption] = useState('description');
//   const { product } = props;
//   const [productDetails, setProductDetails] = useState(null);

//   const handleOptionChange = (option) => {
//     setSelectedOption(option);
//   };

//   useEffect(() => {
//     const fetchProductDetails = async () => {
//       try {
//         console.log('Fetching product details...');
//         const productResponse = await fetch(`http://localhost:8000/product/${product.id}/reviews`);
  
//         if (!productResponse.ok) {
//           throw new Error(`Network response was not ok`);
//         }
  
//         const productData = await productResponse.json();
//         console.log('Product details received:', productData);
//         setProductDetails(productData);
//       } catch (error) {
//         console.error("Error fetching product details:", error);
//       }
//     };
  
//     // Fetch product details from the server when the component mounts
//     fetchProductDetails();
//   }, [product]);
  
//   const renderStars = (rating) => {
//     const fullStars = Math.floor(rating);
//     const halfStar = rating - fullStars >= 0.5 ? 1 : 0;
//     const emptyStars = 5 - fullStars - halfStar;
//     const stars = [];

//     for (let i = 0; i < fullStars; i++) {
//       stars.push(<span key={i} className="star">&#9733;</span>);
//     }
//     if (halfStar === 1) {
//       stars.push(<span key={fullStars} className="star">&#9734;</span>);
//     }
//     for (let i = 0; i < emptyStars; i++) {
//       stars.push(<span key={fullStars + halfStar + i} className="star empty">&#9734;</span>);
//     }
//     return stars;
//   };

//   return (
//     <div className='descriptionbox'>
//       <div className="descriptionbox-navigator">
//         <div className={`descriptionbox-nav-box ${selectedOption === 'description' ? 'active' : ''}`} onClick={() => handleOptionChange('description')}>
//           Description
//         </div>
//         <div className={`descriptionbox-nav-box ${selectedOption === 'reviews' ? 'active' : ''}`} onClick={() => handleOptionChange('reviews')}>
//           Reviews
//         </div>
//       </div>
//       <div className="descriptionbox-content">
//         {selectedOption === 'description' && (
//           <div className="descriptionbox-description">
//             <p>{product.description}</p>
//           </div>
//         )}
//         {selectedOption === 'reviews' && productDetails && productDetails.reviews && (
//           <div className="descriptionbox-reviews">
//             <h2>Customer Reviews</h2>
//             {productDetails.reviews.length > 0 ? (
//               <div className="review-container">
//                 {productDetails.reviews.map((review, index) => (
//                   <div key={index} className="review-card">
//                     <div className="rating">{renderStars(review.rating)}</div>
//                     <p className="author">By: {review.author}</p>
//                     <p className="comment">{review.comment}</p>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p>No reviews yet.</p>
//             )}
//             <button><Link to={`/reviews?productId=${product.id}`} className="add-review">Add Reviews</Link></button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DescriptionBox;



import React, { useState, useEffect } from 'react';
import './DescriptionBox.css';
import { Link } from 'react-router-dom';

const DescriptionBox = (props) => {
  const [selectedOption, setSelectedOption] = useState('description');
  const { product } = props;
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        console.log('Fetching product details...');
        const productResponse = await fetch(`http://localhost:8000/product/${product.id}/reviews`);
  
        if (!productResponse.ok) {
          console.error('Network response was not ok');
          return;
        }
  
        const productData = await productResponse.json();
        console.log('Product details received:', productData);
        setProductDetails(productData);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };
  
    // Fetch product details from the server when the component mounts
    fetchProductDetails();
  }, [product]);
  
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star">&#9733;</span>);
    }
    if (halfStar === 1) {
      stars.push(<span key={fullStars} className="star">&#9734;</span>);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={fullStars + halfStar + i} className="star empty">&#9734;</span>);
    }
    return stars;
  };

  return (
    <div className='descriptionbox'>
      <div className="descriptionbox-navigator">
        <div className={`descriptionbox-nav-box ${selectedOption === 'description' ? 'active' : ''}`} onClick={() => handleOptionChange('description')}>
          Description
        </div>
        <div className={`descriptionbox-nav-box ${selectedOption === 'reviews' ? 'active' : ''}`} onClick={() => handleOptionChange('reviews')}>
          Reviews
        </div>
      </div>
      <div className="descriptionbox-content">
        {selectedOption === 'description' && (
          <div className="descriptionbox-description">
            <p>{product.description}</p>
          </div>
        )}
        {selectedOption === 'reviews' && (
          <div className="descriptionbox-reviews">
            <h2>Customer Reviews</h2>
            {loading && <p>Loading...</p>}
            {!loading && !productDetails?.reviews?.length && <p>No reviews yet.</p>}
            {!loading && productDetails?.reviews?.length > 0 && (
              <div className="review-container">
                {productDetails.reviews.map((review, index) => (
                  <div key={index} className="review-card">
                    <div className="rating">{renderStars(review.rating)}</div>
                    <p className="author">By: {review.author}</p>
                    <p className="comment">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
            <button><Link to={`/reviews?productId=${product.id}`} className="add-review">Add Reviews</Link></button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DescriptionBox;
