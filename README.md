# E-Commerce Website

A full-stack e-commerce application built with React (frontend) and Node.js/Express (backend).

## Features

- 🛍️ Product browsing and search
- 🛒 Shopping cart functionality
- 💳 Checkout process
- 👤 User authentication (login/register)
- 📦 Order management
- 🎨 Modern, responsive UI

## Tech Stack

### Frontend
- React 18
- React Router
- Vite
- Axios
- React Icons

### Backend
- Node.js
- Express.js
- JWT Authentication
- bcryptjs for password hashing
- File-based JSON storage (easily upgradeable to database)

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the backend server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## Project Structure

```
e-com-web/
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context providers
│   │   └── App.jsx         # Main app component
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── routes/             # API routes
│   ├── data/               # Data storage
│   ├── middleware/         # Auth middleware
│   ├── server.js           # Main server file
│   └── package.json
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product

### Cart
- `GET /api/cart` - Get user's cart (protected)
- `POST /api/cart` - Add item to cart (protected)
- `PUT /api/cart` - Update cart item (protected)
- `DELETE /api/cart` - Clear cart (protected)

### Orders
- `POST /api/orders` - Create order (protected)
- `GET /api/orders` - Get user's orders (protected)

## Default Products

The application comes with 8 sample products pre-loaded:
- Wireless Headphones
- Smart Watch
- Laptop Stand
- Mechanical Keyboard
- Wireless Mouse
- USB-C Hub
- Webcam HD
- Desk Lamp

## Usage

1. Start both backend and frontend servers
2. Visit `http://localhost:3000` in your browser
3. Browse products, add to cart, and checkout
4. Register or login to save your cart and orders

## Notes

- The backend uses file-based JSON storage for simplicity
- For production, consider upgrading to a database (MongoDB, PostgreSQL, etc.)
- Change the JWT_SECRET in production
- Add environment variables for sensitive configuration

## Deployment

For detailed deployment instructions, see:
- **[QUICK_DEPLOY.md](./QUICK_DEPLOY.md)** - Fast deployment guide (5 minutes)
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Comprehensive deployment guide with multiple options

### Quick Start (Deploy in 5 minutes)

1. **Backend**: Deploy to [Render](https://render.com) (free tier available)
2. **Frontend**: Deploy to [Vercel](https://vercel.com) (free tier available)
3. Set environment variables as described in the deployment guides

## License

MIT

