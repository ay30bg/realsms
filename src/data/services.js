// // import WhatsAppIcon from "../assets/whatsapp.png";
// // import FacebookIcon from "../assets/facebook.png";
// // import TelegramIcon from "../assets/telegram.png";
// // import TwitterIcon from "../assets/twitter.png";

// // // List of available servers with country codes
// // export const servers = [
// //   { id: 1, name: "Nigeria", countryCode: "+234" },
// //   { id: 2, name: "USA", countryCode: "+1" },
// //   { id: 3, name: "UK", countryCode: "+44" },
// //   { id: 4, name: "India", countryCode: "+91" },
// // ];

// // // List of services with serverId linking them to a server
// // export const services = [
// //   // Nigeria
// //   { id: 1, name: "WhatsApp", price: 500, serverId: 1, stock: 15, icon: WhatsAppIcon },
// //   { id: 2, name: "Facebook", price: 400, serverId: 1, stock: 12, icon: FacebookIcon },
// //   { id: 3, name: "Telegram", price: 350, serverId: 1, stock: 10, icon: TelegramIcon },

// //   // USA
// //   { id: 4, name: "WhatsApp", price: 800, serverId: 2, stock: 8, icon: WhatsAppIcon },
// //   { id: 5, name: "Facebook", price: 700, serverId: 2, stock: 6, icon: FacebookIcon },
// //   { id: 6, name: "X / Twitter", price: 900, serverId: 2, stock: 5, icon: TwitterIcon },

// //   // UK
// //   { id: 7, name: "WhatsApp", price: 750, serverId: 3, stock: 7, icon: WhatsAppIcon },
// //   { id: 8, name: "Telegram", price: 600, serverId: 3, stock: 4, icon: TelegramIcon },
// //   // India
// //   { id: 9, name: "WhatsApp", price: 400, serverId: 4, stock: 20, icon: WhatsAppIcon },
// //   { id: 10, name: "Facebook", price: 350, serverId: 4, stock: 18, icon: FacebookIcon },
// // ];

// import WhatsAppIcon from "../assets/whatsapp.png";
// import FacebookIcon from "../assets/facebook.png";
// import TelegramIcon from "../assets/telegram.png";
// import TwitterIcon from "../assets/twitter.png";

// // Servers WITH 5sim country slug
// export const servers = [
//   { id: 1, name: "Nigeria", countryCode: "+234", slug: "nigeria" },
//   { id: 2, name: "USA", countryCode: "+1", slug: "usa" },
//   { id: 3, name: "UK", countryCode: "+44", slug: "uk" },
//   { id: 4, name: "India", countryCode: "+91", slug: "india" },
// ];

// // Services WITH 5sim service slug
// export const services = [
//   // Nigeria
//   { id: 1, name: "WhatsApp", price: 500, serverId: 1, stock: 15, icon: WhatsAppIcon, slug: "whatsapp" },
//   { id: 2, name: "Facebook", price: 400, serverId: 1, stock: 12, icon: FacebookIcon, slug: "facebook" },
//   { id: 3, name: "Telegram", price: 350, serverId: 1, stock: 10, icon: TelegramIcon, slug: "telegram" },

//   // USA
//   { id: 4, name: "WhatsApp", price: 800, serverId: 2, stock: 8, icon: WhatsAppIcon, slug: "whatsapp" },
//   { id: 5, name: "Facebook", price: 700, serverId: 2, stock: 6, icon: FacebookIcon, slug: "facebook" },
//   { id: 6, name: "X / Twitter", price: 900, serverId: 2, stock: 5, icon: TwitterIcon, slug: "twitter" },

//   // UK
//   { id: 7, name: "WhatsApp", price: 750, serverId: 3, stock: 7, icon: WhatsAppIcon, slug: "whatsapp" },
//   { id: 8, name: "Telegram", price: 600, serverId: 3, stock: 4, icon: TelegramIcon, slug: "telegram" },

//   // India
//   { id: 9, name: "WhatsApp", price: 400, serverId: 4, stock: 20, icon: WhatsAppIcon, slug: "whatsapp" },
//   { id: 10, name: "Facebook", price: 350, serverId: 4, stock: 18, icon: FacebookIcon, slug: "facebook" },
// ];

import WhatsAppIcon from "../assets/whatsapp.png";
import FacebookIcon from "../assets/facebook.png";
import TelegramIcon from "../assets/telegram.png";
import TwitterIcon from "../assets/twitter.png";

// Servers WITH 5sim country slug
export const servers = [
  { id: 1, name: "Nigeria", countryCode: "+234", slug: "ng" },
  { id: 2, name: "USA", countryCode: "+1", slug: "us" },
  { id: 3, name: "UK", countryCode: "+44", slug: "uk" },
  { id: 4, name: "India", countryCode: "+91", slug: "in" },
];

// Services WITH 5sim service slug
export const services = [
  // Nigeria
  {
    id: 1,
    name: "WhatsApp",
    price: 500,
    serverId: 1,
    stock: 15,
    icon: WhatsAppIcon,
    slug: "whatsapp",
    country: "ng",
    operator: "whatsapp",
  },
  {
    id: 2,
    name: "Facebook",
    price: 400,
    serverId: 1,
    stock: 12,
    icon: FacebookIcon,
    slug: "facebook",
    country: "ng",
    operator: "facebook",
  },
  {
    id: 3,
    name: "Telegram",
    price: 350,
    serverId: 1,
    stock: 10,
    icon: TelegramIcon,
    slug: "telegram",
    country: "ng",
    operator: "telegram",
  },

  // USA
  {
    id: 4,
    name: "WhatsApp",
    price: 800,
    serverId: 2,
    stock: 8,
    icon: WhatsAppIcon,
    slug: "whatsapp",
    country: "us",
    operator: "whatsapp",
  },
  {
    id: 5,
    name: "Facebook",
    price: 700,
    serverId: 2,
    stock: 6,
    icon: FacebookIcon,
    slug: "facebook",
    country: "us",
    operator: "facebook",
  },
  {
    id: 6,
    name: "X / Twitter",
    price: 900,
    serverId: 2,
    stock: 5,
    icon: TwitterIcon,
    slug: "twitter",
    country: "us",
    operator: "twitter",
  },

  // UK
  {
    id: 7,
    name: "WhatsApp",
    price: 750,
    serverId: 3,
    stock: 7,
    icon: WhatsAppIcon,
    slug: "whatsapp",
    country: "uk",
    operator: "whatsapp",
  },
  {
    id: 8,
    name: "Telegram",
    price: 600,
    serverId: 3,
    stock: 4,
    icon: TelegramIcon,
    slug: "telegram",
    country: "uk",
    operator: "telegram",
  },

  // India
  {
    id: 9,
    name: "WhatsApp",
    price: 400,
    serverId: 4,
    stock: 20,
    icon: WhatsAppIcon,
    slug: "whatsapp",
    country: "in",
    operator: "whatsapp",
  },
  {
    id: 10,
    name: "Facebook",
    price: 350,
    serverId: 4,
    stock: 18,
    icon: FacebookIcon,
    slug: "facebook",
    country: "in",
    operator: "facebook",
  },
];
