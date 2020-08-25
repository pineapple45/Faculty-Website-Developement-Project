require('dotenv').config();

// module.exports = {
//   MongoURI: 'mongodb://localhost:27017/facultyWebsiteDB',
//   RegisteredEmail: 'gomraanmol@gmail.com'
// }

if(process.env.NODE_ENV == 'production'){
  module.exports = require('./keys_prod');
}
else{
  module.exports = require('./keys_dev');
}