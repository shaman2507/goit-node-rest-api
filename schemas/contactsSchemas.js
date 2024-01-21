// import Joi from "joi";

const Joi = require('joi');

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

module.exports = { validateContact, validateContactUpdate };



// export const createContactSchema = Joi.object({

// })

// export const updateContactSchema = Joi.object({

// })