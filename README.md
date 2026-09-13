# 🛒 OneCart — Full-Stack E-Commerce Web Application

**OneCart** is a modern, full-stack e-commerce platform built with the **MERN stack** — MongoDB, Express.js, React.js, and Node.js.

It provides a complete online shopping experience with secure authentication, profile management, password recovery, OTP-based email verification, shopping cart functionality, saved addresses, responsive UI, and transactional email notifications.

---

## ✨ Features

### 🔐 Authentication & Account Security

- **JWT-Based Authentication** — Secure customer registration and login using JSON Web Tokens.
- **Password Hashing** — User passwords are securely hashed using `bcrypt`.
- **Profile Management** — Update username, email, phone number, and profile image.
- **Dynamic Image Uploads** — Upload and update profile images using `Multer`.
- **Change Password** — Secure password change functionality with real-time password strength indicators.
- **Forgot Password via OTP** — Six-digit email verification OTP for password recovery.
- **Secure OTP Storage** — OTPs are hashed using SHA-256 before being stored.
- **OTP Expiration** — OTP verification codes automatically expire after 10 minutes.
- **Transactional Emails** — Automated security and account emails using Nodemailer and Brevo SMTP.

---

### 🛍️ Storefront & Shopping Experience

- **Product Browsing** — Explore products through a responsive storefront.
- **Product Collections** — Browse products by categories and collections.
- **Shopping Cart** — Add, update, and remove products from the cart.
- **Global State Management** — React Context API provides centralized cart and session management.
- **Saved Addresses** — Manage multiple shipping addresses.
- **Default Address Selection** — Easily select a preferred shipping address.
- **Responsive Design** — Optimized for desktop, tablet, and mobile devices.
- **Form Validation** — Client-side validation using React Hook Form and Zod.
- **Toast Notifications** — User-friendly success and error notifications.

---

## 🧰 Tech Stack

### Frontend

| Technology            | Purpose                           |
| --------------------- | --------------------------------- |
| **React.js**          | Frontend UI development           |
| **Vite**              | Development server and build tool |
| **React Router DOM**  | Client-side routing               |
| **React Context API** | Global state management           |
| **React Hook Form**   | Form handling                     |
| **Zod**               | Schema-based validation           |
| **Bootstrap**         | Responsive UI and styling         |
| **Material UI Icons** | Interface icons                   |
| **React Toastify**    | Notifications                     |
| **Axios**             | API communication                 |

### Backend

| Technology         | Purpose                   |
| ------------------ | ------------------------- |
| **Node.js**        | Backend runtime           |
| **Express.js**     | REST API framework        |
| **MongoDB**        | NoSQL database            |
| **Mongoose**       | MongoDB ODM               |
| **JWT**            | Authentication            |
| **bcrypt**         | Password hashing          |
| **Node.js Crypto** | SHA-256 OTP hashing       |
| **Multer**         | File upload handling      |
| **Nodemailer**     | Email delivery            |
| **Brevo SMTP**     | Transactional email relay |

---

## 🏗️ Project Architecture

```text
OneCart/
│
├── backend/
│   │
│   ├── config/
│   │   └── Database & email configuration
│   │
│   ├── controllers/
│   │   └── User, Product & Order business logic
│   │
│   ├── middleware/
│   │   ├── Authentication middleware
│   │   └── File upload middleware
│   │
│   ├── models/
│   │   ├── User
│   │   ├── Product
│   │   └── Order
│   │
│   ├── routes/
│   │   ├── User routes
│   │   ├── Product routes
│   │   └── Order routes
│   │
│   ├── server.js
│   └── package.json
│
├── frontend/
│   │
│   ├── src/
│   │   │
│   │   ├── assets/
│   │   │   └── Images & brand assets
│   │   │
│   │   ├── components/
│   │   │   └── Reusable UI components
│   │   │
│   │   ├── context/
│   │   │   └── ShopContext
│   │   │
│   │   ├── controllers/
│   │   │   └── Client-side controller logic
│   │   │
│   │   ├── pages/
│   │   │   ├── Login
│   │   │   ├── Register
│   │   │   ├── Profile
│   │   │   ├── Change Password
│   │   │   └── Forgot Password / OTP
│   │   │
│   │   ├── services/
│   │   │   └── Axios API services
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── README.md
└── .gitignore
```

