// require modules for the index page
let express = require('express');
let router = express.Router();

let indexController = require('../controllers/index');


/* GET Home page. */
router.get('/', indexController.displayHomePage);
router.get('/home', indexController.displayHomePage);


/* GET About Me page. */
router.get('/about', indexController.displayAboutPage);

/* GET Projects page. */
router.get('/projects', indexController.displayProjectPage);

/* GET Services page. */
router.get('/services', indexController.displayServicesPage);

/* GET Contact Me page. */
router.get('/contact', indexController.displayContactPage);

/* Post Contact Me page. */
router.post('/contact', indexController.processContactPage);

// GET Route for displaying Login page
router.get('/login', indexController.displayLoginPage);

// POST Route for processing Login page
router.post('/login', indexController.processLoginPage);

// GET to perform User Logout
router.get('/logout', indexController.performLogout);


module.exports = router;
