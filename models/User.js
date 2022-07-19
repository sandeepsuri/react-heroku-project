const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleID: String,
    googleDisplayName: String
});

mongoose.model('users', userSchema);