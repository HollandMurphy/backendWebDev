const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema for sold inventory
const soldInventory = new Schema ({
    Make: {
        type: String,
        required: true
    },
    Year: {
        type: Number,
        required: true
    },
    Model: {
        type: String,
        required: true
    },
    Trim: {
        type: String,
        required: false
    },
    StockNumber: {
        type: String,
        required: true
    },
    VinNumber: {
        type: String,
        required: false
    },
    Class: {
        type: String,
        required: false
    },
    Age: {
        type: String,
        required: false
    },
    Body: {
        type: String,
        required: false
    },
    Color: {
        type: String,
        required: false
    },
    Disp: {
        type: String,
        required: false
    },
    Cost: {
        type: String,
        required: false
    },
    Odometer: {
        type: String,
        required: false
    }
});

mongoose.model('soldInventory', soldInventory);
