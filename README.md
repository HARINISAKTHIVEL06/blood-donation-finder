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

## Deployment

This repo is prepared for deployment on Render using the root-level [render.yaml](./render.yaml).

### Services
- `blood-donation-finder-api`: Node.js backend
- `blood-donation-finder-web`: static Vite frontend

### Required environment variables

For the backend service:
- `MONGO_URI`
- `JWT_SECRET`
- `CORS_ORIGINS`

For the frontend service:
- `VITE_API_BASE_URL`

### Render setup

1. Push this repo to GitHub.
2. In Render, create a new Blueprint and connect this repository.
3. Set the backend environment variables:
   - `MONGO_URI=<your MongoDB Atlas connection string>`
   - `JWT_SECRET=<a strong secret>`
   - `CORS_ORIGINS=<your frontend Render URL>`
4. Set the frontend environment variable:
   - `VITE_API_BASE_URL=<your backend Render URL>`
5. Deploy the Blueprint.

Example production values:
- `CORS_ORIGINS=https://blood-donation-finder-web.onrender.com`
- `VITE_API_BASE_URL=https://blood-donation-finder-api.onrender.com`

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
