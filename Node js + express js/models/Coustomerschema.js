const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    FirstName: String,
    LastName: String,
    Email: String,
    Telephone: Number,
    Age: Number,
    Country: String,
    Gender: String
}, { timestamps: true }
);

const User = mongoose.model('Coustomer', userSchema);
module.exports = User;