/**
 * File name: app.js
 * Student name: Jane Aarthy Joseph
 * Student ID: 301160297
 * Date: 2022-02-01 
 */

$(function() {
    console.log( "App Started..." );

    if($('#typed').length){
        var options = {
            strings: [".", "Jane Aarthy Joseph.", "a Software Engineer.", "a Student at Centennial College."],
            typeSpeed: 30,
            backDelay: 2000,
            backSpeed: 30,
            loop: true
        };

        var typed = new Typed('#typed', options);
    }
    /*$(".btn-danger").click(function(event) {
        if(!confirm("Are you sure?")){
            event.preventDefault();
            window.location.assign('/book');
        }
    });*/
});