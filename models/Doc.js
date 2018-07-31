const mongoose = require('mongoose');
 
const DocSchema = mongoose.Schema({
    type: String,
    data: Buffer
});
 
 const Doc = mongoose.model('Doc', DocSchema);

 module.exports = Doc;