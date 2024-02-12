const User = require('../../models/users');
const HttpError = require('../../helpers/HttpError');
const bcrypt = require('bcrypt');
const { validateRegistration } = require('../../helpers/validateBody');

const registration = async (req, res, next) => {
    const { email, password } = req.body
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)
    

    if (!email || !password) {
        return res.status(400).json({ message: "Wrong email or password" });
    }

    const validationResult = validateRegistration.validate({ email, password });
    if (validationResult.error) {
      throw new HttpError(400, validationResult.error.message);
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
        console.log(error.message)
        if (error.message.includes('E11000')) {
            throw new HttpError(409, 'Email in use')
        } 
        throw error
    }
};

module.exports = registration;