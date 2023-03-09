'use strict';
const createService = require('./createService');
const getServices = require('./getServices');
const getServiceById = require('./getServiceById');
const updateStatusService = require('./updateStatusService');
const downloadFile = require('./downloadFile');

module.exports = {
  createService,
  getServices,
  getServiceById,
  updateStatusService,
  downloadFile,
};
