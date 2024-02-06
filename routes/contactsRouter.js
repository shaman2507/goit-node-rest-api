const express = require('express');
const {
  getContacts,
  getContact,
  deleteContact,
  createContact,
  updateContactHandler,
  updateStatusContactHandler
} = require('../controllers/contactsControllers.js');

const contactsRouter = express.Router();

contactsRouter.get("/", getContacts);

contactsRouter.get("/:id", getContact);

contactsRouter.delete("/:id", deleteContact);

contactsRouter.post("/", createContact);

contactsRouter.put("/:id", updateContactHandler);

contactsRouter.patch("/favorite/:id", updateStatusContactHandler);

module.exports = contactsRouter;
