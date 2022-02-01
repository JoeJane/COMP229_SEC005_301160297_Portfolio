/**
 * File name: app.js
 * Student name: Jane Aarthy Joseph
 * Student ID: 301160297
 * Date: 2022-02-01 
 */

(function () {

    function Start() {
        console.log("My App started....");

        var options = {
            strings: [".", "Jane Aarthy Joseph.", "a Software Engineer.", "a Student at Centennial College."],
            typeSpeed: 30,
            backDelay: 2000,
            backSpeed: 30,
            loop: true
          };
        
          var typed = new Typed('#typed', options);
    }

    window.addEventListener("load", Start);
})();