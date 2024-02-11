const express = require('express');
const {
  getContacts,
  getContact,
  deleteContact,
  createContact,
  updateContactHandler,
  updateStatusContactHandler
} = require('../controllers/contactsControllers.js');
const registration = require('../controllers/auth/registration.js');
const login = require('../controllers/auth/login.js');

const contactsRouter = express.Router();

contactsRouter.get("/", getContacts);

contactsRouter.get("/:id", getContact);

contactsRouter.delete("/:id", deleteContact);

contactsRouter.post("/register", registration);

contactsRouter.post("/login", login);

contactsRouter.post("/", createContact);

contactsRouter.put("/:id", updateContactHandler);

contactsRouter.patch("/:id/favorite", updateStatusContactHandler);

module.exports = contactsRouter;
