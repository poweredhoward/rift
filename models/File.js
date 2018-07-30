const mongoose = require('mongoose');
 
const FileSchema = mongoose.Schema({
    type: String,
    data: Buffer
});
 
module.exports = mongoose.model('File', FileSchema);