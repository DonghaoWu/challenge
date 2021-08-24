'use strict';
const _ = require('lodash');
const db = require('./db.js');

// UTILS
//----------------
// This is a mock db call that waits for # milliseconds and returns
const mockDBCall = (dataAccessMethod) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(dataAccessMethod());
    }, 500);
  });
};

// MOCK DB CALLS
//----------------
const getUsers = () => {
  const dataAccessMethod = () => _.map(db.usersById, (userInfo) => userInfo);
  return mockDBCall(dataAccessMethod);
};

const getListOfAgesOfUsersWith = (item) => {
  const dataAccessMethod = () => {
    let userItems = db.itemsOfUserByUsername;
    let users = db.usersById;

    let resInArr = [];

    let resInObj = {};
    for (let name in userItems) {
      if (userItems[name].includes(item)) {
        for (let id in users) {
          if (users[id].username === name) {
            if (!resInObj[users[id].age]) resInObj[users[id].age] = 1;
            else resInObj[users[id].age]++;
          }
        }
      }
    }

    for (let key in resInObj) {
      resInArr.push({ age: key, count: resInObj[key] });
    }

    return resInArr;
  };
  return mockDBCall(dataAccessMethod);
};

// get items
const getItems = () => {
  const dataAccessMethod = () => {
    let set = new Set();
    for (let key in db.itemsOfUserByUsername) {
      db.itemsOfUserByUsername[key].forEach((el) => {
        set.add(el);
      });
    }
    return [...set];
  };
  return mockDBCall(dataAccessMethod);
};

module.exports = {
  getUsers,
  getItems,
  getListOfAgesOfUsersWith,
};
