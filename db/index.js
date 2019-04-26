const MongoClient = require('mongodb').MongoClient;

const dbUrl = `mongodb+srv://the-creator-1:${
  process.env.MONGODB_PASSWORD
}@cluster0-n5sxe.mongodb.net/test?retryWrites=true`;
const dbName = process.env.DB_NAME;

const db = new Promise((resolve, reject) => {
  MongoClient.connect(dbUrl, { useNewUrlParser: true })
    .then(client => {
      const db = client.db(dbName);
      const collection = db.collection('projects');
      resolve(collection);
      console.log(`> Connected to ${dbName}!`);
    })
    .catch(error => reject(error));
});

module.exports = db;
