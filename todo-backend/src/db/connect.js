// external modules import
const mongoose = require("mongoose");

const connectionString = process.env.MONGO_URI;

const connectDatabase = async () => {
  try {
    await mongoose.connect(connectionString);
    console.log("Connected to MongoDB database successfully.");
  } catch (error) {
    console.log("Database connection error: ", error.message);
  }
};

module.exports = connectDatabase;
