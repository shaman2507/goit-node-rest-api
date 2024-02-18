const getCurrentUser = require('./getCurrentUser');

const controllerWrapper = require('../../helpers/controllerWrappes');

module.exports = {
    getCurrentUser: controllerWrapper(getCurrentUser)
}