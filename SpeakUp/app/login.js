const express = require("express");
const router = express.Router();
const validate = require("../validations/validationEmail");
const MongoClient = require('mongodb').MongoClient
const jwt = require('jsonwebtoken');
const config = require('../helpers/config');

router.post('/login', (req, res) => {
    email = req.body.email;
    password = req.body.password;
    if(validate.validationEmail(email, password))
    {
    MongoClient.connect(config.connectionString, { useUnifiedTopology: true })
    .then(client => {
        const db = client.db('speakUp_db')
        const userCollection = db.collection('users').find({email:`${email}`}).toArray().then(results => {
            if(results[0])
            {
                if(password == results[0]['password'])
                {
                    var token = jwt.sign({ email: email }, config.secretKey);
                    req.session.Authorization = token;
                    req.session.email = email;
                    res.send('{"error":0}');
                }
                else
                {
                    res.send('{"error":1, "msg":"Invalid email or password"}');
                }
            }
            else
            {
                res.send('{"error":1, "msg":"Invalid email or password"}');
            }
        });

    })
    }
    else
    {
        res.send('{"error":1,"msg":"Invalid email or password"}');
    }

})
module.exports = router;