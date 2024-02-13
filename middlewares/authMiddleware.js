const jwt = require('jsonwebtoken');
const User = require('../models/users');
const { JWT_SECRET } = process.env;
const controllerWrapper = require('../helpers/controllerWrappes')

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const [type, token] = authHeader.split(' ')

  console.log('authMiddleware > authHeader-', authHeader)


  if (type !== "Bearer") {
    return res.status(401).json({ message: "Token is not valid" });
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }

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

module.exports = { authMiddleware: controllerWrapper(authMiddleware) }