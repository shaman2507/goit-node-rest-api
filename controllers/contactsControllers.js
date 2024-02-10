const HttpError = require('../helpers/HttpError');
const { listContacts, getContactById, removeContact, addContact, updateContact, updateStatusContact } = require('../services/contactsServices');
const { validateContact, validateContactUpdate, validateContactUpdateFavorite } = require('../helpers/validateBody');

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
  try {
    const { name, email, phone } = req.body;
    const { id } = req.params;

    if (!name && !email && !phone) {
      throw new HttpError(400, 'Body must have at least one field');
    }

    const validationResult = validateContactUpdate.validate({ name, email, phone });
    if (validationResult.error) {
      throw new HttpError(400, validationResult.error.message);
    }

    const updatedContact = await updateContact(id, req.body);
    if (updatedContact) {
      res.status(200).json(updatedContact);
    } else {
      throw new HttpError(404, 'Not found');
    }
  } catch (error) {
    next(error);
  }
};

const updateStatusContactHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { favorite } = req.body;

    const validationResult = validateContactUpdateFavorite.validate({ favorite });
    if (validationResult.error) {
      throw new HttpError(400, validationResult.error.message);
    }

    const updatedContact = await updateStatusContact(id, req.body);
    
    if (!updatedContact) {
      return res.status(404).json({ message: "Not found" });
    }

    return res.status(200).json(updatedContact);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


module.exports = { getContacts, getContact, deleteContact, createContact, updateContactHandler, updateStatusContactHandler };