---

## 🔑 Authentication Flow

OneCart uses JWT-based authentication for protecting customer-specific resources.

```text
┌──────────────┐
│    Client    │
└──────┬───────┘
       │
       │ Login
       ▼
┌──────────────────┐
│ Express API      │
│ /api/user/login  │
└────────┬─────────┘
         │
         │ Validate credentials
         ▼
┌──────────────────┐
│     MongoDB      │
│   User Record    │
└────────┬─────────┘
         │
         │ Valid credentials
         ▼
┌──────────────────┐
│   Generate JWT   │
└────────┬─────────┘
         │
         │ JWT Token
         ▼
┌──────────────────┐
│      Client      │
└────────┬─────────┘
         │
         │ Authenticated requests
         ▼
┌──────────────────┐
│ Auth Middleware  │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Protected Route  │
└──────────────────┘
```

---

## 🔒 Forgot Password & OTP Flow

OneCart provides a secure OTP-based password recovery system.

```text
User enters email
        │
        ▼
Generate 6-digit OTP
        │
        ▼
Hash OTP using SHA-256
        │
        ▼
Store hashed OTP + expiry
        │
        ▼
Send OTP through email
        │
        ▼
User enters OTP
        │
        ▼
Hash submitted OTP
        │
        ▼
Compare stored hash
        │
        ├── Invalid / Expired
        │        ↓
        │     Reject
        │
        └── Valid
                 ↓
          Allow password reset
```

### OTP Security

- Six-digit verification code
- SHA-256 hashing before database storage
- Ten-minute expiration window
- Email-based verification
- Password reset only after successful verification

---

## 👤 Profile Management

Customers can manage their account information from the profile dashboard.

### Available Profile Features

- Username update
- Email update
- Mobile number update
- Profile image upload
- Profile image preview
- Account status
- User role information
- Account creation date
- Last activity information

Profile images are submitted using `multipart/form-data` and processed through Multer on the backend.

---

## 🔑 Password Management

The password management module provides:

- Current password verification
- New password validation
- Confirm password validation
- Password strength indicator
- Password requirement checklist
- Secure password hashing with `bcrypt`

Example password criteria:

```text
✓ Minimum required length
✓ Uppercase character
✓ Lowercase character
✓ Number
✓ Special character
```

---

## 📍 Address Management

Customers can manage multiple delivery addresses.

Supported functionality includes:

- Add new address
- Edit address
- Delete address
- View saved addresses
- Select default address

---

## 🌐 API Endpoints

### Authentication & User Operations

| Method | Endpoint                            | Description                      | Auth |
| ------ | ----------------------------------- | -------------------------------- | ---- |
| `POST` | `/api/user/register`                | Register a new user              | ❌   |
| `POST` | `/api/user/login`                   | Authenticate user and return JWT | ❌   |
| `POST` | `/api/user/send-reset-otp`          | Send password reset OTP          | ❌   |
| `POST` | `/api/user/reset-password-otp`      | Verify OTP and reset password    | ❌   |
| `PUT`  | `/api/user/change-password/:userId` | Change account password          | ✅   |
| `PUT`  | `/api/user/profile/:userId`         | Update profile and avatar        | ✅   |

### Example Protected Request

```http
PUT /api/user/profile/:userId
Authorization: Bearer <JWT_TOKEN>
Content-Type: multipart/form-data
```

---

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** v16+
- **MongoDB** local installation or MongoDB Atlas
- **Git**
- A **Brevo account** or SMTP-compatible email service

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/OneCart.git

cd OneCart
```

---

### 2. Backend Setup

Navigate to the backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `backend` directory:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret_key

# Brevo SMTP Configuration
BREVO_SMTP_USER=your_brevo_smtp_login
BREVO_SMTP_KEY=your_brevo_smtp_key
SENDER_EMAIL=your_verified_sender_email@example.com
```

