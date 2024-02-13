const User = require('../../models/users');
const HttpError = require('../../helpers/HttpError');
const bcrypt = require('bcrypt');
const { validateRegistration } = require('../../helpers/validateBody');

const registration = async (req, res, next) => {
    const { email, password } = req.body
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)
    

    if (!email || !password) {
        return res.status(400).json({ message: "Bad Request" });
    }

    const validationResult = validateRegistration.validate({ email, password });
    if (validationResult.error) {
      return res.status(400).json({ message: validationResult.error.message });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(409).json({ message: "Email in use" });
    }

    try {
        const newUser = await User.create({
            email,
            password: hashedPassword
        })
        res.status(201).json({
            user: {
                email: newUser.email,
                subscription: newUser.subscription
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error" })
        
    }
};

module.exports = registration;