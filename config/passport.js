var models = require('../models')
var Session = models.token
var passportJWT = require("passport-jwt");

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;


var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("Bearer");
jwtOptions.secretOrKey = process.env.secret;
jwtOptions.passReqToCallback = true;

//expose this function to our app using module.exports
module.exports = function (passport) {
    var jwt = new JwtStrategy(jwtOptions, function (req, payload, next) {

        let tokenReq = req.headers.authorization.replace('Bearer ', '')
        Session.findAll({
            where: { "token": tokenReq },
            limit: 1
        }).then(function (results) {
            if (results.length == 0 || !results[0].active ){
                 next(false)
               }
            else {
                if (results[0].active) {
                    next(null, payload);
                }
            }
        }).catch(function (err) {
             next(err, false)
        });

    });
    passport.use(jwt);

};








