
// Asynchronous
const crypto = require('crypto').randomBytes(256).toString('hex');

module.exports = {
    uri   : 'mongodb://localhost:27017/angular2db',
    secret: crypto,
    //db    :'angular2db'
}