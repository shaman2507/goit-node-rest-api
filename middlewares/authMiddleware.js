const jwt = require('jsonwebtoken');
const User = require('../models/users');
const { JWT_SECRET } = process.env;

const authMiddleware = async (req, res, next) => {
  // const authHeader = req.headers.authorization || '';
  // const [type, token] = authHeader.split(' ')

  const token = req.headers.authorization && req.headers.authorization.split(' ');

  // console.log('authMiddleware > authHeader-', authHeader)
  console.log(token)

  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const decodedToken = jwt.verify(token, JWT_SECRET);

  console.log(decodedToken)

  // if (type !== "Bearer") {
  //   return res.status(401).json({ message: "Token is not valid" });
  // }

  // if (!token) {
  //   return res.status(401).json({ message: "Not authorized" });
  // }

  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);
    req.user = user;
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Not authorized" });
  }

  next();

};

module.exports = authMiddleware;