# 🩸 Blood Donation Finder

Blood Donation Finder is a full-stack MERN web application that helps users register, log in, create donor profiles, and search for blood donors based on blood group and location.

This project was developed as part of a **Web Development Phase 2 evaluation** to demonstrate frontend-backend integration, authentication, database usage, and REST API development.

---

## 📖 Project Description

In emergency situations, finding a suitable blood donor quickly is very important. This project provides a simple and user-friendly web application where:

- users can register and log in securely
- donors can create and update their blood donation profile
- users can search available donors using blood group and city
- donor details can be viewed in a structured way

The project is built using the **MERN stack**:

- **MongoDB** for database
- **Express.js** for backend APIs
- **React.js** for frontend UI
- **Node.js** for server-side runtime

---

## 🚀 Features

- User registration
- User login
- JWT-based authentication
- Donor profile creation
- Donor profile update
- Search donors by blood group and city
- Protected donor profile API
- MongoDB Atlas integration
- Axios-based frontend-backend communication

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- Axios
- React Router DOM
- CSS

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- bcryptjs
- dotenv
- cors

---

## 📂 Folder Structure

```text
blood-donation-finder
├── backend
│   ├── src
│   │   ├── config
│   │   │   └── db.js
│   │   ├── controllers
│   │   │   ├── authController.js
│   │   │   └── donorController.js
│   │   ├── middleware
│   │   │   └── authMiddleware.js
│   │   ├── models
│   │   │   ├── User.js
│   │   │   └── DonorProfile.js
│   │   ├── routes
│   │   │   ├── authRoutes.js
│   │   │   └── donorRoutes.js
│   │   ├── utils
│   │   │   └── token.js
│   │   └── server.js
│   ├── .env
│   ├── package.json
│   └── package-lock.json
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── pages
│   │   │   ├── Register.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── CreateProfile.jsx
│   │   │   └── SearchDonors.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
└── README.md