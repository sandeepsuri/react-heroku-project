const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleID: String,
    name: String,
    gmail: String
});

mongoose.model('users', userSchema);