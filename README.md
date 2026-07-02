# Chatly

Chatly is a modern real-time chat application built with the MERN stack. It enables users to connect instantly through one-to-one messaging with secure JWT authentication, live online status updates, and image sharing using Cloudinary. The project demonstrates full-stack development, real-time communication using Socket.IO, and responsive UI design.

## Features

### Secure Authentication

* User registration and login
* JWT-based authentication
* HTTP-only cookie authentication for secure sessions

### Real-Time Messaging

* Instant one-to-one messaging using Socket.IO
* Real-time message delivery
* Online and offline user status

### Media Sharing

* Upload and share images
* Cloudinary integration for image storage and optimization

### User Profile

* Update profile picture
* Responsive and user-friendly interface

---

## Tech Stack

### Frontend

* React.js
* React Router
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Socket.IO
* JWT Authentication
* Cookie Parser

### Cloud Services

* Cloudinary
* MongoDB Atlas

---

## Deployment

| Service  | Platform      |
| -------- | ------------- |
| Frontend | Vercel        |
| Backend  | Render        |
| Database | MongoDB Atlas |

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/Nazrulali10/Chatly.git
cd Chatly
```

### Install Dependencies

#### Client

```bash
cd client
npm install
npm run dev
```

#### Server

```bash
cd server
npm install
npm start
```

---

## Environment Variables

### Client (`client/.env`)

```env
VITE_BACKEND_URL=your_backend_url
```

### Server (`server/.env`)

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
NODE_ENV=development
```

---

## Future Improvements

* Typing indicator
* Group chat support
* Message seen/read receipts
* Emoji reactions
* Last seen status

---

## Author

**Nazrul Ali**

Built as a portfolio project to demonstrate full-stack web development using the MERN stack, secure JWT authentication, Socket.IO for real-time communication, Cloudinary image storage, and responsive UI design.
