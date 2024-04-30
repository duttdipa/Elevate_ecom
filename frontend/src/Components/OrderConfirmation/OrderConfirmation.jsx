// // import React, { useState, useEffect } from 'react';

// // const OrderConfirmation = () => {
// //   const [showTick, setShowTick] = useState(true);

// //   useEffect(() => {
// //     const timer = setTimeout(() => {
// //       setShowTick(false);
// //       setTimeout(() => {
// //         window.location.href = `/`;
// //       }, 1000);
// //     }, 3000);

// //     return () => clearTimeout(timer);
// //   }, []);

// //   return (
// //     <div>
// //       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40vh', fontSize: '6rem' }}>
// //         {showTick && '✓'}
// //       </div>
// //       <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh', fontSize: '1rem' }}>Your Order has been placed Successfully</p>
// //     </div>
// //   );
// // };

// // export default OrderConfirmation;

import React, { useEffect } from "react";
import Lottie from "react-lottie";
import thumbsAnimationData from "../Assests/thumbs.json";
import sparkleAnimationData from "../Assests/sparkle.json";

const OrderConfirmation = () => {

  useEffect(() => {
    const timeout = setTimeout(() => {
      window.location.href = `/`;
    }, 4300);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div style={{ backgroundColor: "white", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <Lottie options={{ animationData: thumbsAnimationData }} height={260} width={300} isStopped={false} isPaused={false} />
      <p style={{ marginTop: 20, fontSize: 19, fontWeight: "600", textAlign: "center" }}>Your Order Has been Received</p>
      <Lottie options={{ animationData: sparkleAnimationData }} height={300} width={300} isStopped={false} isPaused={false} style={{ position: "absolute", top: 100 }} />
    </div>
  );
};

export default OrderConfirmation;
