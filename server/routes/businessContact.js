// require modules for the BusinessContact route
let express = require('express');
let router = express.Router();

let businessContactController = require('../controllers/businessContact');

// helper function for route guard purposes
function requireAuth(req, res, next){
    // check if user is logged in
    if(!req.isAuthenticated()){
        return res.redirect('/login');
    }
    next();
}

// GET Route for the list page - READ Operation
router.get('/', requireAuth, businessContactController.displayList);

// GET Route for displaying Add page - CREATE Operation
router.get('/add', requireAuth, businessContactController.displayAddPage);

// POST Route for processing Add page - CREATE Operation
router.post('/add', requireAuth, businessContactController.processAddPage);

// GET Route for displaying Edit page - UPDATE Operation
router.get('/edit/:id', requireAuth, businessContactController.displayEditPage);

// POST Route for processing Edit page - UPDATE Operation
router.post('/edit/:id', requireAuth, businessContactController.processEditPage);

// GET to perform Deletion - DELETE Operation
router.get('/delete/:id', requireAuth, businessContactController.performDelete);

module.exports = router;