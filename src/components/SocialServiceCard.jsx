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

//     // Allow parent to stop loading
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
//             style={{ width: "42px", height: "42px", objectFit: "contain" }}
//           />
//         )}

//         <div>
//           <h4>{product.name}</h4>

//           {/* Optional details */}
//           {product.type && (
//             <span className="type">{product.type}</span>
//           )}

//           {product.stock !== undefined && (
//             <span className="stock">{product.stock} in stock</span>
//           )}
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

  const handleBuyClick = () => {
    if (disabled || buying || product.price == null) return;

    setBuying(true);
    onBuy(product, () => setBuying(false));
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

          {/* ✅ FIXED: clean layout */}
          <div className="meta-row">
            {product.type && (
              <span className="type">{product.type}</span>
            )}

            {product.stock !== undefined && (
              <span
                className={`stock ${
                  product.stock < 5 ? "low" : ""
                }`}
              >
                {product.stock} in stock
              </span>
            )}
          </div>
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
            "Buy Account"
          )}
        </button>
      </div>
    </div>
  );
};

export default SocialServiceCard;
