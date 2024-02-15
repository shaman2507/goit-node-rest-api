const HttpError = require('../../helpers/HttpError');

const getCurrentUser = (req, res, next) => {
    if (!req.user) {
        throw new HttpError(401, 'Not authorized');
    }
    
    try {
        const currentUser = {
            email: req.user.email,
            subscription: req.user.subscription
        };

        res.status(200).json(currentUser);
    } catch (error) {
        next(error);
    }
};

module.exports = getCurrentUser;