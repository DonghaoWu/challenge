'use strict';
const mockDBCalls = require('../database/index.js');

const getListOfAgesOfUsersWithHandler = async (request, response, next) => {
  try {
    const itemToLookup = request.params.itemToLookup;
    const data = await mockDBCalls.getListOfAgesOfUsersWith(itemToLookup);
    return response.status(200).send(JSON.stringify(data));
  } catch (error) {
    next(error);
  }
};

module.exports = (app) => {
  app.get('/users/age/:itemToLookup', getListOfAgesOfUsersWithHandler);
};
