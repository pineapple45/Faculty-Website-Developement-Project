require('dotenv').config();
module.exports = {
    MongoURI: 'mongodb://localhost:27017/facultyWebsiteDB',
    RegisteredEmail: process.env.REGISTERED_EMAIL
  }
  