# 🩸 Blood Donation Finder

A full-stack MERN web application that helps users register, log in, create donor profiles, and search blood donors by blood group and city.

## 🚀 Tech Stack

### Frontend
- React
- Vite
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcryptjs

---

## 📌 Features

- User registration
- User login with JWT authentication
- Create donor profile
- Update donor profile
- Search donors by blood group and city
- Protected routes using token authentication
- MongoDB database integration

---

## 📂 Project Structure

```text
blood-donation-finder
├── backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   ├── utils
│   │   └── server.js
│   ├── .env
│   └── package.json
├── frontend
│   ├── public
│   ├── src
│   │   ├── pages
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── README.md