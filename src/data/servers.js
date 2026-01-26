// // List of available servers
// export const servers = [
//   { id: 1, name: "Nigeria" },
//   { id: 2, name: "USA" },
//   { id: 3, name: "UK" },
//   { id: 4, name: "India" },
// ];

// // List of services with serverId linking them to a server
// export const services = [
//   // Nigeria
//   { id: 1, name: "WhatsApp", price: 500, serverId: 1 },
//   { id: 2, name: "Facebook", price: 400, serverId: 1 },
//   { id: 3, name: "Telegram", price: 350, serverId: 1 },

//   // USA
//   { id: 4, name: "WhatsApp", price: 800, serverId: 2 },
//   { id: 5, name: "Facebook", price: 700, serverId: 2 },
//   { id: 6, name: "X / Twitter", price: 900, serverId: 2 },

//   // UK
//   { id: 7, name: "WhatsApp", price: 750, serverId: 3 },
//   { id: 8, name: "Telegram", price: 600, serverId: 3 },

//   // India
//   { id: 9, name: "WhatsApp", price: 400, serverId: 4 },
//   { id: 10, name: "Facebook", price: 350, serverId: 4 },
// ];


import WhatsAppIcon from "../assets/whatsapp.png";
import FacebookIcon from "../assets/facebook.png";
import TelegramIcon from "../assets/telegram.png";
import TwitterIcon from "../assets/twitter.png";

export const servers = [
  { id: 1, name: "Nigeria" },
  { id: 2, name: "USA" },
  { id: 3, name: "UK" },
  { id: 4, name: "India" },
];

export const services = [
  // Nigeria
  { id: 1, name: "WhatsApp", price: 500, serverId: 1, icon: WhatsAppIcon },
  { id: 2, name: "Facebook", price: 400, serverId: 1, icon: FacebookIcon },
  { id: 3, name: "Telegram", price: 350, serverId: 1, icon: TelegramIcon },

  // USA
  { id: 4, name: "WhatsApp", price: 800, serverId: 2, icon: WhatsAppIcon },
  { id: 5, name: "Facebook", price: 700, serverId: 2, icon: FacebookIcon },
  { id: 6, name: "X / Twitter", price: 900, serverId: 2, icon: TwitterIcon },

  // UK
  { id: 7, name: "WhatsApp", price: 750, serverId: 3, icon: WhatsAppIcon },
  { id: 8, name: "Telegram", price: 600, serverId: 3, icon: TelegramIcon },

  // India
  { id: 9, name: "WhatsApp", price: 400, serverId: 4, icon: WhatsAppIcon },
  { id: 10, name: "Facebook", price: 350, serverId: 4, icon: FacebookIcon },
];
