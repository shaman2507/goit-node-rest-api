const User = require('../../models/users');
const HttpError = require('../../helpers/HttpError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validateRegistration } = require('../../helpers/validateBody');

const { JWT_SECRET } = process.env;

const login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Validation error" });
    }

    const validationResult = validateRegistration.validate({ email, password });
    if (validationResult.error) {
      return res.status(400).json({ message: validationResult.error.message });
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new HttpError(401, 'Email or password is wrong')
    }

    try {
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            throw new HttpError(401, 'Email or password is wrong')
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET);
        res.status(200).json({ token, user: { email: user.email, subscription: user.subscription } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = login;