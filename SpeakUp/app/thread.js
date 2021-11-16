const express = require("express");
const router = express.Router();
const validate = require("../validations/validationEmail");
const MongoClient = require('mongodb').MongoClient
const jwt = require('jsonwebtoken');
const config = require('../helpers/config');
const helper = require('../helpers/helper');

router.get('/thread/new', (req, res) => {
    var isLogin = req.session.isLogin;
    if(isLogin == 0)
    {
        res.send('<meta http-equiv="refresh" content="0; url=/login" />');
    }
    else
    {
    res.render('threads.ejs', {
      isLogin: isLogin,
      email: req.session.email,
      edit: 0
    });
}
  })
router.post('/thread/new/add', (req, res) => {
var isLogin = req.session.isLogin;
if(isLogin == 1)
{
    const decoded = jwt.verify(req.session.Authorization, config.secretKey);
    const email = decoded.email;
    const title = req.body.title;
    const content = req.body.content;
    const urlImage = req.body.urlImage;
    const subForum = req.body.subForum;
    MongoClient.connect(config.connectionString, { useUnifiedTopology: true })
    .then(client => {
        const db = client.db('speakUp_db')
        const threadCollection = db.collection('threads').find({}).toArray().then(results => {
        
            if(results.length == 0)
            {
                var id = 0;
            }
            else
            {
                var id = results[results.length - 1].id;
                id++;
            }
        // const id = 0;
        const insertThreads = db.collection('threads').insertOne({id:`${id}`,postedBy:`${email}`,title:`${title}`,urlImage:`${urlImage}`,content:`${content}`,subForum:`${subForum}`}).then(results => {

        });
    });

    })
    res.send('{"error":0}');
}
else
{
    res.send('{"error":1, "msg":"Please Login"}')
}
})
router.get('/thread/:id/apiView', (req, res) => {
    var id = req.params.id;
    MongoClient.connect(config.connectionString,  { useUnifiedTopology: true })
    .then(async client => {
        const db = client.db('speakUp_db')
        const threadCollection = db.collection('threads').find({id:`${id}`}).toArray().then(results => {
            res.send(results);
        });
    })
    })
router.get('/thread/:id/edit', (req, res) => {
    var isLogin = req.session.isLogin;
    if(isLogin != 1)
    {
      res.send('<meta http-equiv="refresh" content="0; url=/" />');
    }
    else{
    res.render('threads.ejs', {
        isLogin: isLogin,
        id: req.params.id,
        edit: 1,
        email: req.session.email
    });
}
    })
    
router.post('/thread/:id/delete', (req, res) => {
    var isLogin = req.session.isLogin;
    var id = req.params.id;
    if(isLogin != 1)
    {
      res.send('<meta http-equiv="refresh" content="0; url=/" />');
    }
    else{
    MongoClient.connect(config.connectionString,  { useUnifiedTopology: true })
        .then(async client => {
            const db = client.db('speakUp_db')
            const threadCollection = db.collection('threads').deleteOne({id:id}).then(results => {
            });
    })
    res.send('{"error":0}')
}
    })
 
router.post('/thread/:id/edit', (req, res) => {
    var isLogin = req.session.isLogin;
    var id = req.params.id;
    if(isLogin != 1)
    {
      res.send('<meta http-equiv="refresh" content="0; url=/" />');
    }
    else{
        const decoded = jwt.verify(req.session.Authorization, config.secretKey);
        const email = decoded.email;
        const title = req.body.title;
        const content = req.body.content;
        const urlImage = req.body.urlImage;
        const subForum = req.body.subForum;
        var myquery = { id: id, postedBy: `${email}` };
        var newvalues = { $set: {postedBy: `${email}`, title: `${title}`, content: `${content}`,subForum: `${subForum}`,urlImage: `${urlImage}`, } };
        MongoClient.connect(config.connectionString, { useUnifiedTopology: true })
        .then(client => {
            const db = client.db('speakUp_db')
            const threadCollection = db.collection('threads').updateOne(myquery, newvalues, function(err, res) {
        });
    
        })
        res.send('{"error":0}');
}
    })
 
router.get('/thread/list', (req, res) => {
    MongoClient.connect(config.connectionString,  { useUnifiedTopology: true })
    .then(async client => {
        const db = client.db('speakUp_db')
        const threadCollection = await db.collection('threads').find({}).toArray().then(results => {
            res.send(results);
        });
    })
});


module.exports = router;