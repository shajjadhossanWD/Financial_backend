# Financial Health Score App Backend

Welcome to the backend of the Financial Health Score App! This TypeScript Node.js application provides a secure and robust foundation for user registration, login authentication, and financial health score calculations.

## Getting Started

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/shajjadhossanWD/Financial_backend.git
   cd Financial_backend
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Environment Variables:**
   Create a `.env` file in the root directory and add the following variables:

   ```env
   .env file data i'll provide in doc
   ```

## Features

### User Registration and Login

- The backend includes a user registration system with email verification using nodemailer for SMTP email OTP.

- User authentication is implemented using JWT (JSON Web Token) for secure and stateless communication.

### JWT Authentication with Refresh Token

- JWT tokens are used for authentication, providing a secure way to transmit information between the client and server.

- Refresh tokens are implemented for enhanced security and to maintain user sessions.

### MVC Pattern and Data Structure

- The backend follows the MVC (Model-View-Controller) pattern for a structured and modular codebase.

- Data structures and models are designed to efficiently manage user information and financial data.

### Financial Health Score APIs

- Various APIs are available to calculate and retrieve financial health scores.

- The backend interfaces with MongoDB to store and retrieve financial data.

## Database Setup

- Make sure to set up a MongoDB database and provide the connection string in the `.env` file.

## Run the Backend

```bash
npm start
```

The backend server will start on the specified port (default is 3001). Ensure the MongoDB server is running.

## API Documentation

Explore the API documentation to understand the available endpoints and how to interact with the backend. Visit [API Documentation][(#)] => https://documenter.getpostman.com/view/19571731/2s9YXmWfTs for details.

Feel free to reach out if you have any questions or feedback. Thank you for using the Financial Health Score App Backend! 🌐
