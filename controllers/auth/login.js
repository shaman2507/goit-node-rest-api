const User = require('../../models/users');
const { requestError } = require('../../helpers');
const bcrypt = require('bcrypt');

const login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Validation error" });
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw requestError(401, 'Wrong credentials')
    }

    try {
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            throw requestError(401, 'Wrong credentials')
        }

        const token = jwt.sign({ userId: user._id }, 'secretKey');
        res.status(200).json({ token, user: { email: user.email, subscription: user.subscription } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = login;