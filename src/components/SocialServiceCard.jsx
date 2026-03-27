// import React, { useState } from "react";

// // Format price
// const formatNaira = (amount) => {
//   if (amount === null || amount === undefined) return "Price N/A";
//   return `₦${Number(amount).toLocaleString()}`;
// };

// const SocialServiceCard = ({ product, onBuy, disabled }) => {
//   const [buying, setBuying] = useState(false);

//   const handleBuyClick = () => {
//     if (disabled || buying || product.price == null) return;

//     setBuying(true);
//     onBuy(product, () => setBuying(false));
//   };

//   const isDisabled = disabled || product.price == null || buying;

//   return (
//     <div className={`service-card ${isDisabled ? "disabled" : ""}`}>
      
//       {/* LEFT SIDE */}
//       <div className="service-left">
//         {product.icon && (
//           <img
//             src={product.icon}
//             alt={product.name}
//             className="service-icon"
//           />
//         )}

//         <div className="service-info">
//           <h4>{product.name}</h4>

//           {/* ✅ FIXED: clean layout */}
//           <div className="meta-row">
//             {product.type && (
//               <span className="type">{product.type}</span>
//             )}

//             {product.stock !== undefined && (
//               <span
//                 className={`stock ${
//                   product.stock < 5 ? "low" : ""
//                 }`}
//               >
//                 {product.stock} in stock
//               </span>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* RIGHT SIDE */}
//       <div className="service-right">
//         <span className="price">{formatNaira(product.price)}</span>

//         <button
//           onClick={handleBuyClick}
//           disabled={isDisabled}
//           className={isDisabled ? "disabled-btn" : ""}
//         >
//           {buying ? (
//             <div className="button-spinner"></div>
//           ) : product.price == null ? (
//             "Not Available"
//           ) : isDisabled ? (
//             "Unavailable"
//           ) : (
//             "Buy Account"
//           )}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SocialServiceCard;

import React, { useState } from "react";

// Format price
const formatNaira = (amount) => {
  if (amount === null || amount === undefined) return "Price N/A";
  return `₦${Number(amount).toLocaleString()}`;
};

const SocialServiceCard = ({ product, onBuy, disabled }) => {
  const [buying, setBuying] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Increase/decrease quantity (cannot exceed stock)
  const increase = () => {
    if (product.stock !== undefined && quantity < product.stock) {
      setQuantity((q) => q + 1);
    }
  };
  const decrease = () => {
    if (quantity > 1) setQuantity((q) => q - 1);
  };

  const handleBuyClick = () => {
    if (disabled || buying || product.price == null) return;

    setBuying(true);
    onBuy(product, () => setBuying(false), quantity); // pass quantity
  };

  const isDisabled = disabled || product.price == null || buying;

  return (
    <div className={`service-card ${isDisabled ? "disabled" : ""}`}>
      
      {/* LEFT SIDE */}
      <div className="service-left">
        {product.icon && (
          <img
            src={product.icon}
            alt={product.name}
            className="service-icon"
          />
        )}

        <div className="service-info">
          <h4>{product.name}</h4>

          {/* ✅ Meta row */}
          <div className="meta-row">
            {product.type && <span className="type">{product.type}</span>}

            {product.stock !== undefined && (
              <span className={`stock ${product.stock < 5 ? "low" : ""}`}>
                {product.stock} in stock
              </span>
            )}
          </div>

          {/* Quantity selector */}
          {product.stock > 0 && (
            <div className="quantity-selector">
              <button onClick={decrease} disabled={quantity <= 1}>
                -
              </button>
              <input type="number" value={quantity} readOnly />
              <button
                onClick={increase}
                disabled={quantity >= product.stock}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="service-right">
        <span className="price">{formatNaira(product.price)}</span>

        <button
          onClick={handleBuyClick}
          disabled={isDisabled}
          className={isDisabled ? "disabled-btn" : ""}
        >
          {buying ? (
            <div className="button-spinner"></div>
          ) : product.price == null ? (
            "Not Available"
          ) : isDisabled ? (
            "Unavailable"
          ) : (
            `Buy ${quantity}`
          )}
        </button>
      </div>
    </div>
  );
};

export default SocialServiceCard;
