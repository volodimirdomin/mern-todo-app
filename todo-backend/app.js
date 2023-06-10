// imports modules & dependencies
const express = require("express");
const env = require("dotenv");
const cors = require("cors");

// imports routes, middleware, and configs
const todos = require("./src/routes/todos.route");
const users = require("./src/routes/users.route");
const { notFoundRoute, errorHandler } = require("./src/configs/errorHandler");

// loads environment variables from .env file
env.config();

// initializes express app
const app = express();

// application database connection establishment
const connectDatabase = require("./src/db/connect");
connectDatabase();

// corss-origin-allow-all
app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// todos api routes
app.use(process.env.APP_API_PREFIX, todos);

// users api routes
app.use(process.env.APP_API_PREFIX, users);

// 404 - not found error handler
app.use(notFoundRoute);

// error handler
app.use(errorHandler);

// app listens to defined port
app.listen(process.env.APP_PORT, () => {
  console.log("TODO-App backend server running on: " + process.env.APP_BASE_URL);
});
