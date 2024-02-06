const Contact = require('../models/contacts');

async function listContacts() {
  try {
    const contacts = await Contact.find();
    console.log(JSON.stringify(contacts, null, 2));
    return contacts;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function getContactById(contactId) {
  try {
    const contact = await Contact.findById(contactId);
    return contact || null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function removeContact(contactId) {
  try {
    const result = await Contact.findByIdAndDelete(contactId);
    return result || null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function addContact(name, email, phone, favorite = false) {
  try {
    const newContact = await Contact.create({ name, email, phone, favorite });
    return newContact;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function updateContact(contactId, updatedFields) {
  try {
    const contact = await Contact.findByIdAndUpdate(contactId, updatedFields, { new: true });
    return contact || null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function updateStatusContact(contactId, body) {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(contactId, { body }, { new: true });
    return updatedContact;
  } catch (error) {
    console.error(error);
    return null;
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact, updateContact, updateStatusContact };