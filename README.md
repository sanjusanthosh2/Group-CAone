Artventure - Art E-commerce Platform
An online marketplace for purchasing high-quality art prints with secure payment processing and order management.

Features
🎨 Browse art by categories (Oil, Canvas, Watercolor)
🛒 Shopping cart functionality
💳 Secure payment processing
📧 Email invoice system
👤 User authentication
📦 Order tracking
🔍 Search functionality

Tech Stack
Frontend
* React.js
* React Router DOM
* Bootstrap Dark Theme
* Material UI Icons
* Context API for state management
Backend
* Node.js
* Express.js
* MongoDB
* Mongoose ODM
* JWT Authentication
* Nodemailer

Getting Started
* Prerequisites
* Node.js (v14+)
* MongoDB
* Git

  Installation
1. Clone the repository
   git clone https://github.com/yourusername/artventure.git
cd artventure
2.Install server dependencies
cd server
npm install
3. Configure environment variables Create a .env file in the server directory:
   MONGODB_URI=your_mongodb_connection_string
PORT=3100
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
4.Install client dependencies
cd ../client
npm install
5.Create client environment variables Create a .env file in the client directory:
REACT_APP_API_BASE_URL=http://localhost:3100

Running the Application
1.Start the server
cd server
npm start
2.Start the client
cd client
npm start

The application will be available at http://localhost:3000

Project Structure
artventure/
├── client/
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── screens/
│       └── App.js
└── server/
    ├── models/
    ├── routes/
    └── index.js

    API Endpoints
Authentication
* POST /api/createuser - Register new user
* POST /api/login - User login

  Products
* POST /api/artData - Get all art products
  
Orders
* POST /api/orderData - Create new order
* POST /api/myOrderData - Get user orders
* POST /api/send-invoice - Send order invoice
  
Contributing
* Fork the repository
* Create your feature branch (git checkout -b feature/AmazingFeature)
* Commit your changes (git commit -m 'Add some AmazingFeature')
* Push to the branch (git push origin feature/AmazingFeature)
* Open a Pull Request

  Acknowledgments
* Bootstrap Dark Theme for UI components
* MongoDB Atlas for database hosting
* Vercel for deployment
