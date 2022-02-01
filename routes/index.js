let express = require('express');
let bodyParser= require('body-parser');
let router = express.Router();

let urlencodedParser = bodyParser.urlencoded({ extended: false })


/* GET Home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

/* GET Home page. */
router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

/* GET About Me page. */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About' });
});

/* GET Projects page. */
router.get('/projects', function(req, res, next) {
  res.render('projects', { title: 'Projects' });
});

/* GET Services page. */
router.get('/services', function(req, res, next) {
  res.render('services', { title: 'Services' });
});

/* GET Contact Me page. */
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact' });
});

/* Post Contact Me page. */
router.post('/contact',urlencodedParser, function(req, res, next) {
  let data= req.body;
  console.log('Fullname: ' + data.fname + ' ' + data.lname)
  console.log('From :' + data.email );
  console.log( 'Phone: ' + data.phone);
  console.log( 'Subject: ' + data.subject);
  console.log( 'Message: ' + data.message);

  res.redirect('/');
});

module.exports = router;
