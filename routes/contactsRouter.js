const express = require('express');
const {
  getContacts,
  getContact,
  deleteContact,
  createContact,
  updateContactHandler,
  updateStatusContactHandler
} = require('../controllers/contactsControllers.js');
const { authMiddleware } = require('../middlewares/authMiddleware');

const contactsRouter = express.Router();

contactsRouter.get("/", authMiddleware, getContacts);

contactsRouter.get("/:id", authMiddleware, getContact);

contactsRouter.delete("/:id", authMiddleware, deleteContact);

contactsRouter.post("/", authMiddleware, createContact);

contactsRouter.put("/:id", authMiddleware, updateContactHandler);

contactsRouter.patch("/:id/favorite", authMiddleware, updateStatusContactHandler);

module.exports = contactsRouter;
