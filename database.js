const fs = require('fs')
const path = require('path')

const DATA_DIR = path.join(__dirname, '..', 'data')
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json')
const USERS_FILE = path.join(DATA_DIR, 'users.json')
const CARTS_FILE = path.join(DATA_DIR, 'carts.json')
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json')

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
}

// Initialize default products
const defaultProducts = [
  {
    _id: '1',
    name: 'Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.',
    price: 99.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'
  },
  {
    _id: '2',
    name: 'Smart Watch',
    description: 'Feature-rich smartwatch with fitness tracking, heart rate monitor, and smartphone notifications. Water-resistant design.',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'
  },
  {
    _id: '3',
    name: 'Laptop Stand',
    description: 'Ergonomic aluminum laptop stand that improves posture and increases desk space. Adjustable height and angle.',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500'
  },
  {
    _id: '4',
    name: 'Mechanical Keyboard',
    description: 'Premium mechanical keyboard with RGB backlighting and tactile switches. Perfect for gaming and typing.',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500'
  },
  {
    _id: '5',
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with precision tracking and long battery life. Comfortable for extended use.',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500'
  },
  {
    _id: '6',
    name: 'USB-C Hub',
    description: 'Multi-port USB-C hub with HDMI, USB 3.0, and SD card reader. Expand your laptop connectivity.',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=500'
  },
  {
    _id: '7',
    name: 'Webcam HD',
    description: '1080p HD webcam with autofocus and built-in microphone. Perfect for video calls and streaming.',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1587825143138-344aafc3d1c8?w=500'
  },
  {
    _id: '8',
    name: 'Desk Lamp',
    description: 'LED desk lamp with adjustable brightness and color temperature. Modern design with USB charging port.',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500'
  }
]

// Initialize data files
function initializeData() {
  if (!fs.existsSync(PRODUCTS_FILE)) {
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(defaultProducts, null, 2))
  }
  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify([], null, 2))
  }
  if (!fs.existsSync(CARTS_FILE)) {
    fs.writeFileSync(CARTS_FILE, JSON.stringify({}, null, 2))
  }
  if (!fs.existsSync(ORDERS_FILE)) {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify([], null, 2))
  }
}

// Products
function getProducts() {
  try {
    const data = fs.readFileSync(PRODUCTS_FILE, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    return []
  }
}

function getProductById(id) {
  const products = getProducts()
  return products.find(p => p._id === id)
}

// Users
function getUsers() {
  try {
    const data = fs.readFileSync(USERS_FILE, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    return []
  }
}

function saveUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2))
}

function getUserByEmail(email) {
  const users = getUsers()
  return users.find(u => u.email === email)
}

// Carts
function getCart(userId) {
  try {
    const data = fs.readFileSync(CARTS_FILE, 'utf8')
    const carts = JSON.parse(data)
    return carts[userId] || { items: [] }
  } catch (error) {
    return { items: [] }
  }
}

function saveCart(userId, cart) {
  try {
    const data = fs.readFileSync(CARTS_FILE, 'utf8')
    const carts = JSON.parse(data)
    carts[userId] = cart
    fs.writeFileSync(CARTS_FILE, JSON.stringify(carts, null, 2))
  } catch (error) {
    const carts = {}
    carts[userId] = cart
    fs.writeFileSync(CARTS_FILE, JSON.stringify(carts, null, 2))
  }
}

// Orders
function saveOrder(order) {
  try {
    const data = fs.readFileSync(ORDERS_FILE, 'utf8')
    const orders = JSON.parse(data)
    orders.push(order)
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2))
  } catch (error) {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify([order], null, 2))
  }
}

function getOrders(userId) {
  try {
    const data = fs.readFileSync(ORDERS_FILE, 'utf8')
    const orders = JSON.parse(data)
    return orders.filter(o => o.userId === userId)
  } catch (error) {
    return []
  }
}

module.exports = {
  initializeData,
  getProducts,
  getProductById,
  getUsers,
  saveUsers,
  getUserByEmail,
  getCart,
  saveCart,
  saveOrder,
  getOrders
}

