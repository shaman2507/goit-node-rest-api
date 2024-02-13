const addContact = require('./addContact');
const getContact = require('./getContact');
const getContacts = require('./getContacts');

const controllerWrapper = require('../../helpers/controllerWrappes');

module.exports = {
    addContact: controllerWrapper(addContact),
    getContacts: controllerWrapper(getContacts),
    getContact: controllerWrapper(getContact)
    
}