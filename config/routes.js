var home = require('../app/controllers/user');
var store = require('../app/controllers/store');

//you can include all your controllers

module.exports = function (app, passport) {


    app.post('/signup', home.signup);


    app.post('/auth', home.login);
    app.post('/default', store.getItems);

    app.get('/profile', passport.authenticate('jwt', { session: false }), home.users);
    app.get('/logout', passport.authenticate('jwt', { session: false }), home.logout);
    app.put('/profile', passport.authenticate('jwt', { session: false }), home.update);

    //store
    app.get('/store', passport.authenticate('jwt', { session: false }), store.allStore);
    app.put('/store', passport.authenticate('jwt', { session: false }), store.update);
    app.post('/store', passport.authenticate('jwt', { session: false }), store.createStore);

    // app.post('/signup', passport.authenticate('local-signup', {
    //     successRedirect: '/home', // redirect to the secure profile section
    //     failureRedirect: '/signup', // redirect back to the signup page if there is an error
    //     failureFlash: true // allow flash messages
    // }));
    // process the login form
    // app.post('/login', passport.authenticate('local-login', {
    //     successRedirect: '/home', // redirect to the secure profile section
    //     failureRedirect: '/login', // redirect back to the signup page if there is an error
    //     failureFlash: true // allow flash messages
    // }));


}
