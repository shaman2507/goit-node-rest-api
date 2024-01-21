// import contactsService from "../services/contactsServices.js";

const { HttpError } = require('./helpers/HttpError');
const { listContacts, getContactById, removeContact, addContact, updateContact } = require('./contactsServices');
const { validateContact, validateContactUpdate } = require('./helpers/validateBody');

const getContacts = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

const getContact = async (req, res, next) => {
  const { id } = req.params;
  try {
    const contact = await getContactById(id);
    if (contact) {
      res.status(200).json(contact);
    } else {
      throw new HttpError(404, 'Not found');
    }
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedContact = await removeContact(id);
    if (deletedContact) {
      res.status(200).json(deletedContact);
    } else {
      throw new HttpError(404, 'Not found');
    }
  } catch (error) {
    next(error);
  }
};

const createContact = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const validationResult = validateContact.validate({ name, email, phone });
    if (validationResult.error) {
      throw new HttpError(400, validationResult.error.message);
    }

    const newContact = await addContact(name, email, phone);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

const updateContactHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const { name, email, phone } = req.body;

    if (!name && !email && !phone) {
      throw new HttpError(400, 'Body must have at least one field');
    }

    const validationResult = validateContactUpdate.validate({ name, email, phone });
    if (validationResult.error) {
      throw new HttpError(400, validationResult.error.message);
    }

    const updatedContact = await updateContact(id, { name, email, phone });
    if (updatedContact) {
      res.status(200).json(updatedContact);
    } else {
      throw new HttpError(404, 'Not found');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { getContacts, getContact, deleteContact, createContact, updateContactHandler };

// const fs = require('fs');
// const { promises: fsPromises } = require('fs');
// const path = require('path');

// const contactsPath = path.join(__dirname, './db/contacts.json');

// async function listContacts() {
//   try {
//     const data = await fsPromises.readFile(contactsPath, { encoding: 'utf-8' });
//     const contacts = JSON.parse(data);
//     console.log(JSON.stringify(contacts, null, 2));
//     return contacts;
//   } catch (error) {
//     return [];
//   }
// }

// async function getContactById(contactId) {
//   const contacts = await listContacts();
//   return contacts.find(contact => contact.id === contactId) || null;
// }

// async function removeContact(contactId) {
//   const contacts = await listContacts();
//   const updatedContacts = contacts.filter(contact => contact.id !== contactId);

//   if (contacts.length === updatedContacts.length) {
//     return null;
//   }

//   await fsPromises.writeFile(contactsPath, JSON.stringify(updatedContacts));
//   return contacts.find(contact => contact.id === contactId) || null;
// }

// async function addContact(name, email, phone) {
//   const newContact = {
//     id: Date.now(),
//     name,
//     email,
//     phone,
//   };

//   const contacts = await listContacts();
//   const updatedContacts = [...contacts, newContact];

//   await fsPromises.writeFile(contactsPath, JSON.stringify(updatedContacts));
//   return newContact;
// }

// module.exports = { listContacts, getContactById, removeContact, addContact };


// export const getAllContacts = (req, res) => {};

// export const getContactById = (req, res) => {};

// export const deleteContact = (req, res) => {};

// export const createContact = (req, res) => {};

// export const updateContact = (req, res) => {};
