// const fs = require('fs');
// const { promises: fsPromises } = require('fs');
const { DB_HOST } = require('../services/db/server');
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const Contact = mongoose.model('Contact', contactSchema);

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


// async function listContacts() {
//   try {
//     const data = await fsPromises.readFile(DB_HOST, { encoding: 'utf-8' });
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

//   await fsPromises.writeFile(DB_HOST, JSON.stringify(updatedContacts));
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

//   await fsPromises.writeFile(DB_HOST, JSON.stringify(updatedContacts));
//   return newContact;
// }

// async function updateContact(contactId, updatedFields) {
//   try {
//     const contacts = await listContacts();
//     const index = contacts.findIndex(contact => contact.id === contactId);

//     if (index === -1) {
//       return null;
//     }

//     contacts[index] = { ...contacts[index], ...updatedFields };
    
//     await fsPromises.writeFile(DB_HOST, JSON.stringify(contacts, null, 2));
//     return contacts[index];
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// }

module.exports = { listContacts, getContactById, removeContact, addContact, updateContact };