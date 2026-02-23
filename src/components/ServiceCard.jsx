// import React, { useState } from "react";

// // Helper to format price in Naira
// const formatNaira = (amount) => {
//   if (amount === null || amount === undefined) return "Price N/A";
//   return `₦${Number(amount).toLocaleString()}`;
// };

// const ServiceCard = ({ service, onBuy, disabled }) => {
//   const [buying, setBuying] = useState(false);

//   const handleBuyClick = () => {
//     if (disabled || buying || service.price == null) return;

//     setBuying(true);
//     onBuy(service, () => setBuying(false));
//   };

//   // Disable button if:
//   // 1️⃣ Explicit disabled prop
//   // 2️⃣ Service has no price (N/A)
//   // 3️⃣ Already buying
//   const isDisabled = disabled || service.price == null || buying;

//   return (
//     <div className={`service-card ${isDisabled ? "disabled" : ""}`}>
//       <div className="service-left">
//         {service.icon && (
//           <img
//             src={service.icon}
//             alt={service.name}
//             style={{ width: "42px", height: "42px", objectFit: "contain" }}
//           />
//         )}
//         <div>
//           <h4>{service.name}</h4>
//           {service.stock !== undefined && (
//             <span className="stock">{service.stock} Stocks</span>
//           )}
//         </div>
//       </div>

//       <div className="service-right">
//         {/* Formatted price */}
//         <span className="price">{formatNaira(service.price)}</span>

//         <button
//           onClick={handleBuyClick}
//           disabled={isDisabled}
//           className={isDisabled ? "disabled-btn" : ""}
//         >
//           {buying ? (
//             <div className="button-spinner"></div>
//           ) : service.price == null ? (
//             "Not Available"
//           ) : isDisabled ? (
//             "Insufficient Balance"
//           ) : (
//             "Buy Number"
//           )}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ServiceCard;


import React, { useState } from "react";

// Helper to format price in Naira
const formatNaira = (amount) => {
  if (amount === null || amount === undefined) return "Price N/A";
  return `₦${Number(amount).toLocaleString()}`;
};

const ServiceCard = ({ service, onBuy, disabled }) => {
  const [buying, setBuying] = useState(false);

  const handleBuyClick = () => {
    if (disabled || buying || service.price == null || service.stock === 0) return;
    setBuying(true);
    onBuy(service, () => setBuying(false));
  };

  const isDisabled =
    disabled || service.price == null || buying || service.stock === 0;

  return (
    <div className={`service-card ${isDisabled ? "disabled" : ""}`}>
      <div className="service-left">
        {service.icon && (
          <img
            src={service.icon}
            alt={service.name}
            style={{ width: "42px", height: "42px", objectFit: "contain" }}
          />
        )}
        <div>
          <h4>{service.name}</h4>
          <span className="stock">
            {service.stock === 0
              ? "Out of Stock"
              : service.stock > 0
              ? `${service.stock} Stocks`
              : "Unknown"}
          </span>
        </div>
      </div>

      <div className="service-right">
        <span className="price">{formatNaira(service.price)}</span>
        <button
          onClick={handleBuyClick}
          disabled={isDisabled}
          className={isDisabled ? "disabled-btn" : ""}
        >
          {buying ? (
            <div className="button-spinner"></div>
          ) : service.price == null ? (
            "Not Available"
          ) : service.stock === 0 ? (
            "Out of Stock"
          ) : isDisabled ? (
            "Insufficient Balance"
          ) : (
            "Buy Number"
          )}
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;

