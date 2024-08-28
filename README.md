# WTWR (What to Wear?): Back End

A back-end project is focused on creating a server for the WTWR application. You’ll gain a deeper understanding of how to work with databases, set up security and testing, and deploy web applications on a remote machine. The eventual goal is to create a server with an API and user authorization.

## Features

- **User**

  - Model with schema for name and avatar
  - Controller and routes to get, create and find by ID

- **Clothing Items**

  - Model with schema for name, weather, imageUrl, owner, likes, and creation time
  - Controller and routes to get, create, delete, like, and dislike

- **Error handling**
  - Specific messages for 400, 404 and 500 codes
  - Middleware to catch unknown routes

### Technology

- JavaScript
- Express
- MongoDB
- Mongoose
- ESLint
- Validator
- Postman
