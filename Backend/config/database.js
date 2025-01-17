// const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();
const connectWithDb= ()=>{
    mongoose.connect(process.env.DB_URL)
    .then(()=>{
        console.log('Db connected')
    })
    .catch((error)=>{
        console.log('db connection failed')
        console.log(error)
        process.exit(1);
    })
}

module.exports= connectWithDb;