Start the backend:

```bash
npm run dev
```

---

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
VITE_BACKEND_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

---

## 🔐 Environment Variables

### Backend

| Variable          | Description                   |
| ----------------- | ----------------------------- |
| `PORT`            | Backend server port           |
| `MONGO_URI`       | MongoDB connection string     |
| `JWT_SECRET`      | Secret key used to sign JWTs  |
| `BREVO_SMTP_USER` | Brevo SMTP username           |
| `BREVO_SMTP_KEY`  | Brevo SMTP authentication key |
| `SENDER_EMAIL`    | Verified sender email         |

### Frontend

| Variable           | Description          |
| ------------------ | -------------------- |
| `VITE_BACKEND_URL` | Backend API base URL |

> ⚠️ **Never commit `.env` files or secret keys to GitHub.**

Add the following to `.gitignore`:

```gitignore
.env
.env.local
.env.production
node_modules/
dist/
```

---

## 🧪 Development Workflow

```text
Frontend
   │
   │ Axios
   ▼
Express REST API
   │
   ├── Authentication
   ├── User Management
   ├── Product Management
   └── Order Management
   │
   ▼
MongoDB
```

---

## 🚀 Production Deployment

The application can be deployed using services such as:

### Frontend

- Vercel
- Netlify

### Backend

- Render
- Railway
- Other Node.js-compatible hosting platforms

### Database

- MongoDB Atlas

### Email

- Brevo SMTP

Before production deployment, update:

```env
VITE_BACKEND_URL=https://your-production-api.com
```

and configure the production MongoDB connection and SMTP credentials securely through the hosting provider's environment variables.

---

## 🛡️ Security Considerations

OneCart implements several security practices:

- JWT-based authentication
- Password hashing with bcrypt
- Protected API routes
- SHA-256 hashing for OTP storage
- OTP expiration
- Input validation with Zod
- Server-side request validation
- File type validation
- File size restrictions
- Environment variables for secrets
- CORS configuration
- No sensitive credentials committed to source control

---

## 📱 Responsive Design

The storefront is designed to provide a consistent experience across:

```text
Desktop
   │
   ├── Large screens
   │
Tablet
   │
   ├── Medium screens
   │
Mobile
   │
   └── Small screens
```

The UI combines **Bootstrap responsive utilities**, custom CSS, and **Material UI icons**.

---

## 📸 Screenshots

Add your project screenshots here:

```text
docs/
├── home.png
├── collection.png
├── product.png
├── login.png
├── profile.png
├── cart.png
└── admin.png
```

Example:

```markdown
![OneCart Homepage](docs/home.png)
```

---

## 🗺️ Roadmap

- [x] User registration
- [x] User login
- [x] JWT authentication
- [x] Profile management
- [x] Profile image upload
- [x] Change password
- [x] Forgot password with OTP
- [x] Transactional email
- [x] Product browsing
- [x] Shopping cart
- [x] Saved addresses
- [ ] Order tracking improvements
- [ ] Payment gateway integration
- [ ] Advanced product search
- [ ] Product reviews and ratings
- [ ] Wishlist improvements
- [ ] Production deployment

---

## 🤝 Contributing

Contributions are welcome.

### Fork the repository

```bash
git fork
```

### Create a feature branch

```bash
git checkout -b feature/your-feature
```

### Commit your changes

```bash
git add .

git commit -m "Add your feature"
```

### Push the branch

```bash
git push origin feature/your-feature
```

Then open a Pull Request.

---

## 📄 License

This project is developed for educational and portfolio purposes.

---

## 👨‍💻 Developer

**Anupam Jana**

B.Tech Computer Science Engineering Student

Interested in:

- Full-Stack Web Development
- MERN Stack
- JavaScript
- React.js
- Node.js
- AI/ML

---

## ⭐ Support

If you find **OneCart** useful or interesting, consider giving the repository a ⭐ on GitHub.

**Built with ❤️ using the MERN Stack.**


