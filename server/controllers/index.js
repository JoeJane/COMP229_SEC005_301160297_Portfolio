// Create a reference to the passport model
let passport = require("passport");

// Implementation for Home page
module.exports.displayHomePage = (req, res, next) => {
    res.render('nav/index', {title: 'Home', displayName: req.user ? req.user.displayName : '' });
}

// Implementation for About page
module.exports.displayAboutPage = (req, res, next) => {
    res.render('nav/about', {title: 'About', displayName: req.user ? req.user.displayName : '' });
}

// Implementation for Projects page
module.exports.displayProjectPage = (req, res, next) => {
    res.render('nav/projects', {title: 'Projects', displayName: req.user ? req.user.displayName : '' });
}

// Implementation for Services page
module.exports.displayServicesPage = (req, res, next) => {
    res.render('nav/services', {title: 'Services', displayName: req.user ? req.user.displayName : '' });
}

// Implementation for Contact page
module.exports.displayContactPage = (req, res, next) => {
    res.render('nav/contact', {title: 'Contact', displayName: req.user ? req.user.displayName : '' });
}

// Implementation for process Contact page
module.exports.processContactPage = (req, res, next) => {
    let data= req.body;
    console.log('Fullname: ' + data.fname + ' ' + data.lname)
    console.log('From :' + data.email );
    console.log( 'Phone: ' + data.phone);
    console.log( 'Subject: ' + data.subject);
    console.log( 'Message: ' + data.message);
    res.redirect('/');
}

// Implementation for login page
module.exports.displayLoginPage = (req, res, next) => {
    // check if the user is not already logged in
    if (!req.user) {
        res.render('auth/login', {
            title: "Login",
            message: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    } else {
        res.redirect('/');
    }
}

// Implementation for process login
module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        // if server error
        if (err) {
            return next(err);
        }
        // if there is a user login error
        if (!user) {
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        }
        req.login(user, (err) => {
            // server error
            if (err) {
                return next(err);
            }
            res.redirect('/businessContact');
        });
    })(req, res, next);
}

module.exports.performLogout = (req, res, next) => {
    req.logout();
    res.redirect('/');
}
