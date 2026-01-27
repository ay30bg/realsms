// List of available servers with country codes
export const servers = [
  { id: 1, name: "Nigeria", countryCode: "+234" },
  { id: 2, name: "USA", countryCode: "+1" },
  { id: 3, name: "UK", countryCode: "+44" },
  { id: 4, name: "India", countryCode: "+91" },
];

// List of services with serverId linking them to a server
export const services = [
  // Nigeria
  { id: 1, name: "WhatsApp", price: 500, serverId: 1, stock: 15, icon: "whatsapp.png" },
  { id: 2, name: "Facebook", price: 400, serverId: 1, stock: 12, icon: "facebook.png" },
  { id: 3, name: "Telegram", price: 350, serverId: 1, stock: 10, icon: "telegram.png" },

  // USA
  { id: 4, name: "WhatsApp", price: 800, serverId: 2, stock: 8, icon: "whatsapp.png" },
  { id: 5, name: "Facebook", price: 700, serverId: 2, stock: 6, icon: "facebook.png" },
  { id: 6, name: "X / Twitter", price: 900, serverId: 2, stock: 5, icon: "twitter.png" },

  // UK
  { id: 7, name: "WhatsApp", price: 750, serverId: 3, stock: 7, icon: "whatsapp.png" },
  { id: 8, name: "Telegram", price: 600, serverId: 3, stock: 4, icon: "telegram.png" },

  // India
  { id: 9, name: "WhatsApp", price: 400, serverId: 4, stock: 20, icon: "whatsapp.png" },
  { id: 10, name: "Facebook", price: 350, serverId: 4, stock: 18, icon: "facebook.png" },
];
