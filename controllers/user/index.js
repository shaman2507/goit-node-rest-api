const addContact = require('./addContact');
const getContact = require('./getContact');
const getContacts = require('./getContacts');
const getCurrentUser = require('./getCurrentUser');

const controllerWrapper = require('../../helpers/controllerWrappes');

module.exports = {
    addContact: controllerWrapper(addContact),
    getContacts: controllerWrapper(getContacts),
    getContact: controllerWrapper(getContact),
    getCurrentUser: controllerWrapper(getCurrentUser)
}