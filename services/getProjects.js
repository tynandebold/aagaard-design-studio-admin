const dbConnect = require('../db/');

module.exports = function() {
  return new Promise((resolve, reject) => {
    dbConnect.then(collection => {
      collection
        .find({})
        .toArray()
        .then(response => {
          resolve({ projects: response });
        });
    });
  });
};
