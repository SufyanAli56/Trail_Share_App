# Trail_Share_App
# 🌍 TrailShare Backend 

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-4.x-lightgrey)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.x-green)](https://www.mongodb.com)

TrailShare is a robust backend API for a travel trail sharing platform, built with Node.js, Express, and MongoDB. It features secure authentication, trip management, and social interactions for travel enthusiasts.

## 🚀 Features

### 🔐 Authentication
- JWT-based authentication with access/refresh tokens
- OTP verification via email (Nodemailer + Gmail)
- Password reset functionality
- Role-based authorization

### 🗺️ Trip Management
- CRUD operations for travel trails
- Image uploads with Cloudinary integration
- Location geocoding (city names to coordinates)
- Pagination, filtering, and sorting

### 💬 Social Features
- Comment system for trips
- Bookmarking functionality
- User profiles with trip history

### 📬 Notifications
- OTP email templates
- Transactional emails (Nodemailer)
- Welcome emails for new users

## 📦 Tech Stack

**Core:**
- Node.js 18.x
- Express 4.x
- MongoDB 6.x (with Mongoose ODM)

**Security:**
- JWT authentication
- Bcrypt password hashing
- Helmet & CORS protection
- Rate limiting

**Services:**
- Cloudinary (image storage)
- Nodemailer (email service)
- Mapbox/Google Maps API (geocoding - optional)


