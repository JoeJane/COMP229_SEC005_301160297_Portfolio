// Create a reference to the BusinessContact model
let BusinessContact = require('../models/businessContact');

// Implementation for display BusinessContact list
module.exports.displayList = (req, res, next) => {
    BusinessContact.find((err, businessContactList) => {
        if(err){
            return console.error(err);
        } else {
            res.render('businessContact/list', { title: 'Business Contacts', businessContacts: businessContactList, displayName: req.user ? req.user.displayName : '' });
        }
    }).sort('name');
}

// Implementation for display Add BusinessContact page
module.exports.displayAddPage = (req, res, next) => {
    res.render('businessContact/add', {title: 'Add Business Contact', displayName: req.user ? req.user.displayName : ''})
}

// Implementation for process new BusinessContact page
module.exports.processAddPage = (req, res, next) => {
    let newBusinessContact = BusinessContact({
        "name": req.body.name,
        "contactNumber": req.body.contactNumber,
        "email": req.body.email
    });

    BusinessContact.create(newBusinessContact, (err, BusinessContact) => {
        if(err){
            console.log(err);
            res.end(err); // if error stop server
        } else {
            // refresh the business contact list
            res.redirect('/businessContact');
        }
    });

}

// Implementation for display edit BusinessContact page
module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    BusinessContact.findById(id, (err, businessContactToEdit) => {
        if(err){
            console.log(err);
            res.end(err); // if error stop server
        } else {
            // show the edit view
            res.render('businessContact/edit', {title: 'Edit Business Contact', businessContact: businessContactToEdit, displayName: req.user ? req.user.displayName : '' });
        }
    });
}

// Implementation for process edit BusinessContact page
module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id;

    let updatedBusinessContact = BusinessContact({
        "_id": id,
        "name": req.body.name,
        "contactNumber": req.body.contactNumber,
        "email": req.body.email
    });

    BusinessContact.updateOne({_id: id}, updatedBusinessContact, (err) => {
        if(err){
            console.log(err);
            res.end(err); // if error stop server
        } else {
            // refresh the business contact list
            res.redirect('/businessContact');
        }
    });
}

// Implementation for process delete BusinessContacts
module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;
    BusinessContact.remove({_id: id}, (err) => {
        if(err){
            console.log(err);
            res.end(err); // if error stop server
        } else {
            // refresh the business contact list
            res.redirect('/businessContact');
        }
    });
}