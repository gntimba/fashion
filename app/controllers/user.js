var numeral = require('numeral');
var bcrypt = require('bcrypt');
var dateFormat = require('dateformat');
var models = require('../../models');
var User = models.user;
var Webtoken = require('../models/session');
var jwt = require('jsonwebtoken');
var ObjectId = require('mongoose').Types.ObjectId;
var transact = require('../util/transact');

exports.signup = function (req, res) {
	let data = req.body
	//	console.log(data)


	 User.findAll({
		where: { "mail": req.body.mail }
	}).then(function (results,) {
		console.log(results)
		if (!results.length == 0)
			res.status(409).json({ "message": "That email is already taken", "code": 409 })
		else {

			const saltRounds = 10;
			var salt = bcrypt.genSaltSync(saltRounds);
			var hash = bcrypt.hashSync(req.body.password, salt);

			User.create({
				mail: req.body.mail,
				active: true,
				active_hash: hash,
				lastName: req.body.lastName,
				firstName: req.body.firstName,
				picture: "default.jpg",
				dob: req.body.dob,
				phoneNumber: req.body.phoneNumber
			}).then(function (user) {
				//console.log(user)
				res.status(201).json({ "message": "Account Created Successfully", "code": 201 })
			})

		}
	}).catch(function (err) {
	//	console.log(err)
		res.status(500).json({ "message": "Something went bad", "code": 500 })
	})

}
// exports.users = function (req, res) {

// 	let data = {
// 		"role_id": req.user.role_id,
// 		"_id": req.user._id,
// 		"dob": req.user.dob,
// 		"lastName": req.user.lastName,
// 		"firstName": req.user.firstName,
// 		"picture": "http://localhost:8042/pro/" + req.user.picture,
// 		"created_date": req.user.created_date,
// 		"mail": req.user.mail,
// 		phoneNumber: req.user.phoneNumber,
// 		address: req.user.address,
// 		city: req.user.city,
// 		postal: req.user.postal,
// 		suburb: req.user.suburb,
// 	}
// 	res.json(data)


// 	//console.log(req.user)

// }
// exports.logout = function (req, res) {
// 	let tokenReq = req.headers.authorization.replace('Bearer ', '')
// 	Webtoken.findOneAndUpdate({ token: tokenReq }, { $set: { active: false } }, { new: true }).then((docs) => {
// 		if (docs) {
// 			res.status(200).json({ "message": "logout success", "code": 201 })
// 		} else {
// 			res.status(500).json({ "message": "token not available", "code": 500 })
// 		}
// 	}).catch((err) => {
// 		res.status(500).json(err)
// 	})
// }
// exports.update = function (req, res) {
// 	let data = req.body;
// 	let update = {
// 		address: data.address,
// 		city: data.city,
// 		dob: data.dob,
// 		phoneNumber: data.phoneNumber,
// 		firstName: data.firstName,
// 		lastName: data.lastName,
// 		postal: data.postal,
// 		suburb: data.suburb
// 	}

// 	User.findOneAndUpdate({ _id: req.user._id }, { $set: update }, { new: true }).then((docs) => {
// 		if (docs) {
// 			res.status(200).json({ "message": "Profile Updated", "code": 201 })
// 		} else {
// 			res.status(404).json({ "message": "User not available", "code": 404 })
// 		}
// 	}).catch((err) => {
// 		res.status(500).json(err)
// 	})
// }

// exports.login = function (req, res) {
// 	let data = req.body;
// 	User.findOne({ mail: data.email }, function (err, user) {
// 		if (user) {
// 			bcrypt.compare(data.password, user.active_hash).then(isMatch => {
// 				if (isMatch) {
// 					let payload = {
// 						id: user._id,
// 						role: user.role_id
// 					}
// 					var token = jwt.sign(payload, process.env.secret, { expiresIn: 6000 * 5 }); //made it that the token expires in 5 minutes
// 					webtoken = new Webtoken();
// 					//Webtoken.userID=user._id;
// 					webtoken.token = token;
// 					Webtoken.user_ID = user._id;
// 					//	console.log(user._id)
// 					webtoken.save(function (err) {
// 						if (err)
// 							throw err;

// 						res.json({ id: payload.id, message: "ok", token: token, code: 200 })

// 						//	req.session.destroy();

// 					});


// 				} else
// 					res.status(401).json({ "message": "Password is wrong", "code": 401 })
// 			})
// 		} else {
// 			res.status(404).json({ "message": "Account Not found", "code": 404 })
// 		}
// 	})

// }
// exports.testTate = function (req, res) {
// 	transact.save(req.user._id, "deposit from capitec acoount 22255", "in", 102.25).then(e => {
// 		res.status(201).send("im working")
// 	}
// 	).catch(e => {
// 		res.status(404).send("im bad")
// 	})


// }

// exports.getStatement = function (req, res) {
// transact.getStatement(req.user._id).then( statement =>{
// 	res.json(statement)
// }).catch(e => res.status(404).json(e))

// }



