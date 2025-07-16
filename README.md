# 🔁 SwiSkills – A Skill Swap Platform

**SwiSkills** is a full-stack real-time web application that allows users to share and exchange skills with others, connect through real-time chat, and build credibility through reviews. The platform fosters a peer-to-peer learning environment where users can explore talents, offer their expertise, and grow their network.

Developed during **Code Sangam – Oct 2024**.

---

## 🚀 Features

- JWT-based **secure login and signup**
- **Password reset via email** using Nodemailer
- User profiles with photo, email, education, experience, and skills
- Review and rating system to build user credibility
- Real-time **1:1 chat** between users using Socket.io
- Skill discovery with **pagination**, **filtering**, and **sorting**
---

## 🛠️ Technologies Used

### Frontend
- HTML, Tailwind CSS, JavaScript
- React.js
- Axios
- Socket.IO Client
- Cloudinary.js

### Backend
- Node.js, Express.js
- MongoDB, Mongoose
- JWT (Authentication)
- Nodemailer (Email Support)
- Socket.IO Server

### Config
- PORT=5000
- NODE_ENV=development
- DATABASE_USERNAME=your_username
- DATABASE=mongodb+srv://< USERNAME >:< PASSWORD >@clusters.ewclw.mongodb.net/SwiSkills?retryWrites=true&w=majority&appName=Clusters
- DATABASE_PASSWORD=your_password
- JWT_SECRET=your_jwt_secret
- JWT_EXPIRES_IN=7d
- EMAIL_USERNAME=your_email_username
- EMAIL_PASSWORD=your_email_password
- EMAIL_HOST=smtp.yourprovider.com
- EMAIL_PORT=587
