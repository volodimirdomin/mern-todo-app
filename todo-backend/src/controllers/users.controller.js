// import module for password hashing
const bcrypt = require("bcryptjs");
// import module for jwt token
const jwt = require("jsonwebtoken");
// imports the user model
const User = require("../models/users.model");

// make a controller for register user
exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existanceUser = await User.findOne({ username });
    
    if (existanceUser) return res.status(500).json({ error: "User is already exists!" });
  
    const HESHPASS = Number(process.env.HESHPASS);
    const hashedPass = await bcrypt.hash(password, HESHPASS);
    const user = new User({ username, password: hashedPass });
    const result = await user.save();
    if (result) {
      res.json({ message: "User successfuly registered!", user: result });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// make a controller for user authorization
exports.authorization = async (req, res) => {
  try {
    const tokenkey = process.env.TOKENKEY;
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!await bcrypt.compare(password, user.password)){
      return res.status(400).json({message: "Incorrect password!"});
    }

    const token = jwt.sign(
      {userId: user.id,
      userLogin: user.username},
      tokenkey,
      {expiresIn: '1d'}
    );

    res.json({ message: "User is successfuly authorized!", token, userId: user.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
