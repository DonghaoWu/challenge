'use strict';
const mockDBCalls = require('../database/index.js');

const getListOfAgesOfUsersWithHandler = async (request, response) => {
  const itemToLookup = request.params.itemToLookup;
  const data = await mockDBCalls.getListOfAgesOfUsersWith(itemToLookup);
  return response.status(200).send(JSON.stringify(data));
};

module.exports = (app) => {
  app.get('/users/age/:itemToLookup', getListOfAgesOfUsersWithHandler);
};
