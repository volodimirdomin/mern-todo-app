const jwt = require("jsonwebtoken");

const checkAuth = async (req, res, next) => {
  try {
    if (req.method === "OPTIONS") {
      return next();
    }

    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const decoded = jwt.verify(token, process.env.TOKENKEY);
    req.user = decoded;

    next();
  } catch (e) {
    res.status(401).json({ message: "Not authorized" });
  }
};

module.exports = checkAuth;
