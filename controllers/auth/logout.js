const User = require('../../models/users');
const HttpError = require('../../helpers/HttpError');

const logout = async (req, res) => {
    const userId = req.user?.id;
    const user = await User.findById(userId);

    if (!userId) {
        return res.status(401).json({ message: "Not authorised user"});
    }

    if (!user) {
        return res.status(401).json({ message: "Not authorised"});

    }

    try {
        user.token = null;
        await user.save();

        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = logout;