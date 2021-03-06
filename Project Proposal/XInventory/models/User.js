const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Month Supply Schema
const UserSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }, 
    date: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        required: false
    }
});

mongoose.model('users', UserSchema);