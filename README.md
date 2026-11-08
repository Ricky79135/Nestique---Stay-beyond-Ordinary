# Nestique---Stay-beyond-Ordinary
NESTIQUE – Stay Beyond Ordinary | A full-stack luxury accommodation discovery and booking platform built using HTML, CSS, JavaScript, Node.js, Express.js, and MongoDB. Features property exploration, advanced search and filters, user authentication, wishlists, reservations, customer reviews, and an admin dashboard.


# NESTIQUE – Stay Beyond Ordinary

**A Full-Stack Luxury Accommodation Discovery & Booking Platform**

NESTIQUE is a full-stack web application designed to make discovering and booking premium accommodations simple, convenient, and seamless. It provides an elegant platform where users can explore properties, discover unique stays, manage their favourite accommodations, make reservations, and share their experiences.

Built with a vanilla JavaScript frontend and a Node.js, Express.js, and MongoDB backend, NESTIQUE combines an editorial-style user interface with RESTful APIs, secure authentication, and database-driven functionality.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Project Architecture](#project-architecture)
- [Project Structure](#project-structure)
- [Application Modules](#application-modules)
- [Database Design](#database-design)
- [API Documentation](#api-documentation)
- [Getting Started](#getting-started)
- [Environment Configuration](#environment-configuration)
- [Running the Application](#running-the-application)
- [Sample Data](#sample-data)
- [Security](#security)
- [Current Limitations](#current-limitations)
- [Future Enhancements](#future-enhancements)
- [Learning Outcomes](#learning-outcomes)
- [Author](#author)

---

## Project Overview

NESTIQUE is designed as a digital accommodation marketplace that connects travellers with premium places to stay.

The application provides two primary experiences:

**Customer Experience**
- Discover and explore available accommodations.
- Search and filter properties based on preferences.
- View detailed property information.
- Register and authenticate user accounts.
- Save favourite properties to a personal wishlist.
- Create and manage reservations.
- View booking history.
- Submit customer reviews.

**Administrative Experience**
- Access a protected administration dashboard.
- Monitor registered users.
- Manage accommodation listings.
- Monitor reservation activity.
- View booking-related statistics.

The application follows a client-server architecture, with the frontend communicating with the backend through REST APIs and MongoDB handling persistent data storage.

---

## Key Features

### 1. Property Discovery & Exploration
- Browse accommodation listings.
- Explore property details and photographs.
- Search properties by destination.
- Filter and sort accommodation listings.
- View property pricing, amenities, and descriptions.

### 2. User Authentication & Authorization
- User registration and login.
- Password hashing using bcrypt.
- JSON Web Token (JWT) authentication.
- Protected routes and authenticated user operations.
- Role-based access for administrative functionality.

### 3. Property Wishlist
- Add properties to a personal wishlist.
- Remove saved properties.
- Retrieve saved properties through the user account.

### 4. Reservation Management
- Create accommodation reservations.
- Specify check-in and check-out dates.
- Select room types and guest details.
- Validate booking dates.
- Check overlapping confirmed reservations.
- View existing reservations.
- Cancel eligible reservations.

### 5. Customer Reviews
- Submit property reviews.
- Store customer ratings and feedback.
- Associate reviews with users and properties.

### 6. Admin Dashboard
- Protected administrative access.
- View user statistics.
- Monitor property listings.
- Track reservation information.
- View booking-related financial summaries.

### 7. Newsletter Subscription
- Collect newsletter subscriptions.
- Store subscriber information in MongoDB.

### 8. Responsive User Interface
- Clean and modern visual design.
- Luxury-inspired editorial presentation.
- Property-focused layouts.
- Dedicated pages for customer and administrative workflows.

---

## Technology Stack

| Category | Technologies |
|---|---|
| Frontend | HTML5, CSS3, JavaScript |
| Backend | Node.js |
| Backend Framework | Express.js |
| Database | MongoDB |
| ODM | Mongoose |
| Authentication | JSON Web Tokens (JWT) |
| Password Security | bcrypt |
| API Architecture | RESTful APIs |
| Security Middleware | Helmet, CORS, Rate Limiting |
| Development Tools | Git, GitHub, npm |

### Frontend
The frontend is developed using standard web technologies without relying on a frontend framework such as React, Angular, or Vue.

### Backend
Node.js and Express.js handle application logic, authentication, API requests, and communication with the database.

### Database
MongoDB provides persistent storage, while Mongoose manages schemas, models, and database interactions.

---

## Project Architecture

NESTIQUE follows a client-server architecture.

```text
             NESTIQUE APPLICATION
                      |
          +-----------+-----------+
          |                       |
     FRONTEND                 BACKEND
          |                       |
     HTML / CSS              Node.js
     JavaScript              Express.js
          |                       |
          +----------+------------+
                     |
                 REST APIs
                     |
               MIDDLEWARE
                     |
          +----------+----------+
          |                     |
     Authentication         Security
          |                     |
          +----------+----------+
                     |
                  MONGODB
                     |
          +----------+----------+
          |          |          |
         Users    Properties  Bookings
          |          |          |
        Reviews   Newsletters  Wishlists
```

---

## Project Structure

```text
nestique/
│
├── frontend/
│   ├── css/
│   ├── js/
│   ├── stitch-reference/
│   │
│   ├── index.html
│   ├── explore.html
│   ├── property.html
│   ├── login.html
│   ├── signup.html
│   ├── dashboard.html
│   ├── wishlist.html
│   ├── admin.html
│   ├── about.html
│   └── booking-success.html
│
├── backend/
│   ├── data/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   │
│   ├── create-admin.js
│   ├── preview-server.js
│   ├── seed.js
│   └── server.js
│
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

*Note: The folder structure above represents the recommended organized repository layout. Preserve the actual paths used by your application when arranging the project files.*

---

## Application Modules

| Page | File | Description |
|---|---|---|
| Home | `index.html` | Landing page and featured accommodations |
| Explore | `explore.html` | Property discovery, search, and filters |
| Property Details | `property.html` | Individual property information |
| Login | `login.html` | Existing user authentication |
| Signup | `signup.html` | New user registration |
| Dashboard | `dashboard.html` | Customer account and reservations |
| Wishlist | `wishlist.html` | Saved accommodation listings |
| Admin | `admin.html` | Administrative dashboard |
| About | `about.html` | Platform information |
| Booking Success | `booking-success.html` | Reservation confirmation interface |

---

## Database Design

NESTIQUE uses MongoDB with Mongoose models to organize application data.

The application contains five primary data models:

| Model | Purpose |
|---|---|
| User | Stores user profiles, authentication information, roles, and wishlist data |
| Property | Stores accommodation details, pricing, amenities, and inventory |
| Booking | Stores reservation details, dates, guests, and payment status |
| Review | Stores customer ratings and property feedback |
| Newsletter | Stores newsletter subscriber information |

### Database Relationships

- A user can create multiple reservations.
- A user can maintain a wishlist of properties.
- A property can have multiple reservations.
- A property can receive multiple customer reviews.
- Reviews are associated with their respective users and properties.

---

## API Documentation

The backend exposes RESTful API endpoints for communication between the frontend and server.

The following table describes the main API areas.

| Module | Functionality |
|---|---|
| Authentication | Registration, login, and user authentication |
| Users | User account and profile operations |
| Properties | Property discovery, details, and management |
| Bookings | Reservation creation, retrieval, and cancellation |
| Wishlist | Adding, retrieving, and removing saved properties |
| Reviews | Customer ratings and feedback |
| Newsletter | Newsletter subscriptions |
| Admin | Protected administrative operations |

**Note:** Refer to the corresponding files inside `backend/routes/` for the exact endpoint paths, HTTP methods, request parameters, and response formats.

---

## Getting Started

Follow these instructions to run NESTIQUE locally.

### Prerequisites

Make sure the following software is installed:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community) or a MongoDB Atlas account
- [Git](https://git-scm.com/)
- A modern web browser

### 1. Clone the Repository

```bash
git clone https://github.com/Ricky79135/nestique.git
```

Navigate into the project directory:

```bash
cd nestique
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory.

Use `.env.example` as a reference and configure your local environment.

Example:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/nestique
JWT_SECRET=
NODE_ENV=development
CLIENT_ORIGIN=http://localhost:5000

ADMIN_NAME=Nestique Administrator
ADMIN_EMAIL=
ADMIN_PASSWORD=
```

**Important:** Replace the example credentials with your own secure values. Never commit your actual `.env` file to GitHub.

### 4. Start MongoDB

If using a local MongoDB installation, ensure the MongoDB service is running.

Alternatively, configure your MongoDB Atlas connection string in `.env`.

### 5. Start the Backend Server

Run:

```bash
npm start
```

If your `package.json` does not define a start script, use the server entry point directly:

```bash
node backend/server.js
```

### 6. Open the Application

Open the frontend through the configured local server.

For a local preview, the project also includes a preview-server script:

```bash
node backend/preview-server.js
```

Check the terminal output for the local address and port.

*Note: The preview server is intended for read-only preview functionality. Database-dependent operations require the main backend server and a working MongoDB connection.*

---

## Sample Data

The project includes a database seeding script to populate the application with sample property listings.

Run:

```bash
node backend/seed.js
```

This helps populate the database for local development and testing.

An administrative account can be initialized using:

```bash
node backend/create-admin.js
```

Use only your own secure development credentials.

---

## Security

Security is an important consideration in NESTIQUE.

The backend incorporates:

- JWT-based authentication.
- Password hashing using bcrypt.
- Authentication middleware for protected routes.
- Role-based administrative authorization.
- Helmet security middleware.
- CORS configuration.
- Rate limiting for API protection.
- Environment variables for sensitive configuration.

Security configurations should be reviewed and hardened before public production deployment.

---

## Current Limitations

NESTIQUE is a development and portfolio project. Some functionalities require further development before production use.

| Feature | Current Status |
|---|---|
| User authentication | Implemented |
| Property discovery | Implemented |
| Search and filters | Implemented |
| Wishlist | Implemented |
| Reservation management | Implemented |
| Booking cancellation | Implemented |
| Customer reviews | Implemented |
| Admin dashboard | Implemented |
| Newsletter subscriptions | Implemented |
| Online payment gateway | Not implemented |
| Password reset workflow | Not implemented |
| Property image uploading | Not implemented |

**Booking and Payment:** Reservations are stored with a pending payment status. The application does not currently integrate an external payment gateway or process actual customer payments.

The application should be considered a demonstration of full-stack development rather than a production-ready commercial booking service.

---

## Future Enhancements

Potential improvements planned for future development include:

- Integration with secure payment gateways such as Razorpay or Stripe.
- Email notifications for booking confirmations and cancellations.
- Password reset and account recovery functionality.
- Improved property availability and room inventory management.
- Advanced property search and filtering.
- Property image uploading and cloud storage.
- Enhanced admin analytics and reporting.
- Automated testing and API documentation.
- Production deployment and performance optimization.
- Improved accessibility and responsive design.

---

## Learning Outcomes

Developing NESTIQUE provides practical exposure to several full-stack development concepts:

- Building multi-page web applications using HTML, CSS, and JavaScript.
- Developing backend services using Node.js and Express.js.
- Designing RESTful APIs.
- Working with MongoDB and Mongoose.
- Implementing authentication and authorization using JWT.
- Securing passwords using bcrypt.
- Managing database relationships and application data.
- Implementing property discovery and reservation workflows.
- Organizing a full-stack application into modular components.
- Managing source code using Git and GitHub.

---

## Author

**Developed by: [PoojanP]**

Full-Stack Web Development Project

GitHub: [YOUR GITHUB PROFILE](https://github.com/Ricky79135)

---

## License

This project is available for educational and portfolio purposes.

A formal open-source license has not yet been specified. All rights remain with their respective copyright holders.

---

**NESTIQUE – Stay Beyond Ordinary**

*Discover exceptional stays. Experience extraordinary journeys.*
