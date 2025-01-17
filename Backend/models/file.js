const mongoose = require("mongoose");
// const nodemailer = require('../config/nodemailer');

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    url: {
        type: String,
    },
    handle: {
        type: String,
    },
});


const File = mongoose.model("File", fileSchema);
module.exports = File;