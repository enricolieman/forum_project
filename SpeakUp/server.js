const express = require('express')
const app = express()
const router = express.Router()
const path = require('path');
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 5000;
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const oneDay = 1000 * 60 * 60 * 24;
const config = require('./helpers/config');
const helper = require('./helpers/helper')

app.use(express.static('src'))
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.use(cookieParser());

app.use(sessions({
  secret: "secretKey",
  saveUninitialized:true,
  cookie: { maxAge: oneDay },
  resave: false
}));

app.get('/logout', (req, res) => {
  req.session.destroy();
    res.send('<meta http-equiv="refresh" content="0; url=/" />');
})
app.get('/thread/:id/apiView', require('./app/thread'));
app.post('/login', require('./app/login'));
app.post('/register', require('./app/register'));

app.get('/contact/list', require('./app/contact'));
app.get('/thread/list', require('./app/thread'));
app.use(function (req, res, next) {
  const token = req.session.Authorization;

  if (!token) {
    req.session.isLogin = 0;
    next();
  }
  try {
    const decoded = jwt.verify(token, config.secretKey);
    req.session.isLogin = 1;
    next();
  } catch (err) {
    req.session.isLogin = 0;
      req.session.destroy();
      next();
  }
  next();
});

app.get('/', (req, res) => {
  var isLogin = req.session.isLogin;
   res.render('index.ejs', {
     isLogin: isLogin,
     email: req.session.email
   });
})

app.get('/users', (req, res) => {
  var isLogin = req.session.isLogin;
  if(isLogin != 1)
  {
    res.send('<meta http-equiv="refresh" content="0; url=/" />');
  }
  else{
   res.render('users.ejs', {
     isLogin: isLogin,
     email: req.session.email
   });
  }
})

app.get('/about', (req, res) => {
  var isLogin = req.session.isLogin;
   res.render('about.ejs', {
     isLogin: isLogin,
     email: req.session.email
   });
})

app.get('/contact', (req, res) => {
  var isLogin = req.session.isLogin;
   res.render('contact.ejs', {
     isLogin: isLogin,
     email: req.session.email
   });
})

app.get('/login', (req, res) => {
  var isLogin = req.session.isLogin;
  if(isLogin == 1)
  {
    res.send('<meta http-equiv="refresh" content="0; url=/" />');
  }
  else{
   res.render('login.ejs', {
     isLogin: isLogin
   });
  }
})

app.get('/register', (req, res) => {
  var isLogin = req.session.isLogin;
  if(isLogin == 1)
  {
    res.send('<meta http-equiv="refresh" content="0; url=/" />');
  }
  else{
   res.render('register.ejs', {
     isLogin: isLogin
   });
  }
})

app.get('/thread/new', require('./app/thread'));

app.post('/thread/new/add', require('./app/thread'));

app.get('/thread/:id/edit', require('./app/thread'));
app.post('/thread/:id/delete', require('./app/thread'));
app.post('/thread/:id/edit', require('./app/thread'));
app.get('/thread/:id/view', (req, res) => {
  var isLogin = req.session.isLogin;
   res.render('thread.ejs', {
     isLogin: isLogin,
     id: req.params.id
   });
})




app.get('/admin', (req, res) => {
  var email = req.session.email;
  var isLogin = req.session.isLogin;
  if(email != config.adminEmail)
  {
    res.send('<meta http-equiv="refresh" content="0; url=/" />');
  }
  else{
   res.render('admin.ejs', {
     isLogin: 1
   });
  }
})


app.post('/contact/add', require('./app/contact'));

app.listen(port,() => {
  console.log(`Example app listening at http://localhost:${port}`)
})