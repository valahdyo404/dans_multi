# Dans BE Job Board API

## Description
This API provides endpoints for user authentication and job searching functionality. All job-related endpoints require JWT authentication.

## How to Run the Project with Docker Compose

1. **Clone the Repository:**
   ```sh
   git clone the repo
   cd dans_be

2. **Build and Start the Containers:**
   ```sh
   sudo dockerd
   docker-compose up -v --build
   ```
3. **The API will be accessible at http://localhost:3001.**

## How to Run the Project Locally
*Adjust env database in src folder named .env-example*
1. **Clone the Repository:**

   ```sh
   git clone the repo   
   cd dans_be
   npm install
   npm run migrate
   npm run seed
   npm run start

2. **The API will be accessible at http://localhost:3001.**

## How to Run Tests
   ```sh
   git clone the repo
   cd dans_be
   npm install
   npm test
   ```

## Project Package

- **express**: Framework for building web applications and services.
- **express-validator**: Library for proper error handling.
- **jsonwebtoken**: JWT authentication strategy.
- **axios**: HTTP client for making requests to external APIs.
- **bcrypt**: Library to help you hash password and validate password input.
- **dotenv**: Module for loading environment variables from a .env file.
- **morgan**: Plugin for logging api hitted in terminal in Express.
- **pg**: PostgreSQL client library for Node.js.
- **Sequelize**: ORM, Simplify database operations with object-oriented code.


## API Docs
- **Postman**: https://documenter.getpostman.com/view/19880774/2sAY52dzyN

