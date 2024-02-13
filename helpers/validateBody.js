const HttpError = require('./HttpError');
const Joi = require('joi');

const validateBody = (schema) => {
  const func = (req, _, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };

  return func;
};

const validateContact = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const validateContactUpdate = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
});

const validateContactUpdateFavorite = Joi.object({
  favorite: Joi.boolean().required(),
});

const validateRegistration = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = { validateContact, validateContactUpdate, validateBody, validateContactUpdateFavorite, validateRegistration };
