const express = require("express");
const router = express.Router();
const validate = require("../validations/validationEmail");
const MongoClient = require('mongodb').MongoClient
const jwt = require('jsonwebtoken');
const config = require('../helpers/config');
const helper = require('../helpers/helper');


router.get('/contact/list', (req, res) => {
    MongoClient.connect(config.connectionString,  { useUnifiedTopology: true })
    .then(async client => {
        const db = client.db('speakUp_db')
        const threadCollection = await db.collection('contact').find({}).toArray().then(results => {
            res.send(results);
        });
    })
});
router.post('/contact/add', (req, res) => {
        const email = req.body.email;
        const name = req.body.name;
        const phone = req.body.phone;
        const message = req.body.message;
        MongoClient.connect(config.connectionString, { useUnifiedTopology: true })
        .then(client => {
            const db = client.db('speakUp_db')
            const insertThreads = db.collection('contact').insertOne({email:`${email}`,name:`${name}`,phone:`${phone}`,message:`${message}`}).then(results => {
    
            });
    
        })
        res.send('{"error":0}');
    
    })

module.exports = router;